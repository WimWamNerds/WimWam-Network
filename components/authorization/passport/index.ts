/*
 * Copyright ©️ 2018-2020 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018-2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import {IGeesomeApp} from "../../app/interface";

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = async (app: IGeesomeApp) => {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy(
    function (username, password, cb) {
      console.log('passport.use(new Strategy(', username, password);
      app.database.getUserByName(username).then((user) => {
        if (!user) {
          return cb(null, false);
        }
        bcrypt.compare(password, user.passwordHash, function (err, res) {
          res ? cb(null, user) : cb(null, false);
        });
      }).catch(cb)
    }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    console.log('serializeUser', user);
    cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    console.log('deserializeUser', id);
    app.database.getUser(id).then(user => cb(null, user)).catch(cb);
  });

  passport.handleAuth = () => {
    return (req, res, next) => {
      return passport.authenticate('local')(req, res, () => {
        req.session.userId = req.user.id;
        next(req, res);
      });
    }//, { failureRedirect: '/login' }
  };

  return passport;
};



