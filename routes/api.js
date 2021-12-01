import { Router } from "express";
import Day from "../models/day.js";
import Group from "../models/group.js";
import Lesson from "../models/lesson.js";

const router = Router();

router.get("/groups", async (req, res) => {
   try {
      const groups = await Group.find();
      res.json(groups);
   } catch (e) {
      res.send("Ошибка, групп нет");
      console.log(e);
   }
});

export default router;
