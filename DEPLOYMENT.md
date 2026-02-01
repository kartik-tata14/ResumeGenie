# 🚀 Deploying ResumeGenie to Netlify

This guide walks you through deploying the ResumeGenie application on Netlify with serverless functions.

## 📋 Prerequisites

- GitHub account with ResumeGenie repository
- Netlify account (free tier works perfectly)
- Gemini API key (get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

## 🔧 Deployment Steps

### Step 1: Prepare Your Repository

Ensure all deployment files are committed to your GitHub repository:

```powershell
git add .
git commit -m "Add Netlify deployment configuration"
git push origin main
```

The following files have been created for Netlify deployment:
- `netlify.toml` - Build configuration
- `netlify/functions/upload.js` - Resume upload serverless function
- `netlify/functions/export-latex.js` - LaTeX export serverless function
- `netlify/functions/package.json` - Serverless function dependencies

### Step 2: Connect to Netlify

1. **Log in to Netlify**: Go to [netlify.com](https://netlify.com) and sign in
2. **Import Project**: Click "Add new site" → "Import an existing project"
3. **Connect to GitHub**: 
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your repositories
   - Select the `ResumeGenie` repository

### Step 3: Configure Build Settings

Netlify should auto-detect the settings from `netlify.toml`, but verify:

- **Base directory**: `client`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

Click "Deploy site" (we'll add environment variables next).

### Step 4: Configure Environment Variables

⚠️ **CRITICAL**: Add your Gemini API key before the site works properly.

1. Go to **Site settings** → **Environment variables**
2. Click "Add a variable"
3. Add the following:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key from Google AI Studio
   - **Scopes**: Check all (Builds, Functions, Post Processing)
4. Click "Create variable"

### Step 5: Trigger Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the build to complete (usually 2-3 minutes)

### Step 6: Test Your Deployment

Once deployed, test the following:

1. **Landing Page**: Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
2. **Resume Upload**: Go to "Create Resume" and upload a PDF
3. **AI Optimization**: Verify that AI analysis works
4. **Template Export**: Test PDF download and LaTeX export
5. **LinkedIn URL**: Try the LinkedIn profile feature

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

## 🔄 Continuous Deployment

Your site will automatically redeploy when you push to GitHub:

```powershell
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically builds and deploys
```

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
