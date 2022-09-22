const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// routes

// find all - get
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(400);
            console.log(err).json(err);
        })
});

// find one - get
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
            console.log(err).json(err);
        });
});

// create user - post
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
        .then((userData) => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.name;
                req.session.loggedIn = true;
                res.json(userData)
            })
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
});

// login - post
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    })
    .then((userData) => {
        if (!userData) {
            res.status(404).json({ message: 'No one with that user name' });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Wrong Password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.name;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'Now logged in!' });
        });
    }) 
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
});

// logout - post
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
})

// update user - put
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then((userData) => {
        if (!userData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
});

// delete user - delete
router.delete ('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((userData) => {
        if (!userData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
});

module.exports = router;