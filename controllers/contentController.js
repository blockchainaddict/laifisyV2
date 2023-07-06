// Llamar la base de datos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Content = db.Content;
const User = db.User;
const Hashtags = db.Hashtags;
const TaggedUsers = db.TaggedUsers;

const getAllContent = async (req, res) => {
  try {
    const contentList = await Content.findAll({
      include: [User, Hashtags, TaggedUsers]
    });
    res.json(contentList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content list' });
  }
};

const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content' });
  }
};

const getContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findByPk(id, {
      include: [User, Hashtags, TaggedUsers]
    });
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content' });
  }
};

const updateContent = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Content.update(req.body, {
      where: { id },
    });
    if (updated) {
      res.json({ message: 'Content updated successfully' });
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
};

const deleteContent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Content.destroy({
      where: { id },
    });
    if (deleted) {
      res.json({ message: 'Content deleted successfully' });
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

module.exports = {
  createContent,
  getContentById,
  getAllContent,
  updateContent,
  deleteContent
};
