import { Router } from "express";
import { ping, inicio } from "../controllers/index.controlles.js";


const router = Router()

router.get("/", inicio)
router.get('/ping', ping)



export default router