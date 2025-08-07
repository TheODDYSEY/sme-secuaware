# SME SecuAware System

A comprehensive cybersecurity awareness and protection platform designed specifically for Small and Medium Enterprises (SMEs) in Kenya. Built with Next.js, MongoDB, and modern security practices.

![SME SecuAware](https://img.shields.io/badge/SME-SecuAware-blue?style=for-the-badge&logo=shield)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)

## 🎯 Project Overview

The SME SecuAware System addresses the growing cybersecurity challenges faced by Small and Medium Enterprises in Kenya. With over 90% of SMEs vulnerable to cyber attacks, this platform provides:

- **Security Assessment Tools**: Comprehensive evaluation of cybersecurity posture
- **Threat Alert System**: Real-time notifications about relevant security threats
- **Education Center**: Curated cybersecurity learning resources
- **Dashboard Analytics**: Visual representation of security metrics
- **Industry-Specific Guidance**: Tailored recommendations for different business sectors

## ✨ Key Features

### 🛡️ Security Assessment
- Interactive questionnaire evaluating 8 key security areas
- Automated scoring and risk level determination
- Personalized recommendations based on assessment results
- Historical tracking of security improvements

### 🚨 Threat Alert System
- Industry-specific threat notifications
- Severity-based alert categorization (Low, Medium, High, Critical)
- Actionable recommendations for each threat
- Regular updates from cybersecurity sources

### 📚 Education Center
- Comprehensive cybersecurity learning materials
- Content categorized by difficulty level and topic
- Search and filtering capabilities
- Estimated reading times and progress tracking

### 📊 Security Dashboard
- Real-time security score visualization
- Quick access to critical security metrics
- Recent threat summaries
- Action item prioritization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git (optional)

### Installation
```bash
# Clone or create project
mkdir sme-secuaware && cd sme-secuaware

# Install dependencies
npm init -y
npm install next@14.0.0 react@^18.0.0 react-dom@^18.0.0
npm install mongoose@^8.0.0 bcryptjs@^2.4.3 jsonwebtoken@^9.0.0
npm install lucide-react@^0.290.0 dotenv@^16.0.0
npm install -D tailwindcss@^3.0.0 postcss@^8.0.0 autoprefixer@^10.0.0

# Initialize Tailwind
npx tailwindcss init -p

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# Seed database
node scripts/seed.js

# Start development
npm run dev
```

### Demo Account
```
Email: demo@sme.co.ke
Password: demo123
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **Icons**: Lucide React
- **Deployment**: Vercel, Railway, or custom server

### Project Structure
```
sme-secuaware/
├── components/          # React components
├── lib/                # Database models and utilities
├── pages/              # Next.js pages and API routes
├── scripts/            # Database seeding and utilities
├── styles/             # Global styles and Tailwind config
└── public/             # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Core Features
- `GET /api/threats` - Retrieve threat alerts
- `POST /api/assessment` - Submit security assessment
- `GET /api/assessment` - Get assessment history
- `GET /api/education` - Get education content

## 📊 Database Schema

### Collections
- **Users**: User accounts, company info, security scores
- **ThreatAlerts**: Security threat notifications
- **Assessments**: Security assessment results
- **EducationContent**: Learning materials and resources

### Key Indexes
- Email uniqueness for users
- Severity and category for threats
- User ID for assessments
- Published status for education content

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Server-side validation on all inputs
- **HTTPS Enforcement**: Secure communication in production
- **Rate Limiting**: Protection against abuse (middleware)
- **CORS Configuration**: Controlled cross-origin requests

## 🌍 Localization & Context

### Kenya-Specific Features
- Industry categories relevant to Kenyan SMEs
- Local threat intelligence and examples
- M-Pesa and mobile banking security guidance
- Regulatory compliance information (Data Protection Act)
- Swahili language support (planned)

### Industry Coverage
- Retail & E-commerce
- Manufacturing
- Agriculture & Agribusiness
- Professional Services
- Technology
- Other sectors

## 📈 Analytics & Metrics

### Key Performance Indicators
- User registration and retention rates
- Security assessment completion rates
- Security score improvements over time
- Threat alert engagement metrics
- Education content consumption patterns

### Reporting Features
- Individual security score tracking
- Industry benchmark comparisons
- Risk assessment trends
- Training completion rates

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Railway
```bash
npm i -g @railway/cli
railway init && railway up
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Security assessment completion
- [ ] Threat alert viewing
- [ ] Education content access
- [ ] Dashboard functionality
- [ ] Mobile responsiveness

### Automated Testing (Planned)
- Unit tests for API endpoints
- Integration tests for database operations
- End-to-end testing with Playwright
- Security vulnerability scanning

## 📚 Documentation

- **[Complete Setup Guide](./SETUP_GUIDE.md)**: Detailed installation instructions
- **[API Documentation](./docs/api.md)**: Comprehensive API reference
- **[User Manual](./docs/user-guide.md)**: End-user documentation
- **[Admin Guide](./docs/admin-guide.md)**: Administrative procedures

## 🤝 Contributing

### Development Guidelines
1. Follow existing code structure and conventions
2. Add appropriate error handling and validation
3. Update documentation for new features
4. Test thoroughly before submitting changes
5. Consider security implications of all changes

### Contribution Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support & Contact

### Getting Help
- **Documentation**: Check setup guides and API docs
- **Issues**: Report bugs via GitHub Issues
- **Community**: Join our Discord/Slack community
- **Email**: support@sme-secuaware.co.ke

### Professional Services
- Custom feature development
- Enterprise deployment assistance
- Cybersecurity consultation
- Training and workshops

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Kenya National Bureau of Statistics for SME data
- Communications Authority of Kenya for threat intelligence
- Cybersecurity experts and consultants
- SME business owners who provided feedback
- Open source community for excellent tools

## 🔮 Roadmap

### Version 2.0 (Planned)
- [ ] Mobile application (React Native)
- [ ] Advanced threat intelligence integration
- [ ] Multi-language support (Swahili)
- [ ] Industry-specific security modules
- [ ] Integration with popular business tools
- [ ] Advanced analytics and reporting

### Version 3.0 (Future)
- [ ] AI-powered threat detection
- [ ] Automated security scanning
- [ ] Compliance management tools
- [ ] Partner ecosystem integration
- [ ] White-label solutions
- [ ] API marketplace

---

**Built with ❤️ for Kenyan SMEs**

*Protecting businesses, one assessment at a time.*