const mongoose=require('mongoose')

const bCrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bCrypt.genSalt(10);
    this.password = await bCrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bCrypt.compare(enteredPassword, this.password);
};

const users=mongoose.model('users', userSchema);
module.exports = users