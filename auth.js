var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy


// var opts = {
//   jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey : 'secret',
//   issuer : 'accounts.examplesoft.com',
//   audience : 'localhost'
// }

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      done(null , {hi:"hi"})
    });
  }));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    
      done(null, {user:"hi"});
  
  });
