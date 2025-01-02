import mongoose from 'mongoose';

const CompanyPhotoSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: [{
      type: String, 
      required: true,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const CompanyPhoto = mongoose.models.CompanyPhoto || mongoose.model('CompanyPhoto', CompanyPhotoSchema);
