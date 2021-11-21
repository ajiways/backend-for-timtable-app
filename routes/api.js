import { Router } from "express";
import Day from "../models/day.js";
import Group from "../models/group.js"
import Lesson from "../models/lesson.js";


const router = Router()

router.post('/test', async (req, res) => {
    const test = await Day.findOne({name: "TestLesson"})
    console.log(test.lessons);
    res.send("done")
})

export default router