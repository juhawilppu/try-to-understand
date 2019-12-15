// src/setupProxy.js
//
// @ts-ignore: isolated modules error

/**
 * Proxy rules to be used in development environment.
 */
const proxy = require('http-proxy-middleware')
 
module.exports = (app) => {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}