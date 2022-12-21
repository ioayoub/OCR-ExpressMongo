import Express from "express";
import stuffController from "../controllers/stuffController.js";
const router = Express.Router();

router.get("/", stuffController.readAllThings);

router.post("/", stuffController.createThing);

router.get("/:id", stuffController.readThing);

router.put("/:id", stuffController.updateThing);

router.delete("/:id", stuffController.deleteThing);

export default router;
