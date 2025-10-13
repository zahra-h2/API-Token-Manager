# 🚀 Vercel Deployment Guide

This guide will help you deploy your Keyshare frontend to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [Clerk account](https://clerk.com) for authentication
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or use existing one
3. Copy your API keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## Step 2: Push to Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Keyshare frontend"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/keyshare-frontend.git

# Push to main branch
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (if in monorepo) or `./`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? keyshare-frontend
# - Directory? ./ (or frontend if in monorepo)
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
# ... add other env vars

# Deploy to production
vercel --prod
```

## Step 4: Configure Clerk for Production

1. Go to your Clerk Dashboard
2. Navigate to your application
3. Go to **API Keys** section
4. Under **Allowed Origins**, add your Vercel domain:
   - `https://your-app.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

5. Under **Redirect URLs**, add:
   - `https://your-app.vercel.app/auth/sign-in`
   - `https://your-app.vercel.app/auth/sign-up`
   - `https://your-app.vercel.app/dashboard`

## Step 5: Set Up Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update Clerk allowed origins with your custom domain

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | Sign in page URL (default: `/auth/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | No | Sign up page URL (default: `/auth/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | No | Redirect after sign in (default: `/dashboard`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | No | Redirect after sign up (default: `/dashboard`) |
| `NEXT_PUBLIC_APP_URL` | No | Your app URL (for metadata) |
| `SENTRY_AUTH_TOKEN` | No | Sentry authentication token (optional) |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN (optional) |

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (18.x or higher)

### Authentication Issues

- Verify Clerk API keys are correct
- Check allowed origins in Clerk dashboard
- Ensure redirect URLs are configured

### Environment Variables Not Working

- Make sure variables starting with `NEXT_PUBLIC_` are used for client-side code
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### Custom Domain Not Working

- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are configured correctly
- Check SSL certificate status in Vercel

## Post-Deployment Checklist

- ✅ Site loads correctly
- ✅ Authentication works (sign in/sign up)
- ✅ Dashboard is accessible after login
- ✅ Documentation page loads
- ✅ All links work correctly
- ✅ Mobile responsive design works
- ✅ Footer displays correctly
- ✅ Custom domain configured (if applicable)

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

Every commit triggers a new deployment with a unique URL for testing.

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Clerk Documentation](https://clerk.com/docs)

---

**Made with ❤️ for Keyshare**
