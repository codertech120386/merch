# DOCUMENTATION

## Setup instructions

- For running this application you need to clone it and run below commands

```
cd frontend
pnpm install
pnpm run dev
```

- This will start a localhost server running on port 5173

## Deploying Vite + React + TypeScript App to Vercel

This guide outlines how to deploy a Vite-based React + TypeScript application to Vercel.

### Prerequisites

- Node.js and `pnpm` installed locally
- A GitHub (or GitLab/Bitbucket) repository for your project
- A [Vercel](https://vercel.com/) account

### Add a vercel.json file (optional but recommended)

```
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Push to GitHub

- Make sure your app is committed and pushed to a GitHub repository.

### Deploy via Vercel

- Go to [vercel.com](vercel.com)
- Click **"Add New Project"**
- Import your GitHub repo
- Vercel auto-detects Vite and configures:
  - **Framework Preset:** Vite
  - **Build Command:** vite build or npm run build
  - **Output Directory:** dist
- Click **"Deploy"**
