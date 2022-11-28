const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"464070235754-rdlqovc3eqj6nisqal4mfcdd5is3addo.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	callbackURL:"http://localhost:4000/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
