import mongoose from 'mongoose';

const ThreatAlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: ['low', 'medium', 'high', 'critical'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['phishing', 'malware', 'ransomware', 'data-breach', 'social-engineering', 'other'],
  },
  affectedIndustries: [{
    type: String,
    enum: ['retail', 'manufacturing', 'agriculture', 'services', 'technology', 'all'],
  }],
  recommendations: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  source: {
    type: String,
    default: 'SME SecuAware System',
  },
}, {
  timestamps: true,
});

// Index for better query performance
ThreatAlertSchema.index({ isActive: 1, severity: 1 });
ThreatAlertSchema.index({ category: 1 });
ThreatAlertSchema.index({ createdAt: -1 });

export default mongoose.models.ThreatAlert || mongoose.model('ThreatAlert', ThreatAlertSchema);