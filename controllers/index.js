const router = require('express').Router();

const auth = require('./web/auth');
const blog = require('./web/blog');
const apiRoutes = require('./api');

// const homeRoutes = require('./homeRoutes');

router.use(auth);
router.use(blog);
router.use('/api', apiRoutes);

// router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;