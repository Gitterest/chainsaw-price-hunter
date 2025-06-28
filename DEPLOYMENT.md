# 🚀 Railway Deployment Guide

## Environment Variables Required

### Frontend Service
Set these in Railway dashboard for the **frontend** service:

```
NEXT_PUBLIC_API_BASE=https://your-backend-service-name.up.railway.app
```

**Important**: Replace `your-backend-service-name` with your actual backend service name from Railway.

### Backend Service
Set these in Railway dashboard for the **backend** service:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production
```

## Deployment Steps

1. **Connect Repository to Railway**
   - Import your GitHub repository
   - Railway will detect the `railway.json` configuration

2. **Set Environment Variables**
   - Go to each service's Variables tab
   - Add the environment variables listed above
   - **Critical**: Set `NEXT_PUBLIC_API_BASE` to your backend service URL

3. **Deploy**
   - Railway will automatically build and deploy both services
   - Frontend will be available at your Railway domain
   - Backend will be available at `https://your-backend-service-name.up.railway.app`

## Troubleshooting

### Frontend Not Loading
- Check that `NEXT_PUBLIC_API_BASE` is set correctly
- Verify the backend service is running
- Check Railway logs for build errors

### API Connection Issues
- Ensure CORS is configured correctly (already fixed in code)
- Verify backend service URL is accessible
- Check that all environment variables are set

### Port Issues
- Fixed: All services now use `$PORT` environment variable
- Railway automatically provides the correct port

## Service URLs

After deployment, your services will be available at:
- **Frontend**: `https://your-frontend-service-name.up.railway.app`
- **Backend**: `https://your-backend-service-name.up.railway.app`

## Health Checks

Test your deployment:
- Frontend: Visit the main URL
- Backend: Visit `/api/health` endpoint
- API: Test `/api/scraper/test` endpoint 