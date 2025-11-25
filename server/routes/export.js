import express from 'express';
import { generateLatexResume } from '../utils/latexGenerator.js';

const router = express.Router();

/**
 * POST /api/export/latex
 * Generate LaTeX file from resume data
 */
router.post('/latex', async (req, res) => {
    try {
        const { resumeData, selectedTemplate } = req.body;

        if (!resumeData) {
            return res.status(400).json({
                error: 'Resume data is required'
            });
        }

        // Generate LaTeX content
        const latexContent = generateLatexResume(resumeData, selectedTemplate || 1);

        // Set headers for file download
        const templateNames = { 1: 'modern', 2: 'professional', 3: 'classic' };
        const templateName = templateNames[selectedTemplate] || 'modern';
        const filename = `resume_${templateName}_${Date.now()}.tex`;

        res.setHeader('Content-Type', 'application/x-latex');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(latexContent);

    } catch (error) {
        console.error('LaTeX generation error:', error);
        res.status(500).json({
            error: 'LaTeX generation failed',
            message: error.message
        });
    }
});

/**
 * POST /api/export/download
 * Generate downloadable resume content (fallback to text if LaTeX compilation not available)
 */
router.post('/download', async (req, res) => {
    try {
        const { resumeData, selectedTemplate, format } = req.body;

        if (!resumeData) {
            return res.status(400).json({
                error: 'Resume data is required'
            });
        }

        if (format === 'latex' || format === 'tex') {
            // Generate LaTeX
            const latexContent = generateLatexResume(resumeData, selectedTemplate || 1);
            const templateNames = { 1: 'modern', 2: 'professional', 3: 'classic' };
            const templateName = templateNames[selectedTemplate] || 'modern';
            const filename = `resume_${templateName}.tex`;

            res.setHeader('Content-Type', 'application/x-latex');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            return res.send(latexContent);
        }

        // Default: return JSON for client-side processing
        res.json({
            success: true,
            message: 'Use client-side print or download LaTeX file'
        });

    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({
            error: 'Export failed',
            message: error.message
        });
    }
});

export default router;
