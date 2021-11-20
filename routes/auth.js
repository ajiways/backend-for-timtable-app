import { Router } from "express";
import {default as User} from "../models/user.js"

const router = Router()

router.post('/registration', async(req, res)=> {
    try {
        const candidate = await User.findOne({email: req.body.email})
        if(!candidate) {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
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