"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = checkAuth;
exports.checkLoginAuth = checkLoginAuth;
function checkAuth(req, res, next) {
    const { userName } = req.signedCookies;
    if (userName === "admin") {
        next();
    }
    else {
        res.redirect("/login");
    }
}
function checkLoginAuth(req, res, next) {
    const { userName } = req.signedCookies;
    if (userName === "admin") {
        res.redirect("/profile");
    }
    else {
        next();
    }
}
