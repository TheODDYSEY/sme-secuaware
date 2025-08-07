const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config({ path: '.env' });

// Model schemas (simplified for seeding)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companySize: { type: String, required: true },
  industry: { type: String, required: true },
  role: { type: String, default: 'owner' },
  securityScore: { type: Number, default: 25 },
}, { timestamps: true });

const ThreatAlertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, required: true },
  category: { type: String, required: true },
  affectedIndustries: [String],
  recommendations: [String],
  isActive: { type: Boolean, default: true },
  source: { type: String, default: 'SME SecuAware System' },
}, { timestamps: true });

const EducationContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  estimatedReadTime: { type: Number, required: true },
  tags: [String],
  isPublished: { type: Boolean, default: true },
  viewCount: { type: Number, default: 0 },
  author: { type: String, default: 'SME SecuAware Team' },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const ThreatAlert = mongoose.model('ThreatAlert', ThreatAlertSchema);
const EducationContent = mongoose.model('EducationContent', EducationContentSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await ThreatAlert.deleteMany({});
    await EducationContent.deleteMany({});

    // Seed Demo User
    console.log('Creating demo user...');
    const hashedPassword = await bcrypt.hash('demo123', 12);
    await User.create({
      email: 'demo@sme.co.ke',
      password: hashedPassword,
      companyName: 'Demo SME Ltd',
      companySize: '11-50',
      industry: 'retail',
      role: 'owner',
      securityScore: 45,
    });

    // Seed Threat Alerts
    console.log('Creating threat alerts...');
    const threats = [
      {
        title: "Phishing Campaigns Targeting Kenyan SMEs",
        description: "Increased phishing attacks using fake M-Pesa and banking notifications to steal credentials. Attackers are impersonating trusted financial institutions.",
        severity: "high",
        category: "phishing",
        affectedIndustries: ["retail", "services", "all"],
        recommendations: [
          "Verify sender authenticity before clicking links",
          "Never provide credentials via email or SMS",
          "Report suspicious messages to your bank",
          "Enable two-factor authentication on all accounts"
        ]
      },
      {
        title: "Ransomware Affecting Small Businesses",
        description: "New ransomware variant specifically targeting small business networks with weak security. Attackers are demanding payments in cryptocurrency.",
        severity: "critical",
        category: "ransomware",
        affectedIndustries: ["all"],
        recommendations: [
          "Implement regular data backups",
          "Keep all software updated",
          "Train employees on email security",
          "Use endpoint protection software"
        ]
      },
      {
        title: "WhatsApp Business Scams",
        description: "Fraudsters are creating fake WhatsApp Business profiles to deceive customers and steal payment information.",
        severity: "medium",
        category: "social-engineering",
        affectedIndustries: ["retail", "services"],
        recommendations: [
          "Verify WhatsApp Business profiles",
          "Use official verification badges",
          "Educate customers about verification",
          "Monitor for impersonation attempts"
        ]
      },
      {
        title: "Malware in Pirated Software",
        description: "Malicious software hidden in cracked business applications is compromising SME systems and stealing sensitive data.",
        severity: "high",
        category: "malware",
        affectedIndustries: ["all"],
        recommendations: [
          "Use only licensed software",
          "Install antivirus protection",
          "Regular system scans",
          "Employee training on safe downloads"
        ]
      }
    ];

    await ThreatAlert.insertMany(threats);

    // Seed Education Content
    console.log('Creating education content...');
    const educationContent = [
      {
        title: "Cybersecurity Basics for Small Business Owners",
        content: `Cybersecurity is no longer just a concern for large corporations. Small and Medium Enterprises (SMEs) in Kenya are increasingly becoming targets for cybercriminals. This guide will help you understand the fundamental concepts of cybersecurity and why it's crucial for your business.

**Why SMEs Are Targeted**
- Weaker security measures compared to large companies
- Valuable customer data and financial information
- Often serve as entry points to larger business networks
- Limited cybersecurity awareness and training

**Basic Security Principles**
1. **Confidentiality**: Ensuring that sensitive information is only accessible to authorized individuals
2. **Integrity**: Maintaining the accuracy and completeness of data
3. **Availability**: Ensuring systems and data are accessible when needed

**Common Threats to SMEs**
- Phishing emails and social engineering attacks
- Malware and ransomware
- Weak passwords and authentication
- Unsecured networks and devices
- Data breaches and theft

**Getting Started with Security**
Start by conducting a basic security assessment of your business. Identify what data you need to protect, where it's stored, and who has access to it. This foundation will help you implement appropriate security measures.

Remember: Cybersecurity is an ongoing process, not a one-time setup. Regular updates, training, and vigilance are key to maintaining a secure business environment.`,
        summary: "Essential cybersecurity knowledge every small business owner should understand to protect their company from cyber threats.",
        category: "basics",
        difficulty: "beginner",
        estimatedReadTime: 8,
        tags: ["fundamentals", "business-basics", "sme-security", "introduction"]
      },
      {
        title: "Recognizing and Preventing Phishing Attacks",
        content: `Phishing attacks are one of the most common and effective methods used by cybercriminals to target SMEs in Kenya. These attacks trick employees into revealing sensitive information or installing malicious software.

**What is Phishing?**
Phishing is a form of social engineering where attackers impersonate trusted entities to steal sensitive information such as usernames, passwords, and financial details.

**Common Phishing Methods in Kenya**
1. **Email Phishing**: Fake emails from banks, M-Pesa, or government agencies
2. **SMS Phishing (Smishing)**: Fraudulent text messages requesting personal information
3. **Voice Phishing (Vishing)**: Phone calls impersonating legitimate organizations
4. **WhatsApp Phishing**: Fake business profiles and suspicious links

**Red Flags to Watch For**
- Urgent requests for personal or financial information
- Suspicious email addresses or phone numbers
- Poor grammar and spelling mistakes
- Unexpected attachments or links
- Requests to verify account information

**Protection Strategies**
1. **Employee Training**: Regular awareness sessions about phishing tactics
2. **Verification Procedures**: Always verify requests through official channels
3. **Technical Measures**: Email filtering and anti-phishing software
4. **Incident Response**: Clear procedures for reporting suspicious messages

**What to Do If Targeted**
- Do not click links or download attachments
- Verify the sender through official contact information
- Report the incident to relevant authorities
- Monitor accounts for suspicious activity

**Real-World Example**
A Nairobi retail business received an email claiming to be from KRA requesting urgent tax document updates. The email contained a link to a fake website designed to steal login credentials. By following verification procedures, the business identified it as a phishing attempt and reported it to authorities.`,
        summary: "Learn to identify and protect your business from phishing attacks, the most common cybersecurity threat facing Kenyan SMEs.",
        category: "phishing",
        difficulty: "beginner",
        estimatedReadTime: 12,
        tags: ["phishing", "email-security", "social-engineering", "awareness"]
      },
      {
        title: "Creating Strong Password Policies for Your Business",
        content: `Password security is the first line of defense for your business systems and data. Weak passwords are one of the leading causes of security breaches in SMEs.

**The Current Password Problem**
Many businesses still use weak, easily guessable passwords or reuse the same password across multiple systems. This creates significant security vulnerabilities that cybercriminals can easily exploit.

**Elements of a Strong Password Policy**

**1. Password Complexity Requirements**
- Minimum 12 characters (longer is better)
- Combination of uppercase and lowercase letters
- Include numbers and special characters
- Avoid common words and patterns

**2. Password Uniqueness**
- Different passwords for different systems
- No reuse of previous passwords
- Separate personal and business passwords

**3. Regular Updates**
- Change passwords every 90 days for sensitive accounts
- Immediate change if compromise is suspected
- Update default passwords on all systems

**4. Multi-Factor Authentication (MFA)**
- Enable MFA on all business accounts
- Use authenticator apps instead of SMS when possible
- Backup authentication methods

**Implementing Password Managers**
Password managers are essential tools for SMEs:
- Generate strong, unique passwords
- Store passwords securely
- Enable easy password sharing for teams
- Provide security reporting

**Recommended Password Managers for SMEs**
1. **Bitwarden**: Affordable with business plans
2. **LastPass**: User-friendly with good support
3. **1Password**: Excellent security features
4. **Dashlane**: Good for businesses with many users

**Employee Training and Enforcement**
- Regular password security training
- Clear consequences for policy violations
- Regular password audits and assessments
- Incentives for following best practices

**Creating Your Password Policy Document**
Your policy should include:
- Minimum password requirements
- MFA requirements
- Password storage guidelines
- Incident reporting procedures
- Regular review schedules

**Implementation Timeline**
Week 1: Assess current password practices
Week 2: Choose and deploy password manager
Week 3: Train employees on new policy
Week 4: Implement MFA on critical systems
Month 2: Regular compliance monitoring`,
        summary: "Comprehensive guide to implementing strong password policies that protect your business from unauthorized access.",
        category: "passwords",
        difficulty: "intermediate",
        estimatedReadTime: 15,
        tags: ["passwords", "authentication", "mfa", "policy", "access-control"]
      },
      {
        title: "Understanding and Preventing Malware",
        content: `Malware (malicious software) represents one of the most serious threats to SMEs in Kenya. Understanding different types of malware and how to prevent infections is crucial for business protection.

**Types of Malware Affecting SMEs**

**1. Viruses**
- Attach to legitimate files and spread
- Can corrupt or delete important data
- Often spread through email attachments

**2. Ransomware**
- Encrypts business files and demands payment
- Particularly devastating for SMEs
- Growing threat in Kenya

**3. Spyware**
- Secretly monitors and steals information
- Can capture passwords and financial data
- Often undetected for long periods

**4. Trojans**
- Disguised as legitimate software
- Create backdoors for attackers
- Common in pirated software

**5. Adware**
- Displays unwanted advertisements
- Can slow down systems
- May collect browsing data

**Prevention Strategies**

**1. Endpoint Protection**
- Install reputable antivirus software
- Keep definitions updated automatically
- Regular full system scans

**2. Software Updates**
- Enable automatic updates for operating systems
- Keep all software patched and current
- Remove unused applications

**3. Safe Browsing Practices**
- Avoid suspicious websites
- Be cautious with downloads
- Use reputable web browsers with security features

**4. Email Security**
- Don't open suspicious attachments
- Verify sender before clicking links
- Use email filtering solutions

**5. Network Security**
- Secure WiFi networks with WPA3
- Use firewalls for network protection
- Segment business and guest networks

**Response to Malware Infections**

**Immediate Actions:**
1. Disconnect infected device from network
2. Do not restart the infected computer
3. Contact IT support immediately
4. Begin recovery procedures

**Recovery Steps:**
1. Use clean backup to restore systems
2. Run comprehensive security scans
3. Update all security software
4. Review and improve security measures

**Backup Strategy**
Regular backups are your best defense against malware:
- Daily automated backups
- Test restoration procedures regularly
- Store backups offline or in cloud
- Maintain multiple backup copies

**Employee Training**
- Recognition of malware symptoms
- Safe computing practices
- Incident reporting procedures
- Regular security awareness updates

**Special Considerations for Kenyan SMEs**
- Use of pirated software increases malware risk
- Mobile device security for business use
- Public WiFi security when traveling
- Banking malware targeting M-Pesa and mobile banking`,
        summary: "Complete guide to understanding, preventing, and responding to malware threats that target small businesses.",
        category: "malware",
        difficulty: "intermediate",
        estimatedReadTime: 18,
        tags: ["malware", "prevention", "antivirus", "ransomware", "endpoint-security"]
      },
      {
        title: "Essential Data Backup Strategies for SMEs",
        content: `Data loss can be devastating for small businesses. Whether caused by hardware failure, cyber attacks, or natural disasters, losing critical business data can result in significant downtime and financial losses.

**Why Backup is Critical for SMEs**
- 60% of companies that lose data shut down within 6 months
- Average cost of data loss for SMEs: $8,000-$74,000
- Ransomware attacks increasingly target backup systems
- Business continuity depends on data availability

**Types of Data to Backup**

**Critical Business Data:**
- Customer information and databases
- Financial records and transactions
- Employee records and payroll data
- Product catalogs and inventory
- Email communications
- Website content and databases

**System Data:**
- Operating system configurations
- Application settings
- Security certificates
- User profiles and preferences

**The 3-2-1 Backup Rule**
- **3** copies of important data
- **2** different storage media types
- **1** offsite backup location

**Backup Methods for SMEs**

**1. Local Backups**
- External hard drives
- Network Attached Storage (NAS)
- Quick restoration times
- Complete control over data

**2. Cloud Backups**
- Automatic and scheduled
- Offsite protection
- Scalable storage
- Professional maintenance

**3. Hybrid Approach**
- Combines local and cloud benefits
- Fastest recovery for recent data
- Long-term offsite protection

**Recommended Backup Solutions**

**Cloud Solutions:**
- **Google Workspace**: Integrated with business tools
- **Microsoft 365**: Enterprise-grade backup
- **Carbonite**: SME-focused backup service
- **Acronis**: Comprehensive cyber protection

**Local Solutions:**
- **QNAP NAS**: Network storage systems
- **Synology**: User-friendly NAS devices
- **Windows Backup**: Built-in Windows solution

**Backup Best Practices**

**1. Regular Testing**
- Monthly restoration tests
- Verify data integrity
- Document recovery procedures
- Train staff on recovery process

**2. Security Measures**
- Encrypt backup data
- Secure backup locations
- Access controls and monitoring
- Regular security audits

**3. Documentation**
- Backup schedules and procedures
- Recovery point objectives (RPO)
- Recovery time objectives (RTO)
- Emergency contact information

**4. Monitoring and Maintenance**
- Automated backup monitoring
- Regular storage capacity reviews
- Software updates and patches
- Performance optimization

**Creating Your Backup Plan**

**Step 1: Assessment**
- Identify critical data and systems
- Determine recovery requirements
- Assess current backup capabilities

**Step 2: Strategy Development**
- Choose appropriate backup methods
- Define backup schedules
- Establish retention policies

**Step 3: Implementation**
- Deploy backup solutions
- Configure automated schedules
- Test initial backups

**Step 4: Ongoing Management**
- Regular monitoring and testing
- Staff training and updates
- Plan reviews and improvements

**Cost Considerations for SMEs**
- Start with essential data backup
- Scale as business grows
- Consider cloud costs vs. local investment
- Factor in staff time and training
- Budget for regular testing and maintenance

**Disaster Recovery Planning**
Beyond backup, consider:
- Alternative work locations
- Communication procedures
- Critical system priorities
- Vendor and supplier contacts
- Insurance and financial considerations`,
        summary: "Comprehensive guide to implementing effective data backup strategies that protect your business from data loss.",
        category: "backup",
        difficulty: "intermediate",
        estimatedReadTime: 20,
        tags: ["backup", "disaster-recovery", "data-protection", "business-continuity"]
      },
      {
        title: "Incident Response Planning for SMEs",
        content: `When a cybersecurity incident occurs, having a well-prepared response plan can mean the difference between a minor disruption and a business-threatening disaster.

**What is an Incident Response Plan?**
A documented set of procedures that guides your organization's response to cybersecurity incidents, minimizing damage and recovery time.

**Why SMEs Need Incident Response Plans**
- Faster containment of security breaches
- Reduced business disruption and costs
- Better compliance with regulations
- Improved customer trust and reputation
- Legal protection and documentation

**Types of Security Incidents**

**1. Data Breaches**
- Unauthorized access to sensitive data
- Customer information exposure
- Financial data theft

**2. Malware Infections**
- Virus, ransomware, or spyware
- System performance degradation
- Data corruption or encryption

**3. Phishing Attacks**
- Employee credential compromise
- Business email compromise
- Financial fraud attempts

**4. System Outages**
- Network or server failures
- Website or service disruptions
- Communication system failures

**5. Insider Threats**
- Malicious employee actions
- Accidental data exposure
- Unauthorized system access

**The Incident Response Process**

**Phase 1: Preparation**
- Develop response procedures
- Assemble incident response team
- Prepare tools and communication channels
- Conduct regular training and drills

**Phase 2: Detection and Analysis**
- Monitor systems for incidents
- Validate and classify incidents
- Assess scope and impact
- Document initial findings

**Phase 3: Containment**
- Isolate affected systems
- Prevent further damage
- Preserve evidence
- Implement temporary fixes

**Phase 4: Eradication**
- Remove malware or threats
- Close security vulnerabilities
- Update security measures
- Verify system cleanliness

**Phase 5: Recovery**
- Restore systems and services
- Monitor for recurring issues
- Implement additional safeguards
- Return to normal operations

**Phase 6: Lessons Learned**
- Document the incident
- Analyze response effectiveness
- Update procedures and training
- Improve security measures

**Building Your Incident Response Team**

**Core Team Members:**
- **Incident Commander**: Overall response coordination
- **IT Security**: Technical analysis and remediation
- **IT Operations**: System restoration and maintenance
- **Legal**: Compliance and legal implications
- **Communications**: Internal and external messaging
- **Management**: Decision-making authority

**External Resources:**
- Cybersecurity consultants
- Legal advisors
- Law enforcement contacts
- Insurance representatives
- Forensics specialists

**Essential Response Tools**

**Communication Tools:**
- Secure messaging platforms
- Emergency contact lists
- Pre-written communication templates
- Media monitoring tools

**Technical Tools:**
- Forensics and analysis software
- System isolation capabilities
- Backup and recovery systems
- Network monitoring tools

**Documentation Tools:**
- Incident tracking systems
- Evidence collection procedures
- Timeline documentation
- Action item management

**Communication During Incidents**

**Internal Communication:**
- Immediate team notification
- Executive briefings
- Employee updates
- Stakeholder notifications

**External Communication:**
- Customer notifications
- Vendor communications
- Regulatory reporting
- Media statements (if required)

**Creating Your Incident Response Plan**

**1. Risk Assessment**
- Identify potential threats
- Assess business impact
- Prioritize critical assets
- Define incident severity levels

**2. Procedure Development**
- Create step-by-step response procedures
- Define roles and responsibilities
- Establish escalation procedures
- Develop communication templates

**3. Team Training**
- Regular tabletop exercises
- Technical skills training
- Communication practice
- Plan familiarization

**4. Plan Testing**
- Simulate different incident types
- Test communication procedures
- Evaluate response effectiveness
- Identify improvement areas

**Legal and Regulatory Considerations**
- Data protection law compliance
- Breach notification requirements
- Evidence preservation procedures
- Insurance claim processes

**Budget Considerations**
- Response team training costs
- Tool and technology investments
- External consultant retainers
- Insurance coverage evaluation

**Measuring Response Effectiveness**
- Mean time to detection (MTTD)
- Mean time to containment (MTTC)
- Mean time to recovery (MTTR)
- Business impact assessment
- Customer satisfaction metrics`,
        summary: "Step-by-step guide to creating and implementing an effective incident response plan for your SME.",
        category: "incident-response",
        difficulty: "advanced",
        estimatedReadTime: 25,
        tags: ["incident-response", "emergency-planning", "crisis-management", "security-procedures"]
      }
    ];

    await EducationContent.insertMany(educationContent);

    console.log('Database seeded successfully!');
    console.log('\nDemo Account Created:');
    console.log('Email: demo@sme.co.ke');
    console.log('Password: demo123');
    console.log('\nYou can now start the development server with: npm run dev');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;