import { Router } from "express";
import Day from "../models/day.js";
import Group from "../models/group.js";
import Lesson from "../models/lesson.js";

const router = Router();

router.post("/createday", async (req, res) => {
   try {
      if (req.session.user.role == "ADMIN") {
         const day = new Day({
            name: req.body.dayname,
            lessons: [],
         });
         await day.save();
         if (req.body.weekstate == 0) {
            await Group.updateOne({ name: req.body.groupname }, { $push: { timetableEven: day._id } });
         } else if (req.body.weekstate == 1) {
            await Group.updateOne({ name: req.body.groupname }, { $push: { timetableOdd: day._id } });
         } else {
            res.json({ status: "error", message: "неверно указан тип недели, укажите только 0 или 1" });
         }
         res.json({ status: "done", message: `День ${day.name} для группы ${req.body.groupname} создан` });
      } else {
         res.json({ status: "error", message: "Вы не администратор" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/editday", async (req, res) => {
   try {
      if (req.session.user.role == "ADMIN") {
         const group = await Group.findOne({ name: req.body.groupname });
         let dayToEdit;
         if (req.body.weekstate == 0) {
            dayToEdit = await Day.findOne({ _id: group.timetableEven[req.body.daynumber].toString() });
         } else if (req.body.weekstate == 1) {
            dayToEdit = await Day.findOne({ _id: group.timetableOdd[req.body.daynumber].toString() });
         } else {
            res.json({ status: "error", message: "Неверно указан тип недели" });
         }
         console.log(dayToEdit.name);
         if (req.body.dayname) {
            await Day.updateOne(
               { _id: dayToEdit._id },
               {
                  $set: {
                     name: req.body.dayname,
                  },
               }
            );
         }
         if (req.body.wipe) {
            await Day.updateOne(
               { _id: dayToEdit._id },
               {
                  $set: {
                     lessons: [],
                  },
               }
            );
         }
         if (req.body.dayname) {
            await Day.updateOne(
               { _id: dayToEdit._id },
               {
                  $set: {
                     name: req.body.dayname,
                  },
               }
            );
         }
         res.json({ status: "done", message: "Обновлено" });
      } else {
         res.json({ status: "error", message: "Вы не администратор" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/createlesson", async (req, res) => {
   try {
      if (req.session.user.role == "ADMIN") {
         const lesson = new Lesson({
            name: req.body.name,
            type: req.body.type,
            teacherName: req.body.teacherName,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
         });
         await lesson.save();
         const groupFor = await Group.findOne({ name: req.body.groupname });
         let updatedDay;
         if (req.body.weektype == 0) {
            updatedDay = await Day.findOne({ _id: groupFor.timetableEven[req.body.daynumber].toString() });
         } else if (req.body.weektype == 1) {
            updatedDay = await Day.findOne({ _id: groupFor.timetableOdd[req.body.daynumber].toString() });
         } else {
            res.json({ status: "error", message: "Неверно указан тип недели" });
         }
         await Day.updateOne({ _id: updatedDay._id }, { $push: { lessons: lesson._id } });
         res.json({
            status: "done",
            message: `Пара ${req.body.name} для группы ${req.body.groupFor} в ${updatedDay.name} создана`,
         });
      } else {
         res.json({ status: "error", message: "Вы не администратор" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/editlesson", async (req, res) => {
   const group = await Group.findOne({ name: req.body.groupname });
   let day;
   if (req.body.weekstate == 0) {
      day = group.timetableEven[req.body.daynumber];
   } else if (req.body.weekstate == 1) {
      day = group.timetableOdd[req.body.daynumber];
   } else {
      res.json({ status: "error", message: "Ошибка" });
   }
   const lessons = await Day.findOne({ _id: day._id }).timetable;
});

router.post("/creategroup", async (req, res) => {
   try {
      if (req.session.user.role == "ADMIN") {
         const group = new Group({
            name: req.body.groupname,
         });
         await group.save();
         req.json({ status: "done", message: `Группа ${req.body.groupname} создана` });
      } else {
         res.json({ status: "error", message: "Вы не администратор" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/editgroup", async (req, res) => {
   try {
      if (req.session.user.role == "ADMIN") {
         if (req.body.groupname) {
            await Group.updateOne(
               { name: req.body.groupname },
               {
                  $set: {
                     name: req.body.groupname,
                  },
               }
            );
         }
         if (req.body.wipe) {
            if (req.body.weekstate == 0) {
               await Group.updateOne(
                  { name: req.body.groupname },
                  {
                     $set: {
                        timetableEven: [],
                     },
                  }
               );
            } else if (req.body.weekstate == 1) {
               await Group.updateOne(
                  { name: req.body.groupname },
                  {
                     $set: {
                        timetableOdd: [],
                     },
                  }
               );
            } else {
               res.json({ status: "error", message: "Не правильно указан тип недели" });
            }
            if (req.body.wipeusers) {
               await Group.updateOne(
                  { name: req.body.groupname },
                  {
                     $set: {
                        users: [],
                     },
                  }
               );
            }
            res.json({ status: "done", message: "Обновлено" });
         } else {
            res.json({ status: "error", message: "Вы не администратор" });
         }
      }
   } catch (e) {
      console.log(e);
   }
});

export default router;
