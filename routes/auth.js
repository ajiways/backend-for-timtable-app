import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { registerValidators, loginValidators } from "../utils/validators.js";
import User from "../models/user.js";
import Group from "../models/group.js";
import Role from "../models/role.js";

const router = Router();

router.post("/login", loginValidators, async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         req.flash("loginStatus", errors.array()[0].msg);
         return res.status(422).send(`Ошибка логина: ${errors.array()[0].msg}`);
      }
      const { password, email } = req.body;
      const candidate = await User.findOne({ email });
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
         req.session.user = candidate;
         req.session.isAuthenticated = true;
         req.session.save((err) => {
            if (err) throw err;
         });
         req.flash("loginStatus", "Успешный логин");
         res.send("Успешный логин");
      } else {
         req.flash("loginStatus", "Неправильный пароль");
         res.send("Неправильный пароль");
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/logout", async (req, res) => {
   req.session.destroy(() => {
      req.flash("loginStatus", "Успешный выход из системы");
      res.send("Успешный выход");
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
      const userRole = await Role.findOne({ value: "USER" });
      const userGroup = await Group.findOne({ name: "DefaultGroup" });
      const user = new User({
         email: email,
         password: await bcrypt.hash(password, 7),
         name: name,
         group: userGroup._id,
         roles: [userRole.value],
      });
      await user.save();
      req.flash("registerStatus", "Успешная регистрация!");
      res.send("Успешная регистрация!");
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
export default router;
