const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please include your email'],
    },
    password: {
      type: String,
      required: [true, 'Please include your password'],
    },
    dogs: [
      {
        dateOfBirth: {
          type: String,
          required: [true, 'Please include your dog dob'],
        },
        dogBreed1: {
          type: String,
          required: [true, 'Please include your dog breed'],
        },
        dogBreed2: {
          type: String,
          required: false,
        },
        breederName: {
          type: String,
          required: false,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    collection: 'auth',
  }
)

// this method will hash the password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id, email: user.email }, 'secret')
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid login details')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid login details')
  }
  return user
}

const User = mongoose.model('User', userSchema)
module.exports = User
