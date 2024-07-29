import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  supabaseId: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: { type: String, default: null },
  phone: { type: String, required: true, unique: true },
  email: { type: String, default: null },
  profile_pic: { type: String, default: null },
  role: { type: String, enum: ["admin", "user"] },
  state: { type: String, default: null },
  city: { type: String, default: null },
  locality: { type: String, default: null },
  pincode: { type: String, default: null },

  premium: { type: Boolean, default: false },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  for (let key in this.toObject()) {
    if (this[key] === "null" || this[key] === "") {
      this[key] = null;
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
