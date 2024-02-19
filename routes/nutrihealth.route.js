import { Router } from "express";
import { nutrihealthController } from "../controllers/nutrihealth.controller.js";

const router = Router();

// METHODS GET
router.get("/getAllOlder", nutrihealthController.GetListOlderController);

// METHODS POST
router.post("/getAllRepOlder", nutrihealthController.GetAllRepOlderController);
router.post("/validate-login", nutrihealthController.ValidateLoginController);
router.post(
  "/validate-idCardAdult",
  nutrihealthController.ValidateIdCardAdultController
);
router.post("/change-password", nutrihealthController.ChangePasswordController);
router.post(
  "/register-adult",
  nutrihealthController.RegisterOlderAdultController
);
router.post("/edit-olderadult", nutrihealthController.EditOlderAdultController);
router.post(
  "/register-representative",
  nutrihealthController.RegisterRepresentativeController
);
router.post(
  "/edit-representative",
  nutrihealthController.EditRepresentativeController
);

export default router;
