# SME SecuAware System - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas account)
- Git (optional)

### Step 1: Project Setup
```bash
# Create project directory
mkdir sme-secuaware
cd sme-secuaware

# Initialize package.json
npm init -y

# Install dependencies
npm install next@14.0.0 react@^18.0.0 react-dom@^18.0.0
npm install mongoose@^8.0.0 bcryptjs@^2.4.3 jsonwebtoken@^9.0.0
npm install lucide-react@^0.290.0 dotenv@^16.0.0
npm install -D tailwindcss@^3.0.0 postcss@^8.0.0 autoprefixer@^10.0.0

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### Step 2: Environment Setup
```bash
# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/sme-secuaware
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Step 3: Database Setup
```bash
# Create scripts directory
mkdir scripts

# Run database seeding (after copying seed.js file)
node scripts/seed.js
```

### Step 4: Start Development Server
```bash
# Start the application
npm run dev

# Application will be available at http://localhost:3000
```

## 📁 Complete File Structure Creation

After running the initial setup commands, create the following directory structure and files:

```
sme-secuaware/
├── components/
│   ├── Dashboard.js
│   ├── EducationCenter.js
│   ├── SecurityAssessment.js
│   ├── ThreatAlerts.js
│   └── Layout.js
├── lib/
│   ├── mongodb.js
│   ├── auth.js
│   └── models/
│       ├── User.js
│       ├── ThreatAlert.js
│       ├── Assessment.js
│       └── EducationContent.js
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   │   └── logout.js
│   │   ├── threats/
│   │   │   └── index.js
│   │   ├── assessment/
│   │   │   └── index.js
│   │   └── education/
│   │       └── index.js
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── login.js
│   ├── register.js
│   ├── dashboard.js
│   ├── assessment.js
│   ├── threats.js
│   └── education.js
├── scripts/
│   └── seed.js
├── styles/
│   └── globals.css
├── public/
│   └── favicon.ico
├── .env.local.example
├── .env.local
├── middleware.js
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🗄️ Database Options

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community

# Your .env.local
MONGODB_URI=mongodb://localhost:27017/sme-secuaware
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Update .env.local:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sme-secuaware?retryWrites=true&w=majority
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Seed database with sample data
node scripts/seed.js
```

## 🧪 Testing the Application

### 1. Access the Application
- Open browser to `http://localhost:3000`
- You should see the landing page

### 2. Demo Account
After running the seed script, use these credentials:
- **Email**: demo@sme.co.ke
- **Password**: demo123

### 3. Test Registration
- Click "Get Started" or "Create Account"
- Fill in the registration form
- Verify account creation and login

### 4. Test Features
- **Dashboard**: View security overview
- **Security Assessment**: Complete the questionnaire
- **Threat Alerts**: View current threats
- **Education Center**: Browse security articles

## 🚀 Production Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add MONGODB_URI and JWT_SECRET
```

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Manual Server Deployment
```bash
# Build the application
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "sme-secuaware" -- start

# Or use forever
npm install -g forever
forever start npm start
```

## 🔒 Security Configuration

### Production Environment Variables
```bash
# Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Production .env.local
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-domain.com
```

### SSL/HTTPS Setup
- Use reverse proxy (nginx/Apache)
- Enable HTTPS with Let's Encrypt
- Configure security headers

## 🔍 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check MongoDB status
brew services list | grep mongodb
sudo systemctl status mongodb

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community
sudo systemctl restart mongodb
```

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
```

**Authentication Issues**
- Verify JWT_SECRET in environment variables
- Check token expiration settings
- Ensure HTTPS in production

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# MongoDB debug
MONGODB_DEBUG=true npm run dev
```

## 📊 Monitoring & Maintenance

### Performance Monitoring
- Monitor API response times
- Track database query performance
- Set up error logging (Sentry)
- Monitor resource usage

### Regular Maintenance
- Update dependencies monthly
- Monitor security vulnerabilities
- Backup database regularly
- Review and update threat alerts

### Scaling Considerations
- Database indexing optimization
- CDN for static assets
- Load balancing for multiple instances
- Caching strategies (Redis)

## 📞 Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community
- GitHub Issues for bug reports
- Discord/Slack community
- Stack Overflow for technical questions

### Professional Support
- Cybersecurity consultation services
- Custom development and integration
- Enterprise support packages

## 📈 Next Steps

After successful setup:

1. **Customize Content**: Update threat alerts and educational content
2. **Branding**: Modify colors, logos, and styling
3. **Features**: Add industry-specific modules
4. **Integration**: Connect with existing business systems
5. **Analytics**: Implement usage tracking
6. **Mobile App**: Consider mobile application development

## 🎯 Success Metrics

Track these KPIs to measure success:
- User registration and engagement
- Security assessment completion rates
- Threat alert effectiveness
- Educational content consumption
- Security score improvements
- Incident response times

---

**Need help?** Contact the development team or check the troubleshooting section above.