# GitHub Pages Deployment Instructions

Your project is now configured for GitHub Pages deployment. Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (give it a name like `usda-resources-chatbot`)
3. Do NOT initialize with README (we already have files)

## Step 2: Push Your Code

Run these commands in your terminal:

```bash
cd /path/to/your/project
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git commit -m "Initial commit with GitHub Pages configuration"
git push -u origin main
```

## Step 3: Add Supabase Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these two secrets:

   **Secret 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://0ec90b57d6e95fcbda19832f.supabase.co`

   **Secret 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw`

## Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Step 5: Deploy

The workflow will automatically run when you push to main. Your site will be available at:

**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME**

## Troubleshooting

- If the deployment fails, check the **Actions** tab in your repository for error logs
- Make sure both secrets are added correctly
- Ensure GitHub Pages is enabled and set to use GitHub Actions

## What's Been Configured

- ✅ Vite base path set to `./` for proper asset loading
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Build process configured with environment variables
- ✅ Deployment to GitHub Pages automated
