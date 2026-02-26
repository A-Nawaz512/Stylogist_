import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, select: false }, // select: false hides it from queries by default
  role: { type: String, enum: ['User', 'Staff', 'Super Admin'], default: 'User' }
}, { timestamps: true });

// Composition: Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12 (highly secure, optimal for 2026 hardware)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Composition: Instance method to check password validity
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model('User', userSchema);