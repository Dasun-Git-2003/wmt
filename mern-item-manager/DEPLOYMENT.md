# MERN Item Manager - Railway Deployment Guide

## Prerequisites
1. GitHub account (to push code)
2. Railway account (https://railway.app)
3. MongoDB Atlas account with database created

## Step 1: Prepare Your Code

Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/item-manager.git
git push -u origin main
```

## Step 2: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub and select this repository
5. Click "Deploy"

## Step 3: Set Environment Variables in Railway

In Railway dashboard, go to Variables and add:

```
MONGO_URI=mongodb+srv://Dasun:Dasun123@cluster0.xcjb2dw.mongodb.net/item_manager?retryWrites=true&w=majority
PORT=5000
```

## Step 4: Update Frontend API URL

Once deployed, Railway will give you a URL (e.g., `https://item-manager-xyz.up.railway.app`)

In your Frontend `.env.example`, add:
```
VITE_API_URL=https://item-manager-xyz.up.railway.app/api/items
```

## Step 5: Deploy

1. Commit and push changes
2. Railway will auto-deploy on push
3. Check deployment status in Railway dashboard
4. Your app is live!

## Troubleshooting

- **MongoDB connection error**: Make sure IP is whitelisted in MongoDB Atlas
- **Frontend can't connect to API**: Check VITE_API_URL matches your Railway URL
- **Build fails**: Check build logs in Railway dashboard

## Local Testing with Docker

```bash
docker-compose up
```

Then open http://localhost:5000
