const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// routes

// find all
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(400);
            console.log(err);
        })
});

// find one 
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Blog,
                attributes:
                    ['id', 'title', 'content', 'created_at'],

            },
            {
                model: Comment,
                attributes: ['id', 'content', 'created_at'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            },
        ]
    })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No users match this id, please try again' });
                return;
            }
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(400);
            console.log(err);
        });
});


module.exports = router;