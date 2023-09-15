import { Router } from "express";
import {
  getAllUser,
  getUser,
  updateUser,
  createUser,
  weatherDataByDay,
} from "../controllers/user.controller.mjs";

const router = Router();

router.route("/").get(getAllUser).post(createUser);
router.route("/weather").get(weatherDataByDay);
router.route("/:email").get(getUser).put(updateUser);

export default router;
