import { Router } from "express";
import Day from "../models/day.js";
import Group from "../models/group.js"
import Lesson from "../models/lesson.js";


const router = Router()

router.get('/getday/:grp/:day', async (req, res)=> {
    try {
        const group = await Group.findOne({name: req.params.grp})
        const day = group.timetable[req.params.day]
        res.send(day)
    } catch (e) {
        res.send('Ошибка, день не найден')
        console.log(e)
    }
})

export default router