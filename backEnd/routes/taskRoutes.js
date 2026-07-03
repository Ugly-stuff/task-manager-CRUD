const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const validateId = param("id").isMongoId().withMessage("Valid task id is required");

router.post(
  "/",
  protect,
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  validateRequest,
  createTask
);

router.get("/", protect, getTasks);
router.get("/:id", protect, validateId, validateRequest, getTask);

router.put(
  "/:id",
  protect,
  validateId,
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().trim(),
  body("completed").optional().isBoolean().withMessage("Completed must be boolean"),
  validateRequest,
  updateTask
);

router.delete("/:id", protect, validateId, validateRequest, deleteTask);

module.exports = router;