import { Router } from "express";
import Group from "../models/group.js";
import User from "../models/user.js"

const router = Router()

router.get('/profile', async (req, res)=> {
    try {
        if(req.session.user){
            const user = await User.findOne({_id: req.session.user._id})
            res.send(user)
        } else {
            res.send('Нет авторизации')
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/edit', async (req, res)=> {
    try {
        if(!req.session.user) {
            res.send('Нет авторизации')
        } else {
            if(req.body.email) {
                await User.updateOne({email: req.session.user.email}, {
                    $set: {email: req.body.email}
                })
            }
            if(req.body.name) {
                await User.updateOne({email: req.session.user.email}, {
                    $set: {name: req.body.name}
                })
            }
            if(req.body.password) {
                await User.updateOne({email: req.session.user.email}, {
                    $set: {password: req.body.password}
                })
            }
            if(req.body.changegroup) {
                const grp = await Group.findOne({name: req.body.groupname})
                await User.updateOne({email: req.session.user.email}, {
                    $set: {group: grp._id}
                })
            }
            res.send('Обновлено')
        }
    } catch (e) {
        console.log(e)
    }
})

export default router