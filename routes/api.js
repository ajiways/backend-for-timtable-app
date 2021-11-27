import { Router } from "express";
import Day from "../models/day.js";
import Group from "../models/group.js";
import Lesson from "../models/lesson.js";

const router = Router();

router.get("/getday", async (req, res) => {
   try {
      const group = await Group.findOne({ name: req.query.grp });
      const day = group.timetable[req.query.day];
      res.send(day);
   } catch (e) {
      res.send("Ошибка, день не найден");
      console.log(e);
   }
});

router.get("/groups", async (req, res) => {
   try {
      const groups = await Group.find();
      res.send(groups);
   } catch (e) {
      res.send("Ошибка, групп нет");
      console.log(e);
   }
});

export default router;
