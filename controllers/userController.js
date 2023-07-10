const { User, Content } = require('../database/models');
// Google login
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// CRUD operations for User
const getAllUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content list' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUserByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const users = await User.findAll({ where: { status: status } });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: 'No users found with the provided status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id , {include: [Content]});
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    if (updated) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id },
    });
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const googleLogin = async (req, res) => {
  const { token }  = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  // Check if this user already exists in the database
  const user = await User.findOne({ where: { email } });
  if (user) {
    // User already exists, return the user
    res.status(200).json(user);
  } else {
    // If user does not exist, create a new user
    const newUser = await User.create({ name, email, picture });
    res.status(201).json(newUser);
  }
};

// CRUD operations for Content
// Define similar functions for other models (Hashtags, TaggedUsers, Scripts, etc.)

module.exports = {
  // User CRUD operations
  getAllUsers,
  createUser,
  getUserByStatus,
  getUserById,
  updateUser,
  deleteUser,
  googleLogin

  // Content CRUD operations
  // Define similar functions for other models (Hashtags, TaggedUsers, Scripts, etc.)
};
