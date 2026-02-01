import multipart from 'parse-multipart-data';
import path from 'path';
import fs from 'fs';
import { tmpdir } from 'os';
import { parseResume } from '../../server/utils/resumeParser.js';
import { optimizeResume } from '../../server/utils/aiService.js';

export const handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const contentType = event.headers['content-type'] || event.headers['Content-Type'];
        
        // Parse multipart form data
        const boundary = contentType.split('boundary=')[1];
        const parts = multipart.parse(Buffer.from(event.body, 'base64'), boundary);
        
        let file = null;
        let linkedinUrl = '';
        let jobDescription = '';

        // Extract form fields
        for (const part of parts) {
            if (part.name === 'resume' && part.filename) {
                file = part;
            } else if (part.name === 'linkedinUrl') {
                linkedinUrl = part.data.toString();
            } else if (part.name === 'jobDescription') {
                jobDescription = part.data.toString();
            }
        }

        // Validate input
        if (!file && !linkedinUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Please provide either a resume file or LinkedIn URL'
                })
            };
        }

        let resumeData = {};

        // Parse uploaded resume
        if (file) {
            // Save file temporarily
            const tempDir = tmpdir();
            const tempFilePath = path.join(tempDir, `resume-${Date.now()}${path.extname(file.filename)}`);
            fs.writeFileSync(tempFilePath, file.data);

            // Determine mimetype
            const ext = path.extname(file.filename).toLowerCase();
            const mimetypes = {
                '.pdf': 'application/pdf',
                '.doc': 'application/msword',
                '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            };
            const mimetype = mimetypes[ext] || 'application/octet-stream';

            // Parse resume
            resumeData = await parseResume(tempFilePath, mimetype);

            // Clean up temp file
            fs.unlinkSync(tempFilePath);
        }

        // Handle LinkedIn Profile URL
        if (linkedinUrl) {
            const username = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/i)?.[1] || 'professional';
            resumeData = {
                linkedinUrl: linkedinUrl,
                username: username,
                rawText: `LinkedIn Profile Analysis Request\n\nProfile URL: ${linkedinUrl}\nUsername: ${username}\n\nPlease analyze this LinkedIn profile and generate a comprehensive resume.`
            };
        }

        // Optimize resume with AI
        const optimizedData = await optimizeResume(resumeData, jobDescription || '');
        console.log('✅ Resume optimized. ATS Score:', optimizedData.atsScore.overall);

        // Prepare response
        const responseData = {
            success: true,
            message: 'Resume processed successfully',
            data: {
                inputMethod: file ? 'upload' : 'linkedin',
                resumeData: optimizedData,
                hasJobDescription: !!jobDescription
            }
        };

        if (file) {
            responseData.data.file = {
                filename: file.filename,
                originalName: file.filename
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify(responseData)
        };

    } catch (error) {
        console.error('Upload error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Upload failed',
                message: error.message
            })
        };
    }
};
