# 🚀 Netlify Deployment Guide

ResumeGenie is optimized for Netlify deployment. All code changes are automatically deployed when pushed to GitHub.

## 📋 Prerequisites

- GitHub account with ResumeGenie repository
- Netlify account (free tier)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

## 🚀 Deploy in 3 Steps

### Step 1: Connect GitHub to Netlify (5 minutes)

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **GitHub** → Choose **ResumeGenie** repository
5. Click **"Deploy site"**
   - Netlify auto-detects settings from `netlify.toml` ✅

### Step 2: Configure Gemini API Key (3 minutes) ⚠️ CRITICAL

1. Wait for build to complete (watch for green checkmark)
2. Go to **Site Settings** → **Environment variables**
3. Click **"Add a variable"**
4. Enter:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Scopes**: Check all (Builds, Functions, Post Processing)
5. Click **"Create variable"**
6. Go to **Deploys** tab → Click **"Trigger deploy"** → **"Deploy site"**
7. Wait for build to complete (usually 2-3 minutes)

### Step 3: Test Your Deployment (5 minutes)

Once deployed, verify functionality:

1. **Landing Page**: Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
2. **Resume Upload**: Go to "Create Resume" and upload a PDF/DOCX file
3. **AI Optimization**: Verify that AI analysis works
4. **Template Export**: Test PDF download and LaTeX export
5. **LinkedIn URL**: Try the LinkedIn profile feature if applicable

## 🔍 Verifying Deployment

### Check Function Logs

1. Go to **Functions** tab in Netlify dashboard
2. Click on `upload` or `export-latex` functions
3. View real-time logs to debug any issues

### Common Issues & Solutions

**Issue**: "GEMINI_API_KEY is not defined"
- **Solution**: Add the environment variable in Netlify settings and redeploy

**Issue**: Function timeout
- **Solution**: Netlify free tier has 10-second function timeout. Gemini AI usually responds in 3-5 seconds.

**Issue**: Upload fails with 413 error
- **Solution**: File size limit is 5MB. This is configured in the serverless function.

**Issue**: CORS errors
- **Solution**: Already configured in `netlify.toml` with proper headers

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Go to **Domain settings**
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

## 📊 Monitoring

Monitor your deployment:

- **Analytics**: Netlify Analytics tab (requires Pro plan)
- **Function Logs**: Real-time logs in Functions tab
- **Build Logs**: Deploy logs for troubleshooting build issues

## 🔄 Your New Workflow: Push → Deploy → Test

From now on, everything is on Netlify. No local development server needed:

```bash
# Make your code changes locally using your editor
# Then:
git add .
git commit -m "Your feature description"
git push origin main

# Netlify automatically:
# 1. Detects the push
# 2. Builds your code
# 3. Deploys to production
# 4. Live in ~2-3 minutes

# Test directly on your live Netlify URL
```

**That's it!** Every push updates your production app automatically.


## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | ✅ Yes |

## 🎯 Production Checklist

Before going live, verify:

- [ ] Environment variables configured
- [ ] Resume upload works (PDF, DOC, DOCX)
- [ ] LinkedIn URL parsing works
- [ ] AI optimization generates results
- [ ] ATS scoring displays correctly
- [ ] All 3 templates (Modern, Professional, Classic) render
- [ ] PDF download works
- [ ] LaTeX export works
- [ ] Mobile responsive design works
- [ ] Page load times are acceptable

## 🆘 Troubleshooting

### Build Fails

Check build logs in Netlify dashboard:
- Look for npm install errors
- Verify Node.js version compatibility
- Check for missing dependencies

### Functions Don't Work

1. Check function logs for errors
2. Verify environment variables are set
3. Test API endpoints: `https://your-site.netlify.app/.netlify/functions/upload`

### AI Features Not Working

1. Verify `GEMINI_API_KEY` is set correctly
2. Check function logs for Gemini API errors
3. Ensure API key has proper permissions in Google AI Studio

## 📞 Support

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Gemini AI Docs**: [ai.google.dev](https://ai.google.dev)
- **Project Issues**: Report on GitHub repository

## 🎉 You're Live!

Your ResumeGenie application is now deployed and accessible worldwide. Share your Netlify URL with users and start helping people create amazing resumes!

---

**Deployment Time**: ~5 minutes  
**Cost**: $0 (Netlify free tier)  
**Scalability**: Handles thousands of requests/month on free tier
