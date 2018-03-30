'use strict';

import express from 'express';
import passport from 'passport';
import {setGoogleTokenCookie} from '../auth.service';

var router = express.Router();

router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/login',
        scope: [
            'profile',
            'email'
        ],
    }))
    .get('/callback', passport.authenticate('google', {
        failureRedirect: '/login',
    }), setGoogleTokenCookie);

export default router;
