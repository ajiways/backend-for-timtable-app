import { Router } from "express";


const router = Router()

router.get('/test', (req, res) => {
    res.send(req.sessionID)
})


export default router