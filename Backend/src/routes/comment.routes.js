import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validator.middleware.js"
import { addCommentValidator } from "../validators/content.validators.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(addCommentValidator(), validate, addComment);
router.route("/c/:commentId").delete(deleteComment).patch(addCommentValidator(), validate, updateComment);

export default router
