import dbConnect from '../../../lib/mongodb';
import ThreatAlert from '../../../lib/models/ThreatAlert';
import User from '../../../lib/models/User';
import { getTokenFromRequest, verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Authentication check
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (req.method === 'GET') {
      // Get user's industry for personalized alerts
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get active threats relevant to user's industry
      const threats = await ThreatAlert.find({
        isActive: true,
        $or: [
          { affectedIndustries: user.industry },
          { affectedIndustries: 'all' },
          { affectedIndustries: { $size: 0 } }
        ]
      })
      .sort({ severity: -1, createdAt: -1 })
      .limit(20);

      res.status(200).json({ threats });
    } else if (req.method === 'POST' && decoded.role === 'admin') {
      // Admin only: Create new threat alert
      const {
        title,
        description,
        severity,
        category,
        affectedIndustries,
        recommendations
      } = req.body;

      if (!title || !description || !severity || !category) {
        return res.status(400).json({ error: 'Required fields missing' });
      }

      const threat = new ThreatAlert({
        title,
        description,
        severity,
        category,
        affectedIndustries: affectedIndustries || ['all'],
        recommendations: recommendations || [],
      });

      await threat.save();
      res.status(201).json({ message: 'Threat alert created', threat });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Threats API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Seed initial threat data if none exists
export async function seedThreats() {
  await dbConnect();
  
  const existingCount = await ThreatAlert.countDocuments();
  if (existingCount === 0) {
    const initialThreats = [
      {
        title: "Phishing Campaigns Targeting Kenyan SMEs",
        description: "Increased phishing attacks using fake M-Pesa and banking notifications to steal credentials.",
        severity: "high",
        category: "phishing",
        affectedIndustries: ["retail", "services", "all"],
        recommendations: [
          "Verify sender authenticity before clicking links",
          "Never provide credentials via email or SMS",
          "Report suspicious messages to your bank"
        ]
      },
      {
        title: "Ransomware Affecting Small Businesses",
        description: "New ransomware variant specifically targeting small business networks with weak security.",
        severity: "critical",
        category: "ransomware",
        affectedIndustries: ["all"],
        recommendations: [
          "Implement regular data backups",
          "Keep software updated",
          "Train employees on email security"
        ]
      }
    ];

    await ThreatAlert.insertMany(initialThreats);
  }
}