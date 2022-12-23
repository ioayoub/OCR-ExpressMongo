import Express from "express";
import stuffController from "../controllers/stuffController.js";
import auth from "../middleware/auth.js";
import multerConfig from "../middleware/multer-config.js";

const router = Express.Router();

router.get("/", auth, stuffController.readAllThings);

router.post("/", auth, multerConfig, stuffController.createThing);

router.get("/:id", auth, stuffController.readThing);

router.put("/:id", auth, multerConfig, stuffController.updateThing);

router.delete("/:id", auth, stuffController.deleteThing);

export default router;
