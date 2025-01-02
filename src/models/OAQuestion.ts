import mongoose from 'mongoose';

const CompanyPhotoSchema = new mongoose.Schema({
  company: String,
  description: String,
  photos: [String],  
}, {
  timestamps: true, 
});

const CompanyPhoto = mongoose.models.CompanyPhoto || mongoose.model('CompanyPhoto', CompanyPhotoSchema);

export default CompanyPhoto;
