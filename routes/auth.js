const express = require('express');
const passport = require('passport');





const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: "/auth/failed" }), (req, res) => {
  res.redirect('/your-profile');
});


router.get('/api/current_user', (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    console.log(err);
  };
});

router.get('/auth/failed', (req, res) => {
  res.send('Failed to Log in');
})

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});



module.exports = router;

