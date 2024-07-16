const { JWT_SECRET } = require("../config/index");
const UserAnt = require("../models/user");
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserAnt.findAll({
        attributes: { exclude: ["id"] },
        where: { Col_LoginName: jwt_payload.username },
      });

      if (!user) {
        return done(new Error("Not Found in System"), null);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports.isLogin = passport.authenticate("jwt", { session: false });
