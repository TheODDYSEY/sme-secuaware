import dbConnect from '../../../lib/mongodb';
import User from '../../../lib/models/User';
import { hashPassword, generateToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email, password, companyName, companySize, industry } = req.body;

    // Validation
    if (!email || !password || !companyName || !companySize || !industry) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      companyName,
      companySize,
      industry,
      role: 'owner',
      securityScore: 25, // Initial score
    });

    await user.save();

    // Generate token
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
    };
    
    const token = generateToken(tokenPayload);

    // Set cookie
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        companyName: user.companyName,
        role: user.role,
        securityScore: user.securityScore,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}