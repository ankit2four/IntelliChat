// backend/controllers/userController.js

const User = require('../models/User');

// Controller to fetch user data by ID
exports.getUserById = async (req, res) => {
    console.log("user fetched: ",req.user.id);
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
