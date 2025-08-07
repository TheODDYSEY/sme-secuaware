import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    // Removed index: true to avoid duplicate
  },
  companySize: {
    type: String,
    required: [true, 'Company size is required'],
    enum: ['1-10', '11-50', '51-200', '201-500'],
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    enum: ['retail', 'manufacturing', 'agriculture', 'services', 'technology', 'other'],
  },
  role: {
    type: String,
    required: true,
    enum: ['owner', 'employee', 'admin'],
    default: 'owner',
  },
  securityScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  lastAssessment: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Create indexes efficiently (no duplicates)
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ companyName: 1 });
UserSchema.index({ industry: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);