import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validator.middleware.js"
import { createTweetValidator } from "../validators/content.validators.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweetValidator(), validate, createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(createTweetValidator(), validate, updateTweet).delete(deleteTweet);

export default router
