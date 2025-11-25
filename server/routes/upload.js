import express from 'express';
import multer from 'multer';
import path from 'path';
import { parseResume } from '../utils/resumeParser.js';
import { optimizeResume } from '../utils/aiService.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Handle resume upload or LinkedIn URL
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        const { linkedinUrl, jobDescription } = req.body;
        const file = req.file;

        // Validate input
        if (!file && !linkedinUrl) {
            return res.status(400).json({
                error: 'Please provide either a resume file or LinkedIn URL'
            });
        }

        let resumeData = {};

        // Parse uploaded resume
        if (file) {
            resumeData = await parseResume(file.path, file.mimetype);
        }

        // Handle LinkedIn Profile URL
        if (linkedinUrl) {
            // Extract username from URL
            const username = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/i)?.[1] || 'professional';

            // Pass LinkedIn URL directly to AI - no scraping attempts
            // AI will generate a comprehensive profile based on the URL
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
                originalName: file.originalname
            };
        }

        res.status(200).json(responseData);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Upload failed',
            message: error.message
        });
    }
}); export default router;
