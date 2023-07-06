const { User, Content } = require('../database/models');

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

  // Content CRUD operations
  // Define similar functions for other models (Hashtags, TaggedUsers, Scripts, etc.)
};
