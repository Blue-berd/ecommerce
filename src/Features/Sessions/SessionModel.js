import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true },
  loginTime: { type: Date, required: true },
  logoutTime: { type: Date },
  ipAddress: { type: String, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
