import { Router } from "express";
import { nutrihealthController } from "../controllers/nutrihealth.controller.js";

const router = Router();

// METHODS GET
router.get("/getAllRepOlder", nutrihealthController.getAllRepOlderController);
router.get("/validate-login", nutrihealthController.validateLogin);

// METHODS POST
router.post(
  "/register-adult",
  nutrihealthController.registerOlderAdultController
);
router.post("/edit-olderadult", nutrihealthController.editOlderAdultController);
router.post(
  "/register-representative",
  nutrihealthController.registerRepresentativeController
);
router.post(
  "/edit-representative",
  nutrihealthController.editRepresentativeController
);

export default router;
