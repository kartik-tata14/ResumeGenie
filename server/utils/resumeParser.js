import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';

/**
 * Parse PDF file and extract text content
 */
export async function parsePDF(filePath) {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);

        return {
            text: data.text,
            pages: data.numpages,
            info: data.info
        };
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF file');
    }
}

/**
 * Extract structured information from resume text
 * This provides basic extraction - AI will enhance it further
 */
export function extractResumeData(text) {
    // Basic extraction logic - AI will do comprehensive parsing
    const lines = text.split('\n').filter(line => line.trim());

    const data = {
        rawText: text,
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        achievements: [],
        links: []
    };

    // Extract email
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const emails = text.match(emailRegex);
    if (emails && emails.length > 0) {
        data.email = emails[0];
    }

    // Extract phone
    const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const phones = text.match(phoneRegex);
    if (phones && phones.length > 0) {
        data.phone = phones[0];
    }

    // Extract LinkedIn URL
    const linkedinRegex = /linkedin\.com\/in\/[\w-]+/gi;
    const linkedinMatches = text.match(linkedinRegex);
    if (linkedinMatches) {
        data.links.push({
            type: 'linkedin',
            url: linkedinMatches[0].startsWith('http') ? linkedinMatches[0] : `https://${linkedinMatches[0]}`
        });
    }

    // Extract GitHub URL
    const githubRegex = /github\.com\/[\w-]+/gi;
    const githubMatches = text.match(githubRegex);
    if (githubMatches) {
        data.links.push({
            type: 'github',
            url: githubMatches[0].startsWith('http') ? githubMatches[0] : `https://${githubMatches[0]}`
        });
    }

    // Extract name (usually first line or first non-contact line)
    for (const line of lines) {
        if (line.length > 3 && line.length < 50 &&
            !line.includes('@') &&
            !line.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/) &&
            !line.toLowerCase().includes('resume') &&
            !line.toLowerCase().includes('curriculum')) {
            data.name = line.trim();
            break;
        }
    }

    // Extract skills (look for common skill section headers)
    const skillsSectionRegex = /(?:skills?|technical skills?|competencies)[\s:]+/gi;
    const skillsMatch = text.match(skillsSectionRegex);
    if (skillsMatch) {
        const skillsIndex = text.indexOf(skillsMatch[0]);
        const skillsSection = text.substring(skillsIndex, skillsIndex + 500);
        const skillsList = skillsSection
            .split(/[,;•\n]/)
            .map(s => s.trim())
            .filter(s => s.length > 2 && s.length < 30)
            .slice(0, 15);
        data.skills = skillsList;
    }

    return data;
}

/**
 * Parse uploaded resume file
 */
export async function parseResume(filePath, mimetype) {
    try {
        let parsedData;

        if (mimetype === 'application/pdf') {
            parsedData = await parsePDF(filePath);
            return extractResumeData(parsedData.text);
        } else if (mimetype === 'application/msword' ||
            mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            // For DOC/DOCX, we'll use a simpler approach or rely on AI
            // In production, you'd use mammoth or docx library
            return {
                rawText: 'DOC parsing not yet implemented. Please upload PDF or use AI to extract.',
                name: '',
                email: '',
                phone: '',
                skills: [],
                experience: [],
                education: []
            };
        }

        throw new Error('Unsupported file type');
    } catch (error) {
        console.error('Resume parsing error:', error);
        throw error;
    }
}
