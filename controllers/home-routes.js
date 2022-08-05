const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Comment, Wish } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const userDisplay = dbUserData.map((User) =>
      User.get({ plain: true })
    );

    res.render('homepage', {
      userDisplay,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;