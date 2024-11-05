import { Request, Response, NextFunction } from "express";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const { userName } = req.signedCookies;
  if (userName === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
}

export function checkLoginAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName } = req.signedCookies;
  if (userName === "admin") {
    res.redirect("/profile");
  } else {
    next();
  }
}
