const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

/**
 * SessionFactory will help in getting the headless browser logged in.
 * 
 * The application is using Google OAuth 2.0 authentication which is
 * very difficult to log into programmatically - you will quickly need
 * to start solving the CAPTCHA puzzles provided by Google.
 * 
 * The solution is to simply by-pass OAuth 2.0 and generate a valid
 * passport access token. This token has nothing to do with OAuth 2.0.
 */
module.exports = () => {

    const userId = 1; // This user should be saved to database before hand.

    const sessionObject = {
        passport: {
            user: userId
        }
    }

    const session = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const sig = keygrip.sign(`express:sess=${session}`); 

    return { session, sig }
}