const router = require('express').Router();

// const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');
const auth = require('./web/auth');
const blog = require('./web/blog');

router.use(auth);
router.use(blog);

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;