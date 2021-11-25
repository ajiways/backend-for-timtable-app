import { Router } from "express";
import {default as User} from "../models/user.js"

const router = Router()

router.get('/profile', async (req, res)=> {
    try {
        if(req.session.user){
            const user = req.session.user
            res.send(user)
        } else {
            res.send('Нет авторизации')
        }
    } catch (e) {
        console.log(e)
    }
})

export default router