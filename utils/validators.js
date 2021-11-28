import { body } from "express-validator";
import User from "../models/user.js";

export let registerValidators = [
   body("email", "Введите корректный Email")
      .isEmail()
      .custom(async (value) => {
         try {
            const user = await User.findOne({ email: value });
            if (user) {
               return Promise.reject("Такой email уже занят");
            }
         } catch (e) {
            console.log(e);
         }
      })
      .normalizeEmail(),
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
   body("email")
      .isEmail()
      .withMessage("Введите корректный Email")
      .custom(async (value) => {
         try {
            const candidate = await User.findOne({ email: value });
            if (!candidate) {
               return Promise.reject("Пользователь с таким Email не зарегистрирован");
            }
         } catch (e) {
            console.log(e);
         }
      })
      .normalizeEmail(),
   body("password", "Пароль должен быть от 6 до 56 символов")
      .isLength({ min: 6, max: 56 })
      .isAlphanumeric()
      .trim(),
];
