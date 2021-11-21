import { Router } from "express";


const router = Router()

router.get('/test', (req, res) => {
    if(!req.session.user) res.send('Net')
    else res.send(req.session.user)
})

router.get('/admin/getprofile', async (req, res)=> {
    if(!req.session.user) res.send('Нет авторизации')
    else {
        const { email, name, password, _id } = req.session.user
        const data = {email, password, name, _id}
        res.send(`Пользователь: ${JSON.stringify(data)}`)
    }
})

export default router