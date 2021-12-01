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
         let err = errors.array();
         res.status(422).json({ status: "error", errors: err });
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
         res.json({ status: "done", message: "Успешный вход" });
      } else {
         res.json({ status: "error", message: "Не правильный пароль" });
      }
      res.json({ status: "done", message: "Успешный вход" });
   } catch (e) {
      console.log(e);
   }
});

router.get("/logout", async (req, res) => {
   req.session.destroy(() => {
      res.json({ status: "done", message: "Успешный выход из системы" });
   });
});

router.post("/registration", registerValidators, async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         let err = errors.array();
         res.status(422).json({ status: "error", errors: err });
      }
      const userGroup = await Group.findOne({ name: "DefaultGroup" });
      const user = new User({
         username: req.body.username,
         password: await bcrypt.hash(req.body.password, 7),
         name: req.body.name,
         group: userGroup._id,
      });
      await user.save();
      res.json({ status: "done", message: "Успешная регистрация" });
   } catch (e) {
      console.log(e);
   }
});

export default router;
