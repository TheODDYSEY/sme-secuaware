import dbConnect from '../../../lib/mongodb';
import Assessment from '../../../lib/models/Assessment';
import User from '../../../lib/models/User';
import { getTokenFromRequest, verifyToken } from '../../../lib/auth';

// Calculate security score and risk level
function calculateAssessment(responses) {
  const weights = {
    passwordPolicy: 15,
    dataBackup: 20,
    employeeTraining: 15,
    softwareUpdates: 15,
    networkSecurity: 15,
    incidentResponse: 10,
    accessControl: 10,
  };

  let totalScore = 0;
  let maxPossibleScore = 0;

  Object.entries(responses).forEach(([key, value]) => {
    if (weights[key]) {
      totalScore += (value * weights[key]) / 5;
      maxPossibleScore += weights[key];
    }
  });

  const score = Math.round((totalScore / maxPossibleScore) * 100);
  
  let riskLevel;
  if (score >= 80) riskLevel = 'low';
  else if (score >= 60) riskLevel = 'medium';
  else if (score >= 40) riskLevel = 'high';
  else riskLevel = 'critical';

  return { score, riskLevel };
}

// Generate recommendations based on responses
function generateRecommendations(responses, riskLevel) {
  const recommendations = [];

  if (responses.passwordPolicy <= 2) {
    recommendations.push({
      category: 'Password Security',
      priority: 'high',
      description: 'Implement strong password policies',
      actionItems: [
        'Require minimum 8-character passwords',
        'Enable multi-factor authentication',
        'Use password managers for employees'
      ]
    });
  }

  if (responses.dataBackup <= 2) {
    recommendations.push({
      category: 'Data Protection',
      priority: 'high',
      description: 'Establish regular data backup procedures',
      actionItems: [
        'Implement automated daily backups',
        'Test backup restoration monthly',
        'Store backups in multiple locations'
      ]
    });
  }

  if (responses.employeeTraining <= 2) {
    recommendations.push({
      category: 'Staff Training',
      priority: 'medium',
      description: 'Enhance cybersecurity awareness training',
      actionItems: [
        'Conduct monthly security awareness sessions',
        'Run phishing simulation tests',
        'Create security incident reporting procedures'
      ]
    });
  }

  return recommendations;
}

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
      // Get user's latest assessments
      const assessments = await Assessment.find({ userId: decoded.userId })
        .sort({ completedAt: -1 })
        .limit(5);

      res.status(200).json({ assessments });
    } else if (req.method === 'POST') {
      // Submit new assessment
      const { responses } = req.body;

      if (!responses || Object.keys(responses).length < 7) {
        return res.status(400).json({ error: 'Complete assessment responses required' });
      }

      // Calculate assessment results
      const { score, riskLevel } = calculateAssessment(responses);
      const recommendations = generateRecommendations(responses, riskLevel);

      // Create assessment record
      const assessment = new Assessment({
        userId: decoded.userId,
        responses,
        score,
        riskLevel,
        recommendations,
      });

      await assessment.save();

      // Update user's security score
      await User.findByIdAndUpdate(decoded.userId, {
        securityScore: score,
        lastAssessment: new Date(),
      });

      res.status(201).json({
        message: 'Assessment completed successfully',
        assessment: {
          score,
          riskLevel,
          recommendations,
          completedAt: assessment.completedAt,
        },
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Assessment API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}