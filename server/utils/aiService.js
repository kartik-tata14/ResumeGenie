import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * AI service for resume optimization using Gemini
 * NO MOCK DATA - Pure AI processing only
 */
export async function optimizeResume(resumeData, jobDescription = '') {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is required. Add GEMINI_API_KEY to your .env file.');
  }

  return await optimizeWithGemini(resumeData, jobDescription);
}

/**
 * Optimize resume using Gemini AI
 * Handles BOTH resume files AND LinkedIn URLs
 */
async function optimizeWithGemini(resumeData, jobDescription) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  // Check if this is a LinkedIn URL request
  const isLinkedInRequest = resumeData.linkedinUrl || resumeData.rawText?.includes('LinkedIn Profile');

  const prompt = isLinkedInRequest
    ? buildLinkedInPrompt(resumeData, jobDescription)
    : buildResumePrompt(resumeData, jobDescription);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response (remove markdown code blocks if present)
  let cleanedText = text.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/```\n?/g, '');
  }

  const aiResponse = JSON.parse(cleanedText);

  // Transform skills analysis into simple array format for editor
  const skillsArray = aiResponse.skillsAnalysis?.ranked?.map(skill => ({
    name: skill.skill,
    relevance: skill.relevance,
    suggested: !skill.inResume,
    matchesJob: skill.inJobDescription || false
  })) || [];

  // Fallback to parsedResume data if optimized versions are missing
  const educationData = (aiResponse.optimizedEducation && aiResponse.optimizedEducation.length > 0)
    ? aiResponse.optimizedEducation
    : aiResponse.parsedResume?.education || [];

  const certificationsData = (aiResponse.optimizedCertifications && aiResponse.optimizedCertifications.length > 0)
    ? aiResponse.optimizedCertifications
    : aiResponse.parsedResume?.certifications || [];

  const projectsData = (aiResponse.optimizedProjects && aiResponse.optimizedProjects.length > 0)
    ? aiResponse.optimizedProjects
    : aiResponse.parsedResume?.projects || [];

  return {
    original: resumeData,
    optimized: {
      ...aiResponse.parsedResume,
      skills: skillsArray,  // Add formatted skills array to optimized object
      honors: aiResponse.parsedResume?.honors || []  // Ensure honors are included
    },
    optimizedSummary: aiResponse.optimizedSummary,
    optimizedExperience: aiResponse.optimizedExperience,
    optimizedEducation: educationData,
    optimizedCertifications: certificationsData,
    optimizedProjects: projectsData,
    skillsAnalysis: aiResponse.skillsAnalysis,
    suggestions: aiResponse.suggestions || [],
    atsScore: aiResponse.atsScore,
    keywords: aiResponse.keywords,
    aiPowered: true
  };
}

/**
 * Build prompt for LinkedIn URL analysis
 */
function buildLinkedInPrompt(resumeData, jobDescription) {
  const linkedinUrl = resumeData.linkedinUrl || resumeData.links?.[0]?.url || 'Unknown';
  const username = resumeData.username || linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/i)?.[1] || 'professional';

  return `You are an expert ATS (Applicant Tracking System) optimization specialist and professional resume writer.

**TASK: Analyze LinkedIn Profile and Create Resume**

**LinkedIn Profile URL:** ${linkedinUrl}
**Username:** ${username}

${jobDescription ? `**JOB DESCRIPTION:**\n${jobDescription}\n` : ''}

**YOUR TASK:**
Based on this LinkedIn profile URL, generate a comprehensive professional resume analysis. Create a realistic professional profile with typical career progression and relevant skills for someone with this LinkedIn username.

Provide a detailed JSON response with the following structure:

{
  "parsedResume": {
    "name": "Generate a professional name based on username",
    "email": "${username}@email.com",
    "phone": "+1 (555) XXX-XXXX",
    "location": "City, State/Country",
    "summary": "Create a compelling 3-4 sentence professional summary",
    "experience": [
      {
        "title": "Current/Recent Job Title",
        "company": "Company Name",
        "location": "City, State",
        "startDate": "MMM YYYY",
        "endDate": "Present or MMM YYYY",
        "description": "Brief role description",
        "achievements": ["Quantified achievement 1", "Quantified achievement 2", "Quantified achievement 3"]
      }
      // Include 2-3 relevant positions
    ],
    "education": [
      {
        "degree": "Bachelor's/Master's Degree in relevant field",
        "institution": "University Name",
        "location": "City, State",
        "graduationDate": "YYYY",
        "gpa": "X.X if relevant",
        "relevant": ["Relevant coursework or honors"]
      }
    ],
    "skills": {
      "technical": ["List 8-10 relevant technical skills"],
      "soft": ["List 5-6 soft skills"],
      "tools": ["List 6-8 tools/technologies"],
      "languages": ["Programming or spoken languages if applicable"]
    },
    "certifications": ["List 2-3 relevant certifications if applicable"],
    "projects": [
      {
        "name": "Project name",
        "description": "Project description",
        "technologies": ["Tech stack"],
        "link": "Optional project link"
      }
    ],
    "achievements": ["Notable achievements, awards, or recognitions"],
    "links": {
      "linkedin": "${linkedinUrl}",
      "github": "github.com/${username}",
      "portfolio": "Optional portfolio link",
      "other": []
    }
  },
  "optimizedSummary": "AI-enhanced professional summary (3-4 sentences, achievement-focused, ATS-optimized)",
  "optimizedExperience": [
    {
      "title": "Job title",
      "company": "Company name",
      "duration": "Date range",
      "bulletPoints": [
        "Action verb + quantified achievement + business impact",
        "3-5 optimized bullet points per role with metrics"
      ]
    }
  ],
  "skillsAnalysis": {
    "matched": ["Skills matching job description if provided"],
    "suggested": ["Additional relevant skills to strengthen profile"],
    "ranked": [
      {
        "skill": "Skill name",
        "relevance": 85-95,
        "inResume": true
      }
    ]
  },
  "atsScore": {
    "overall": 70-95 (realistic score based on profile completeness),
    "breakdown": {
      "formatting": 15-20,
      "contactInfo": 15-20,
      "skills": 18-25,
      "experience": 15-20,
      "education": 12-15,
      "keywords": 12-20
    },
    "grade": "A/B/C based on overall score",
    "verdict": "Realistic assessment of profile strength"
  },
  "suggestions": [
    {
      "type": "info",
      "category": "LinkedIn Profile",
      "message": "This resume was generated from LinkedIn profile URL. Consider uploading your actual resume PDF for more accurate analysis.",
      "priority": "low"
    },
    {
      "type": "warning|info",
      "category": "Contact|Skills|Experience|Keywords",
      "message": "Specific, actionable suggestions for improvement",
      "priority": "high|medium|low"
    }
  ],
  "keywords": {
    "extracted": ["Keywords from job description if provided"],
    "missing": ["Important keywords to add"],
    "present": ["Keywords already in profile"]
  }
}

**IMPORTANT:**
1. Create a realistic, professional profile
2. Use typical career progression for the field
3. Include quantified achievements
4. Calculate realistic ATS scores
5. Provide actionable suggestions
6. Return ONLY valid JSON, no markdown
7. Make it comprehensive and ATS-optimized`;
}

/**
 * Build prompt for resume file analysis
 */
function buildResumePrompt(resumeData, jobDescription) {
  const hasJobDescription = jobDescription && jobDescription.trim().length > 50;

  return `You are an EXTREMELY CRITICAL ATS (Applicant Tracking System) optimization specialist and professional resume writer.

**RESUME DATA:**
${JSON.stringify(resumeData, null, 2)}

${hasJobDescription ? `**JOB DESCRIPTION:**\n${jobDescription}\n\n⚠️ CRITICAL INSTRUCTION: Compare this resume CAREFULLY against the job description. If skills/experience don't match, BE HONEST and give LOW scores.` : '**NO JOB DESCRIPTION PROVIDED** - Provide general ATS optimization feedback.'}

**YOUR TASK:**
${hasJobDescription ? `CRITICALLY ANALYZE if this resume matches the job description. If it doesn't match, your ATS score MUST be LOW (40-60 range). Be STRICT and HONEST.` : 'Analyze this resume for general ATS optimization.'}

Provide a detailed JSON response with the following structure:

{
  "parsedResume": {
    "name": "EXTRACT full name exactly as written",
    "email": "EXTRACT email address",
    "phone": "EXTRACT phone number with country code if present",
    "location": "EXTRACT City, State/Country",
    "summary": "EXTRACT original professional summary word-for-word from resume",
    "experience": [
      {
        "title": "EXACT job title from resume",
        "company": "EXACT company name",
        "location": "City, State of job",
        "startDate": "MMM YYYY (MUST extract - look for dates like 'Jan 2020', '2020', 'January 2020')",
        "endDate": "MMM YYYY or 'Present' (MUST extract actual end date)",
        "duration": "Calculate duration like '2 years 3 months' or '6 months'",
        "description": "Brief role overview if present",
        "responsibilities": ["List ALL bullet points/responsibilities from resume"],
        "achievements": ["Extract quantified achievements with numbers/percentages"],
        "technologies": ["Technologies/tools used in this role"]
      }
    ],
    "education": [
      {
        "degree": "EXACT degree name (Bachelor of Science, Master of Arts, etc.)",
        "field": "Field of study (Computer Science, Business Administration, etc.)",
        "institution": "EXACT university/college name",
        "location": "City, State of institution",
        "startDate": "MMM YYYY (MUST extract if present)",
        "endDate": "MMM YYYY (MUST extract - graduation date)",
        "gpa": "X.XX/4.0 or percentage (MUST extract if mentioned - look for GPA, CGPA, percentage)",
        "honors": "Dean's List, Summa Cum Laude, etc. if mentioned",
        "relevant": ["Relevant coursework, thesis, academic achievements"]
      }
    ],
    "skills": {
      "technical": ["EXTRACT ALL technical skills - programming languages, frameworks, databases, methodologies. List EVERY single one mentioned. Minimum 5-8 skills."],
      "soft": ["EXTRACT soft skills - leadership, communication, teamwork, problem-solving, collaboration. If not explicitly mentioned, infer from experience descriptions. Minimum 3-5 skills."],
      "tools": ["EXTRACT ALL tools/software - Excel, Tableau, Git, Jira, VS Code, cloud platforms, etc. List EVERYTHING mentioned. Minimum 5-8 tools."],
      "languages": ["Human languages if mentioned - English, Spanish, Mandarin, etc. with proficiency level (fluent/native/intermediate/basic)"]
    },
    "certifications": [
      {
        "name": "EXACT certification name",
        "issuer": "Issuing organization (AWS, Google, Microsoft, etc.)",
        "date": "MMM YYYY (issue or expiry date if present)",
        "credentialId": "ID/URL if present",
        "skills": ["Related skills - e.g., AWS, Python, Project Management"]
      }
    ],
    "projects": [
      {
        "name": "EXACT project name",
        "description": "Full project description from resume",
        "role": "Your role in the project",
        "date": "MMM YYYY or date range (MUST extract if present)",
        "duration": "Project duration if mentioned",
        "technologies": ["ALL technologies used"],
        "skills": ["Key skills demonstrated - e.g., React, Node.js, MongoDB"],
        "achievements": ["Quantified outcomes/impacts"],
        "link": "GitHub/demo link if present"
      }
    ],
    "honors": ["EXTRACT ALL awards, recognitions, honors, publications, patents"],
    "volunteering": ["Volunteer work if present"],
    "publications": ["Academic papers/articles if present"],
    "links": {
      "linkedin": "LinkedIn URL if present",
      "github": "GitHub URL if present",
      "portfolio": "Portfolio/website URL",
      "other": ["Any other professional links"]
    }
  },
  "optimizedSummary": "AI-REWRITTEN professional summary (3-4 powerful sentences). Use numbers, achievements, years of experience. Make it compelling and ATS-friendly. Don't just copy - IMPROVE IT with stronger action words and quantified achievements.",
  "optimizedExperience": [
    {
      "title": "EXACT job title from resume",
      "company": "EXACT company name",
      "location": "City, State",
      "startDate": "MMM YYYY",
      "endDate": "MMM YYYY or Present",
      "duration": "2 years 3 months (calculate from dates)",
      "originalBullets": ["Original responsibilities from resume"],
      "optimizedBullets": [
        "AI-REWRITTEN: Start with action verb + quantified result + business impact",
        "Transform weak bullets into powerful achievement statements",
        "Add metrics where possible (%, $, time saved, users impacted)",
        "Each bullet should show IMPACT not just duties",
        "Provide 4-6 optimized bullets per role"
      ],
      "technologies": ["Key technologies used in this role"]
    }
  ],
  "optimizedEducation": [
    {
      "degree": "Degree name",
      "field": "Field of study",
      "institution": "University name",
      "location": "City, State",
      "startDate": "MMM YYYY",
      "endDate": "MMM YYYY",
      "gpa": "X.XX/4.0 (include if 3.5+)",
      "honors": "Academic honors",
      "relevant": ["Top relevant coursework or achievements"]
    }
  ],
  "optimizedCertifications": [
    {
      "name": "Certification name",
      "issuer": "Issuing organization",
      "date": "MMM YYYY (MUST include if in parsedResume)",
      "skills": ["Related skills from parsedResume"],
      "relevance": "Why this cert matters for target role (1 sentence)"
    }
  ],
  "optimizedProjects": [
    {
      "name": "Project name",
      "description": "AI-ENHANCED description with clear impact (2-3 sentences)",
      "role": "Your specific contribution",
      "date": "MMM YYYY or date range (MUST include if in parsedResume)",
      "technologies": ["Tech stack from parsedResume"],
      "skills": ["Key skills from parsedResume.projects"],
      "achievements": ["Quantified outcomes"],
      "link": "Link if available"
    }
  ],
  "skillsAnalysis": {
    "matched": ["List ONLY skills that actually match job requirements"],
    "missing": ["Critical skills from job description NOT in resume"],
    "suggested": ["Skills to add for better match"],
    "ranked": [
      {
        "skill": "Specific skill name",
        "relevance": 0-100,
        "inResume": true/false,
        "inJobDescription": true/false
      }
    ]
  },
  "atsScore": {
    "overall": 0-100 (BE STRICT! Mismatch: 35-60, Okay: 60-75, Good: 75-85, Excellent: 85-95),
    "breakdown": {
      "formatting": 0-15 (Clear structure, proper sections, dates included),
      "contactInfo": 0-10 (Email, phone, location present),
      "skills": 0-20 (CRITICAL: Match with job requirements),
      "experience": 0-20 (Relevance, duration, seniority match),
      "education": 0-10 (Degree requirement met, GPA if required),
      "certifications": 0-10 (Relevant certifications boost score),
      "projects": 0-5 (Strong projects add value),
      "keywords": 0-10 (Keyword density from job description)
    },
    "grade": "A/B/C/D/F (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)",
    "verdict": "ONE brutally honest sentence about resume-job fit",
    "strengths": ["List 2-3 strongest aspects of this resume"],
    "weaknesses": ["List 2-3 critical gaps or weaknesses"]
  },
  "suggestions": [
    {
      "type": "critical" (use for deal-breakers like completely wrong field),
      "category": "Skills Mismatch|Experience Gap|Missing Keywords|Format Issues|Contact Info",
      "message": "EXTREMELY SPECIFIC AND ACTIONABLE suggestion with exact text to add/change. Example: 'Add Python and Machine Learning to your skills section - these appear 8 times in the job description but are missing from your resume'",
      "priority": "high" (use high for job description mismatches)
    }
  ],
  "keywords": {
    "extracted": ["All important keywords/phrases from job description"],
    "missing": ["Keywords from job description NOT in resume - BE SPECIFIC"],
    "present": ["Keywords already in resume"],
    "matchPercentage": 0-100 (Calculate actual percentage of job keywords in resume)
  }
}

**CRITICAL EXTRACTION INSTRUCTIONS:**
1. DATES ARE MANDATORY: Extract ALL dates (experience start/end, education years, certification dates, project dates)
2. GPA IS CRUCIAL: Look for GPA, CGPA, percentage - extract if ≥3.0/4.0 or ≥70%
3. EXTRACT EVERYTHING: Certifications, projects, honors, awards, publications, volunteering - look in EVERY section
   - Look for "Certifications", "Licenses", "Professional Development" sections
   - Look for "Projects", "Portfolio", "Key Projects" sections
4. SKILLS EXTRACTION: Extract minimum 15-20 total skills combining technical + soft + tools. Look in Skills section, Experience bullets, Project descriptions
5. SOFT SKILLS: If not explicitly listed, infer from experience (e.g., "led team" = Leadership, "collaborated" = Teamwork)
6. CALCULATE DURATIONS: For experience, calculate "X years Y months" from dates
7. PRESERVE DETAILS: Don't summarize - extract complete information
8. CERTIFICATIONS & PROJECTS CRITICAL RULE:
   - parsedResume.certifications: Extract EVERY certification found (even just "AWS Certified", "PMP", etc.)
   - parsedResume.projects: Extract EVERY project found (look in Projects section, portfolio links, or mentioned in experience)
   - optimizedCertifications: MUST contain ALL certifications from parsedResume.certifications with skills field added
   - optimizedProjects: MUST contain ALL projects from parsedResume.projects with date and skills fields added
   - If NO certifications found after thorough search: certifications = [], optimizedCertifications = []
   - If NO projects found after thorough search: projects = [], optimizedProjects = []
9. EDUCATION CRITICAL RULE:
   - parsedResume.education: MUST have at least one entry if any education is mentioned
   - optimizedEducation: MUST match parsedResume.education with same number of entries
   - If no education found: education = [], optimizedEducation = []

**CRITICAL OPTIMIZATION INSTRUCTIONS:**
1. REWRITE, DON'T COPY: Transform weak summaries into powerful ones with numbers
2. OPTIMIZE BULLETS: Change "Responsible for X" → "Achieved Y by X resulting in Z impact"
3. ADD IMPACT: Every experience bullet should show measurable results
4. ENHANCE DESCRIPTIONS: Make project descriptions compelling with outcomes
5. HIGHLIGHT RELEVANCE: For certifications, explain why they matter

**CRITICAL SCORING INSTRUCTIONS:**
1. Job description match: Different field = Score 35-55, Similar field = 60-75, Good match = 75-85, Perfect = 85-95
2. Penalize missing dates: Deduct 5 points if experience dates missing
3. Reward completeness: +5 bonus for certifications, +3 for projects, +2 for honors
4. Skills mismatch: If resume "Java" but job needs "Python" = MAX 40% skills score
5. Experience mismatch: Junior level for senior role = MAX 50% experience score
6. Missing keywords: Each critical keyword missing = -2 from keywords score

**CRITICAL SUGGESTIONS:**
1. List 8-12 specific, actionable suggestions prioritized by impact
2. Format: "Add [SPECIFIC SKILL] to skills section - appears 5 times in job description"
3. Include date gaps: "Add employment dates to all experience entries"
4. Include GPA if good: "Add GPA (3.8/4.0) to education - strengthens application"
5. Suggest certifications: "Consider [SPECIFIC CERT] certification mentioned in job requirements"

**OUTPUT FORMAT:**
Return ONLY valid JSON, no markdown, no code blocks, no explanations outside JSON.`;
}


