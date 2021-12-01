import { Router } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { registerValidators, loginValidators } from "../utils/validators.js";
import User from "../models/user.js";
import Group from "../models/group.js";

const router = Router();

router.post("/login", loginValidators, async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json(errors);
      }
      const { password, username } = req.body;
      const candidate = await User.findOne({ username });
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
         req.session.user = candidate;
         req.session.isAuthenticated = true;
         req.session.save((err) => {
            if (err) throw err;
         });
         req.flash("loginStatus", "Успешный логин");
         res.redirect("../user/profile");
      } else {
         req.flash("loginStatus", "Неправильный пароль");
         res.redirect("login");
      }
      res.json({ status: "done", message: "Успешный вход" });
   } catch (e) {
      console.log(e);
   }
});

router.get("/logout", async (req, res) => {
   req.session.destroy(() => {
      res.redirect("login");
   });
});

router.post("/registration", registerValidators, async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         req.flash("loginStatus", errors.array()[0].msg);
         return res.status(422).send(`Ошибка регистрации: ${errors.array()[0].msg}`);
      }
      const { email, password, name } = req.body;
      const userGroup = await Group.findOne({ name: "DefaultGroup" });
      const user = new User({
         email: email,
         password: await bcrypt.hash(password, 7),
         name: name,
         group: userGroup._id,
      });
      await user.save();
      req.flash("registerStatus", "Успешная регистрация!");
      res.redirect("login");
   } catch (e) {
      console.log(e);
   }
});

router.get("/login", (req, res) => {
   res.render("auth/login", {
      title: "Логин",
      loginStatus: req.flash("loginStatus"),
   });
});

router.get("/registration", (req, res) => {
   res.render("auth/register", {
      title: "Регистрация",
      registerStatus: req.flash("registerStatus"),
   });
});
export default router;
