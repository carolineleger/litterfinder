const User = require('../user/model/User')
const collectionName = 'auth'

// register
exports.registerNewUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email })
    if (isUser) {
      // Check if a user with the same email already exists
      return res.status(409).json({
        message: 'Email already in use',
      })
    }
    const user = new User(
      {
        email: req.body.email,
        password: req.body.password,
      },
      collectionName
    )
    const data = await user.save()
    const token = await user.generateAuthToken() // here it is calling the method that we created in the model
    res.status(201).json({ data, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// login
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findByCredentials(email, password, collectionName)
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}

// user details
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData)
}
