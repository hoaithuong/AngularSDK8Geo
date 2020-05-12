const { factory } = require("@gooddata/gooddata-js");
const https = require("https");
const fs = require("fs");
const express = require("express");

const proxy = require("./src/endpoints/proxy");
const register = require("./src/endpoints/register");
const assignProject = require("./src/endpoints/assignProject");
const staticFiles = require("./src/endpoints/staticFiles");

const config = {
    serveFrom: `${__dirname}/dist/angular-registration-login-example/`,
    port: process.env.PORT || 3009,
    https: process.env.HTTPS || false,
    domain: process.env.DOMAIN || "https://developer.na.gooddata.com/",
    domainAdmin: {
        username: process.env.DOMAIN_ADMIN_USERNAME,
        password: process.env.DOMAIN_ADMIN_PASSWORD,
    },
    projectIdToAssign: process.env.PROJECT_ID_TO_ASSIGN,
    userRole: process.env.USER_ROLE || 3,
};
console.log(`Examples-node-server config: ${JSON.stringify(config, false, "\t")}`);

const endpoints = [register, assignProject, proxy, staticFiles];

const sdk = factory({ domain: config.domain });

const app = express();
endpoints.forEach(handler => handler(app, sdk, config));

if (config.https) {
    console.log(
        "[hint] HTTPS certificates could be generated with: \n       openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.crt",
    );
    const options = {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.crt"),
        requestCert: false,
        rejectUnauthorized: false,
    };
    https.createServer(options, app).listen(config.port, () => {
        console.log(`Listening on https://localhost:${config.port}...`);
    });
} else {
    app.listen(config.port);
    console.log(`Listening on http://localhost:${config.port}...`);
}
