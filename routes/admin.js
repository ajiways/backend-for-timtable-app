import { Router } from "express";
import day from "../models/day.js";
import Day from "../models/day.js";
import Group from "../models/group.js";
import Lesson from "../models/lesson.js";

const router = Router();

router.get("/", async (req, res) => {
   if (req.session.user.role == "ADMIN") {
      res.render("admin", {
         title: "Админка",
      });
   } else {
      res.send("Вы не админ");
   }
});

router.get("/createday", (req, res) => {
   res.render("createday", {
      title: "Создать день",
      adminStatus: req.flash("adminStatus"),
   });
});

router.post("/createday", async (req, res) => {
   if (req.session.user.role == "ADMIN") {
      try {
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
            res.send("неверно указан тип недели, укажите только 0 или 1");
         }
         req.flash("adminStatus", `День ${day.name} для группы ${req.body.groupname} создан`);
         res.redirect("back");
      } catch (e) {
         console.log(e);
      }
   } else {
      res.send("Вы не админ");
   }
});

router.get("/createlesson", (req, res) => {
   res.render("createLesson", {
      title: "Создать пару",
      adminStatus: req.flash("adminStatus"),
   });
});

router.post("/createlesson", async (req, res) => {
   try {
      const lesson = new Lesson({
         name: req.body.name,
         type: req.body.type,
         teacherName: req.body.teacherName,
         startTime: req.body.startTime,
         endTime: req.body.endTime,
      });
      await lesson.save();
      const groupFor = await Group.findOne({ name: req.body.groupFor });
      let updatedDay;
      if (req.body.weektype == 0) {
         updatedDay = await Day.findOne({ _id: groupFor.timetableEven[req.body.dayFor].toString() });
      } else if (req.body.weektype == 1) {
         updatedDay = await Day.findOne({ _id: groupFor.timetableOdd[req.body.dayFor].toString() });
      } else {
         res.send("неверно указан тип недели, укажите только 0 или 1");
      }

      console.log(updatedDay.name);
      await Day.updateOne({ _id: updatedDay._id }, { $push: { lessons: lesson._id } });
      req.flash(
         "adminStatus",
         `Пара ${req.body.name} для группы ${req.body.groupFor} в ${updatedDay.name} создана`
      );
      res.redirect("back");
   } catch (e) {
      console.log(e);
   }
});

router.post("/editday", async (req, res) => {
   try {
      const group = await Group.findOne({ name: req.body.groupname });
      let dayToEdit;
      if (req.body.weekstate == 0) {
         dayToEdit = await Day.findOne({ _id: group.timetableEven[req.body.daynum].toString() });
      } else if (req.body.weekstate == 1) {
         dayToEdit = await Day.findOne({ _id: group.timetableOdd[req.body.daynum].toString() });
      } else {
         res.send("неверно указан тип недели, укажите только 0 или 1");
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
      req.flash("adminStatus", "Обновлено");
      res.redirect("back");
   } catch (e) {
      console.log(e);
   }
});

router.get("/editday", (req, res) => {
   res.render("editday", {
      title: "Редактировать день",
      adminStatus: req.flash("adminStatus"),
   });
});

router.post("/creategroup", async (req, res) => {
   try {
      const group = new Group({
         name: req.body.groupname,
      });
      await group.save();
      req.flash("adminStatus", `Группа ${req.body.groupname} создана`);
      res.redirect("back");
   } catch (e) {
      res.send(e);
   }
});

router.get("/creategroup", (req, res) => {
   res.render("creategroup", {
      title: "Создание группы",
      adminStatus: req.flash("adminStatus"),
   });
});

router.put("/editgroup", async (req, res) => {
   try {
      let updated = "";
      if (req.body.groupname) {
         await Group.updateOne(
            { name: req.query.name },
            {
               $set: {
                  name: req.body.groupname,
               },
            }
         );
         updated += ` Имя группы ${req.query.name} изменено на ${req.body.groupname} `;
      }
      if (req.body.wipetimetable) {
         await Group.updateOne(
            { name: req.query.name },
            {
               $set: {
                  timetable: [],
               },
            }
         );
         updated += " Расписание очищено ";
      }
      if (req.body.wipeusers) {
         await Group.updateOne(
            { name: req.query.name },
            {
               $set: {
                  users: [],
               },
            }
         );
         updated += ` Все пользователи из группы ${req.query.name} были удалены `;
      }
      res.send(updated);
   } catch (e) {
      res.send("Такой группы нет");
      console.log(e);
   }
});

router.post("/editdays", async (req, res) => {
   try {
      const group = Group.findOne({ name: req.query.groupname });
   } catch (e) {
      console.log(e);
   }
});

export default router;
