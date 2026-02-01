import { generateLatexResume } from '../../server/utils/latexGenerator.js';

export const handler = async (event, context) => {
    // Handle OPTIONS for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { resumeData, selectedTemplate } = JSON.parse(event.body);

        if (!resumeData) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Resume data is required'
                })
            };
        }

        // Generate LaTeX content
        const latexContent = generateLatexResume(resumeData, selectedTemplate || 1);

        // Set headers for file download
        const templateNames = { 1: 'modern', 2: 'professional', 3: 'classic' };
        const templateName = templateNames[selectedTemplate] || 'modern';
        const filename = `resume_${templateName}_${Date.now()}.tex`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/x-latex',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: latexContent
        };

    } catch (error) {
        console.error('LaTeX generation error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'LaTeX generation failed',
                message: error.message
            })
        };
    }
};
