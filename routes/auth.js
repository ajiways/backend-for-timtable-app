import { Router } from "express";
import bcrypt from "bcryptjs"
import { body, validationResult } from "express-validator"
import {default as User} from "../models/user.js"

const router = Router()

router.post('/login', body('email').isEmail(), body('password').isLength({min: 6}), async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {password, email} = req.body
        const candidate = await User.findOne({email})
        if(candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err=> {
                    if (err) throw (err)
                })
                res.send('done')
            } else {
                req.flash('loginError', 'Неверный пароль')
                res.send('Неверный пароль')
            }
        } else {
            req.flash('loginError', 'Пользователя с таким email не существует')
            res.send('Пользователя с таким email не существует')
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/logout', async(req, res)=> {
    req.session.destroy(()=> {
        res.send('Успешный выход')
    })
})

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 6}), async(req, res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const candidate = await User.findOne({email: req.body.email})
        if(!candidate) {
            const {email, password, name} = req.body
            const user = new User({
                email: email,
                password: await bcrypt.hash(password, 7),
                name: name
            })
            await user.save()
            res.send('Успешная регистрация!')
        } else {
            res.send('Такой юзер уже есть')
        }
    } catch (e) {
        console.log(e)
    }
})

export default router