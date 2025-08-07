import dbConnect from '../../../lib/mongodb';
import EducationContent from '../../../lib/models/EducationContent';
import { getTokenFromRequest, verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (req.method === 'GET') {
      const { category, difficulty, limit = 20 } = req.query;
      
      // Build query
      const query = { isPublished: true };
      if (category) query.category = category;
      if (difficulty) query.difficulty = difficulty;

      // Get education content
      const content = await EducationContent.find(query)
        .select('title summary category difficulty estimatedReadTime tags createdAt')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      res.status(200).json({ content });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Education API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Seed initial education content
export async function seedEducationContent() {
  await dbConnect();
  
  const existingCount = await EducationContent.countDocuments();
  if (existingCount === 0) {
    const initialContent = [
      {
        title: "Cybersecurity Basics for Small Business",
        content: "Learn the fundamental cybersecurity concepts every small business owner should know...",
        summary: "Essential cybersecurity knowledge for SME owners and managers.",
        category: "basics",
        difficulty: "beginner",
        estimatedReadTime: 5,
        tags: ["fundamentals", "business-basics"]
      },
      {
        title: "Recognizing and Preventing Phishing Attacks",
        content: "Phishing attacks are one of the most common threats facing SMEs...",
        summary: "How to identify and protect against phishing attempts.",
        category: "phishing",
        difficulty: "beginner",
        estimatedReadTime: 7,
        tags: ["phishing", "email-security"]
      },
      {
        title: "Creating Strong Password Policies",
        content: "Password security is the first line of defense for your business...",
        summary: "Best practices for implementing effective password policies.",
        category: "passwords",
        difficulty: "intermediate",
        estimatedReadTime: 6,
        tags: ["passwords", "authentication"]
      }
    ];

    await EducationContent.insertMany(initialContent);
  }
}