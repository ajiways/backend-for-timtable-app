import { Router } from "express";
import Day from "../models/day.js"
import Group from "../models/group.js";

const router = Router()

router.post('/createday', async (req, res)=> {
    try {
        const day = new Day({
            name: req.body.dayname,
            lessons: [],
            weekstate: req.body.weekstate
        })
        await day.save()
        await Group.findOne({name: req.body.groupname}, {$push: {days: day._id}})
        res.send('День создан')
    } catch (e) {
        console.log(e)
    }
})

router.put('/editday/:grp/:day', async (req, res)=> {
    try {
        const group = await Group.findOne({name: req.params.grp})
        const dayToEdit = group.timetable[req.params.day]
        let updated = ''
        if(req.body.dayname){
            await Day.updateOne({_id: dayToEdit._id}, 
                {$set: {
                    name: req.body.dayname
                }
            })
            updated += ' Имя обновлено '
        }
        if(req.body.weestate) {
            await Day.updateOne({_id: dayToEdit._id}, 
                {$set: {
                    weekstate: req.body.weekstate
                }
            })
            updated += ' Четность недели обновлена '
        }
        if(req.body.wipe){
            await Day.updateOne({_id: dayToEdit._id}, 
                {$set: {
                    lessons: []
                }
            })
            updated += ' Все пары очищены '
        }
        console.log(dayToEdit);
        res.send(updated)
    } catch (e) {
        res.send('Ошибка, день не найден')
        console.log(e)
    }
})

router.post('/creategroup', async (req, res) => {
    try {
        const group = new Group({
            name: req.body.groupname
        })
        await group.save()
        res.send(`Группа ${req.body.groupname} создана`)
    } catch (e) {
        console.log(e)
    }
})

router.put('/editgroup/:name', async (req, res) => {
    try {
        let updated = ''
        if(req.body.groupname) {
            await Group.updateOne({name: req.params.name},{$set: {
                name: req.body.groupname
            }})
            updated += ` Имя группы изменено на ${req.body.groupname} `
        }
        if(req.body.wipetimetable) {
            await Group.updateOne({name: req.params.name},{$set: {
                timetable: []
            }})
            updated += ' Расписание очищено '
        }
        if(req.body.wipeusers) {
            await Group.updateOne({name: req.params.name},{$set: {
                users: []
            }})
            updated += ` Все пользователи из группы ${req.params.name} были удалены `
        }
        res.send(updated)
    } catch (e) {
        res.send('Такой группы нет')
        console.log(e)
    }
})

export default router