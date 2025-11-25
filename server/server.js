import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/upload.js';
import exportRoutes from './routes/export.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Resume Genie API' });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Upload route
app.use('/api', uploadRoutes);

// Export route
app.use('/api/export', exportRoutes);

// TODO: Add routes for:
// - LinkedIn profile parsing
// - Resume parsing (extract text from PDF/DOC)
// - AI resume generation
// - ATS scoring
// - PDF export// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);

    // Check Gemini API status
    if (process.env.GEMINI_API_KEY) {
        console.log('✅ Gemini AI initialized successfully');
    } else {
        console.log('⚠️  No Gemini API key found - using mock optimization');
        console.log('   Add GEMINI_API_KEY to .env file for AI-powered features');
    }
});

export default app;
