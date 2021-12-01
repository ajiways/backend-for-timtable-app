import { Router } from "express";
import Group from "../models/group.js";

const router = Router();

router.get("/groups", async (req, res) => {
   try {
      const groups = await Group.find();
      res.json({ status: "done", groups });
   } catch (e) {
      console.log(e);
   }
});

export default router;
