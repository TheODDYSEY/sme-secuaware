import mongoose from 'mongoose';

const EducationContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    maxlength: 200,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['basics', 'phishing', 'passwords', 'malware', 'backup', 'compliance', 'incident-response'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  estimatedReadTime: {
    type: Number,
    required: true,
    min: 1,
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    default: 'SME SecuAware Team',
  },
}, {
  timestamps: true,
});

// Index for better query performance
EducationContentSchema.index({ category: 1, difficulty: 1 });
EducationContentSchema.index({ isPublished: 1, createdAt: -1 });
EducationContentSchema.index({ tags: 1 });

export default mongoose.models.EducationContent || mongoose.model('EducationContent', EducationContentSchema);