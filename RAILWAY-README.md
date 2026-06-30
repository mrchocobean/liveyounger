# LifeWave Website — Railway Deployment

## Quick Deploy Steps

1. Go to https://railway.app and sign up (free with GitHub account)
2. Click "New Project" → "Deploy from folder" (or connect GitHub repo)
3. Upload this entire folder
4. Railway auto-detects Node.js and runs:
   - `npm install` (installs dependencies)
   - `npm start` (starts the server)
5. Wait ~2 minutes for the build to finish
6. Your site gets a permanent URL like:
   `liveyounger-production.up.railway.app`

## To Add Your Own Domain (optional)
- Go to your project → Settings → Domains
- Add your custom domain name
- Update DNS records as shown (point A-record to Railway)
- Railway provides free SSL automatically

## Files in This Folder
- `server.js` — Express web server
- `config.js` — Port setting
- `db.js` — SQLite database (contact form)
- `package.json` — Dependencies list
- `routes/` — Backend API routes
- `public/` — Website HTML, images, SEO files
- `DEPLOYMENT-INSTRUCTIONS.md` — Full guide for all hosting options

## Note
The file `package-lock.json` ensures the same dependency versions are installed.
Railway will read `package.json` and install everything automatically — no manual setup needed.
