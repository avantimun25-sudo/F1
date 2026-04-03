import { Router, type IRouter } from "express";
import healthRouter from "./health";
import f1Router from "./f1";

const router: IRouter = Router();

router.use(healthRouter);
router.use(f1Router);

export default router;
