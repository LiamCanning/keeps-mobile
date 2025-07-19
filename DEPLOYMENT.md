# Vercel Deployment Guide for Keeps Sport App

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at https://vercel.com

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)
1. Run `vercel` in your project root
2. Follow the prompts to link your project
3. Your app will be deployed and you'll get a live URL

### Option 2: Deploy via GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

## Build Configuration
The project is configured with:
- Build Command: `expo export -p web`
- Output Directory: `dist`
- Install Command: `bun install`

## Environment Setup
Make sure your app.json includes web configuration:
```json
{
  "expo": {
    "web": {
      "favicon": "./assets/images/favicon.png",
      "bundler": "metro",
      "output": "static"
    }
  }
}
```

## Custom Domain
Once deployed, you can add a custom domain in your Vercel dashboard.

## Continuous Deployment
With GitHub integration, your app will automatically redeploy whenever you push changes to your main branch.

## Troubleshooting
- If build fails, check that all dependencies are properly installed
- Ensure all React Native Web compatible components are used
- Check Vercel build logs for specific errors