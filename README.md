## 📖 **README.md**

```markdown
# 🎰 AfroX Rewards Hub

**Engage • Earn • Win** - Free hourly giveaways + premium engagement features

![AfroX Logo](public/afrodex_token.png)

## 🌟 Features

- ✅ **Free Hourly Giveaways** - 6 draws daily, 1B AfroX prize pool
- ✅ **Spin Wheel System** - 3 tiers (1x, 2x, 5x multipliers)
- ✅ **Global Leaderboard** - Compete for monthly prizes
- ✅ **Gasless Internal Transfers** - No fees between users
- ✅ **Live Price Integration** - Real-time AfroX pricing
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Provably Fair** - Transparent random selection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/afrox-rewards.git
   cd afrox-rewards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and select:
# - Project name: afrox-rewards
# - Framework: Next.js
# - Root directory: ./
```

### Method 2: GitHub Integration

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/afrox-rewards.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure project settings
   - Deploy

### Method 3: Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Add New Project"
3. Import from Git or upload files
4. Configure build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Add environment variables from `.env.local`
6. Click "Deploy"

## 🔧 Custom Domain Setup

### Configure rewards.afrox.one

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add domain: `rewards.afrox.one`
   - Add domain: `afrox-rewards.vercel.app` (mirror)

2. **In your DNS provider (Cloudflare/Namecheap):**
   ```
   Type: CNAME
   Name: rewards
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

3. **Wait for DNS propagation** (5-30 minutes)

4. **Enable HTTPS** (automatic in Vercel)

## 📁 Project Structure

```
afrox-rewards/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main application page
│   ├── globals.css        # Global styles
│   └── api/
│       └── price/
│           └── route.js   # Price API endpoint
├── components/
│   ├── WheelComponent.jsx # Spin wheel canvas
│   ├── FlashMessage.jsx   # Win celebration flash
│   ├── Header.jsx         # Navigation header
│   ├── PriceTicker.jsx    # Live price display
│   ├── UserDashboard.jsx  # Wallet & stats
│   ├── SpinTab.jsx        # Spin wheel interface
│   ├── GiveawayTab.jsx    # Giveaway countdown
│   ├── LeaderboardTab.jsx # Rankings display
│   └── RulesTab.jsx       # Official rules
├── public/
│   ├── afrodex_token.png  # AfroX logo
│   └── favicon.ico        # Site icon
├── package.json           # Dependencies
├── next.config.js         # Next.js config
├── tailwind.config.js     # Tailwind config
└── .env.local            # Environment variables
```

## 🔐 Environment Variables

Required variables in `.env.local`:

```env
NEXT_PUBLIC_AFROX_CONTRACT=0x08130635368aa28b217a4dfb68e1bf8dc525621c
NEXT_PUBLIC_GECKOTERMINAL_POOL=0xeb10676a236e97e214787e6a72af44c93639ba61
NEXT_PUBLIC_GECKOTERMINAL_NETWORK=eth
NEXT_PUBLIC_CONTACT_EMAIL=cot@afrox.one
NEXT_PUBLIC_DOMAIN=rewards.afrox.one
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📊 Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ API route caching (180s revalidation)
- ✅ Static page generation where possible
- ✅ Lazy loading for heavy components
- ✅ Tailwind CSS for minimal bundle size

## 🔒 Security Features

- ✅ X-Frame-Options header (prevent clickjacking)
- ✅ X-Content-Type-Options header
- ✅ Strict CORS policy
- ✅ Environment variable protection
- ✅ Input validation on all forms

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Build Errors

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: Port 3000 already in use**
```bash
kill -9 $(lsof -ti:3000)
npm run dev
```

### Deployment Issues

**Domain not working**
- Check DNS propagation: https://dnschecker.org
- Verify CNAME record points to `cname.vercel-dns.com`
- Wait 5-30 minutes for DNS updates

**Environment variables not loading**
- Ensure they're prefixed with `NEXT_PUBLIC_`
- Add them in Vercel dashboard: Settings → Environment Variables
- Redeploy after adding variables

### API Issues

**Price not updating**
- Check GeckoTerminal API status
- Verify pool address is correct
- Check browser console for errors
- Fallback price (0.000000009998) will be used if API fails

## 📞 Support

- **Email:** cot@afrox.one
- **Contract:** 0x08130635368aa28b217a4dfb68e1bf8dc525621c
- **Domain:** rewards.afrox.one

## ⚖️ Legal

- 🔞 18+ only
- ⚠️ NO PURCHASE NECESSARY
- 🚫 Not available in restricted regions
- 📋 See /rules for complete terms

## 📄 License

© 2025 AfroX DAO Community of Trust. All rights reserved.

---

**Built with Next.js 14, React 18, and Tailwind CSS**
```

---

## 🚀 **Deployment Instructions**

### **Step 1: Create Project Folder**

```bash
mkdir afrox-rewards
cd afrox-rewards
```

### **Step 2: Create All Files**

Copy each file content above into the corresponding file in your project structure.

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Add AfroX Logo**

Place your `afrodex_token.png` in the `public/` folder.

### **Step 5: Test Locally**

```bash
npm run dev
```

Open http://localhost:3000

### **Step 6: Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### **Step 7: Configure Custom Domain**

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Domains
   - Add `rewards.afrox.one`
   - Add `afrox-rewards.vercel.app`

2. **In your DNS provider:**
   ```
   Type: CNAME
   Name: rewards
   Value: cname.vercel-dns.com
   ```

3. **Add Environment Variables in Vercel:**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy

---

## ✅ **What's Next?**

After deployment, you'll need to:

1. Create the individual component files (I can provide those next)
2. Test all features
3. Set up analytics (optional)
4. Configure monitoring (optional)
