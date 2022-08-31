const router = require('express').Router();

// contains auth routes

// a login page
router.get('/login', (req, res) => {

    res.render("login")

})

// a post login page (for user to login)
router.post('/login', async (req, res) => {

    // logic
    // console.log(req.body);

    // log the user in
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
          res
            .status(400)
            .render('login', {
                error: "Email and/or Password incorrect. Please try again."
            })
            return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .render('login', {
                error: "Email and/or Password incorrect. Please try again."
            })
            return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.redirect('/home')
        });
    
      } catch (err) {
        res.status(400).render('login', {
            error: "Email and/or Password incorrect. Please try again."
        });
      }
})

// signup page

// post (for user to actually sign up)

module.exports = router;