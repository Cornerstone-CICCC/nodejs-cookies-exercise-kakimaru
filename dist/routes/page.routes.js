"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const pageRouter = (0, express_1.Router)();
// In-memory database
let users = [{ userName: "admin", password: "admin12345" }];
// home
pageRouter.get("/", (req, res) => {
    res.status(200).render("index");
});
// login
pageRouter.get("/login", auth_1.checkLoginAuth, (req, res) => {
    res.status(200).render("login");
});
// process login route
pageRouter.post("/login", (req, res) => {
    const { userName, password } = req.body;
    const found = users.find((user) => user.userName === userName && user.password === password);
    if (found) {
        res.cookie("userName", userName, {
            maxAge: 3 * 60 * 1000,
            httpOnly: true,
            signed: true,
        });
        res.redirect("/profile");
    }
    else {
        res.redirect("/login");
    }
});
// profile
pageRouter.get("/profile", auth_1.checkAuth, (req, res) => {
    res.status(200).render("profile");
});
// logout
pageRouter.get("/logout", (req, res) => {
    res.clearCookie("userName");
    res.redirect("/");
});
exports.default = pageRouter;
