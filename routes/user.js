import { Router } from "express";
import Group from "../models/group.js";
import User from "../models/user.js";
import Day from "../models/day.js";
import Lesson from "../models/lesson.js";

const router = Router();

router.get("/profile", async (req, res) => {
   try {
      if (req.session.user) {
         const user = await User.findOne({ _id: req.session.user._id });
         res.json({ status: "done", user });
      } else {
         res.json({ status: "error", message: "Вы не авторизованы" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.post("/edit", async (req, res) => {
   try {
      if (!req.session.user) {
         res.json({ status: "error", message: "Вы не авторизованы" });
      } else {
         if (req.body.email) {
            await User.updateOne(
               { email: req.session.user.email },
               {
                  $set: { email: req.body.email },
               }
            );
         }
         if (req.body.name) {
            await User.updateOne(
               { email: req.session.user.email },
               {
                  $set: { name: req.body.name },
               }
            );
         }
         if (req.body.password) {
            await User.updateOne(
               { email: req.session.user.email },
               {
                  $set: { password: req.body.password },
               }
            );
         }
         if (req.body.groupname) {
            const grp = await Group.findOne({ name: req.body.groupname });
            await User.updateOne(
               { email: req.session.user.email },
               {
                  $set: { group: grp._id },
               }
            );
         }
         res.json({ status: "done", message: "Обновлено" });
      }
   } catch (e) {
      console.log(e);
   }
});

router.get("/timetable", async (req, res) => {
   try {
      if (!req.session.user) {
         res.json({ status: "error", message: "Вы не авторизованы" });
      } else {
         let d0 = new Date().getTime(),
            d = new Date(new Date().getFullYear(), 0, 1),
            d1 = d.getTime(),
            dd = d.getDay(),
            re = Math.floor((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6);

         let weekstate = Math.floor(re / 7) % 2 ? 1 : 0;
         const date = new Date();
         const day = date.getDay();
         const group = await Group.findOne({ _id: req.session.user.group });
         let week;
         if (weekstate == 0) {
            week = group.timetableEven;
         } else if (weekstate == 1) {
            week = group.timetableOdd;
         }
         const today = await Day.findOne({ _id: week[day].toString() });
         if (!week[day]) {
            res.send("На этот день еще не заданы дни");
         }
         const lessons = [];
         let counter = 0;
         while (counter < today.lessons.length) {
            let tmp = await Lesson.findOne({ _id: today.lessons[counter].toString() }).lean();
            lessons.push(tmp);
            counter++;
         }
         res.json({ status: "done", lessons });
      }
   } catch (e) {
      console.log(e);
   }
});

export default router;
