# How to Deploy Your LifeWave Website to a Permanent Server

## What You Need

1. The file `liveyounger-site.tar.gz` (attached below)
2. An account on a hosting platform (options below)

---

## Option 1: Railway.app (Easiest — Free Tier)

**Why:** No server management, just upload and it runs.

### Steps:

1. Go to **https://railway.app** and sign up (free with GitHub account)
2. Click **"New Project"** → **"Deploy from folder"** or connect your GitHub
3. Upload the `liveyounger-site.tar.gz` file
4. Railway auto-detects Node.js and runs `npm install && npm start`
5. Your site gets a permanent URL like `liveyounger-production.up.railway.app`
6. Optional: Go to Settings → Domains to add your own domain name

**Time:** ~5 minutes

---

## Option 2: Render.com (Free Tier)

1. Go to **https://render.com** and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo (upload the files there first) OR use their CLI
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Click **"Create Web Service"**
6. Your site gets a URL like `liveyounger.onrender.com`

**Time:** ~10 minutes

---

## Option 3: DigitalOcean Droplet (VPS — $5/month)

1. Go to **https://digitalocean.com** and create an account
2. Create a Droplet → choose **Node.js** image (or Ubuntu)
3. SSH into your server:
   ```bash
   ssh root@your-server-ip
   ```
4. Upload the files:
   ```bash
   # On your computer:
   scp liveyounger-site.tar.gz root@your-server-ip:/root/
   
   # On the server:
   cd /root
   mkdir liveyounger
   cd liveyounger
   tar xzf ../liveyounger-site.tar.gz
   npm install
   node server.js
   ```
5. Your site runs on port 10000 → access at `http://your-server-ip:10000`
6. Optional: Set up Nginx as a reverse proxy for port 80/443 and add your domain

**Time:** ~20 minutes

---

## Option 4: Any Server with SSH Access

If you already have a web server (VPS, dedicated, or shared hosting with SSH):

### Step 1: Upload the zip file
```bash
scp liveyounger-site.tar.gz username@your-server:/path/to/site/
```

### Step 2: Extract and install
```bash
cd /path/to/site/
tar xzf liveyounger-site.tar.gz
npm install
```

### Step 3: Start the server
```bash
# Run in background (stays alive after logout):
nohup node server.js &

# OR install PM2 for auto-restart:
npm install -g pm2
pm2 start server.js --name liveyounger
pm2 save
pm2 startup  # auto-start on server reboot
```

### Step 4: (Optional) Add Nginx reverse proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:10000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Then add SSL with: `sudo certbot --nginx -d yourdomain.com`

---

## What's Inside the Zip

```
liveyounger-site/
├── server.js          ← Express web server
├── config.js          ← Port setting (10000)
├── db.js              ← SQLite database for contact form
├── package.json       ← Dependencies list
├── routes/
│   ├── auth.js        ← Admin login
│   ├── contact.js     ← Contact form handler
│   └── analytics.js   ← Page view tracking
└── public/
    ├── index.html      ← Your full website (videos, SEO, content)
    ├── images/         ← All product images
    ├── robots.txt      ← SEO crawler rules
    └── sitemap.xml     ← SEO sitemap
```

---

## Changing the Port

If your host requires a different port, edit `config.js`:

```javascript
module.exports = { PORT: 3000 };  // or whatever port you need
```

---

## Need a Custom Domain?

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Point DNS A-record to your server's IP
3. Add the domain in your hosting platform's settings
4. Set up SSL (free with Let's Encrypt / Certbot)

---

## Quick Recommendation

If you want the **fastest, easiest** setup with no technical knowledge needed:

→ **Railway.app** — upload the zip, get a permanent URL in 5 minutes, free tier included.
