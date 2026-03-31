# Deploying GVB Tech Solutions to Vercel

This repository is built with the **Next.js App Router** and is fully optimized for production deployment on **Vercel**—the creators of Next.js. Deploying on Vercel guarantees zero-configuration setup, global Content Delivery Networks (CDNs), and automatic Image optimization.

## Step-by-Step Vercel Deployment

1. **Commit and Push to GitHub**
   Ensure all your latest code is committed and pushed to your primary repository on GitHub (or GitLab/Bitbucket).

   ```bash
   git add .
   git commit -m "chore: production ready for Vercel release"
   git push origin main
   ```

2. **Create a Vercel Account**
   If you do not have one, navigate to [Vercel's Website](https://vercel.com/) and sign up using your GitHub account.

3. **Import the Project**
   - Click the **"Add New..."** button and select **"Project"**.
   - Under the "Import Git Repository" section, locate your `gvb-tech-website` repository and click **Import**.

4. **Configure the Deployment**
   - **Project Name:** `gvb-tech-solutions` (or your preferred live name).
   - **Framework Preset:** Vercel will automatically detect **Next.js**. Leave this exactly as is.
   - **Root Directory:** If your `package.json` is at the root of the repository, leave this blank (default `./`).
   - **Build and Output Settings:** Leave default. Vercel automatically runs `npm run build` and `npm run start`.
   - **Environment Variables:** If you add a backend or an API later on, you can input your secure `.env.local` keys here. For now, leave this blank.

5. **Deploy!**
   Click the **Deploy** button. Vercel will spend ~30-60 seconds checking out your code, running the turbo-build compiler, generating the static HTML, and assigning you a live SSL-secured URL.

## Post-Deployment Settings

- **Custom Domains**: Once successfully deployed, click "Continue to Dashboard". Go to the **Settings > Domains** tab to attach your custom domain name (e.g., `gvbtechsolutions.com`).
- **Analytics**: Turn on **Vercel Web Analytics** in your project dashboard for deep, privacy-friendly insights into your website traffic and performance metrics without the overhead of Google Analytics.
