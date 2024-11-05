import { Router, Request, Response } from "express";
import { checkAuth, checkLoginAuth } from "../middleware/auth";

const pageRouter = Router();

// In-memory database
let users: User[] = [{ userName: "admin", password: "admin12345" }];

// home
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

// login
pageRouter.get("/login", checkLoginAuth, (req: Request, res: Response) => {
  res.status(200).render("login");
});

// process login route
pageRouter.post("/login", (req: Request<{}, {}, User>, res: Response) => {
  const { userName, password } = req.body;
  const found = users.find(
    (user) => user.userName === userName && user.password === password
  );
  if (found) {
    res.cookie("userName", userName, {
      maxAge: 3 * 60 * 1000,
      httpOnly: true,
      signed: true,
    });
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

// profile
pageRouter.get("/profile", checkAuth, (req: Request, res: Response) => {
  res.status(200).render("profile");
});

// logout
pageRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("userName");
  res.redirect("/");
});

export default pageRouter;
