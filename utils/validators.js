import { body } from "express-validator";
import User from "../models/user.js";

export let registerValidators = [
   body("username").custom(async (value) => {
      try {
         const user = await User.findOne({ name: value });
         if (user) {
            return Promise.reject("Такой username уже занят");
         }
      } catch (e) {
         console.log(e);
      }
   }),
   body("password", "Пароль должен быть от 6 до 56 символов")
      .isLength({ min: 6, max: 56 })
      .isAlphanumeric()
      .trim(),
   body("confirm", "Неверное подтверждение пароля")
      .custom((value, { req }) => {
         if (value !== req.body.password) {
            throw new Error("Пароли должны совпадать");
         }
         return true;
      })
      .trim(),
   body("name", "Имя должно состоять минимум из двух символов").isLength({ min: 2 }).trim(),
];

export let loginValidators = [
   body("username").custom(async (value) => {
      try {
         const candidate = await User.findOne({ name: value });
         if (!candidate) {
            return Promise.reject("Пользователь с таким username не зарегистрирован");
         }
      } catch (e) {
         console.log(e);
      }
   }),
   body("password", "Пароль должен быть от 6 до 56 символов")
      .isLength({ min: 6, max: 56 })
      .isAlphanumeric()
      .trim(),
];
