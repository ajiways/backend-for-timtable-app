import { Router } from "express";
import User from "../models/user.js"
import Day from "../models/day.js"

const router = Router()

router.post('/createday', async (req, res)=> {
    try {
        
    } catch (e) {
        console.log(e)
    }
})

router.post('/editday:id', async (req, res)=> {

})

export default router