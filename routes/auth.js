import { Router } from "express";
import bcrypt from "bcryptjs"
import {default as User} from "../models/user.js"

const router = Router()

router.post('/login', async(req, res) => {
    try {
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

router.get('/logout', async(req, res)=> {
    req.session.destroy(()=> {
        res.send('Успешный выход')
    })
})

router.post('/registration', async(req, res)=> {
    try {
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