import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responses: {
    passwordPolicy: { type: Number, min: 1, max: 5 },
    dataBackup: { type: Number, min: 1, max: 5 },
    employeeTraining: { type: Number, min: 1, max: 5 },
    softwareUpdates: { type: Number, min: 1, max: 5 },
    networkSecurity: { type: Number, min: 1, max: 5 },
    incidentResponse: { type: Number, min: 1, max: 5 },
    accessControl: { type: Number, min: 1, max: 5 },
    dataEncryption: { type: Number, min: 1, max: 5 },
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  recommendations: [{
    category: String,
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    description: String,
    actionItems: [String],
  }],
  completedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for better query performance
AssessmentSchema.index({ userId: 1, completedAt: -1 });
AssessmentSchema.index({ score: 1 });

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);