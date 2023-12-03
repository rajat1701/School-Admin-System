import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "Admins" },
  {
    timestamps: true,
  }
);
adminSchema.methods.findByCredentials = async (email, password) => {
  const user = await Admin.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }
  console.log(password + " " + user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
adminSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

adminSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
