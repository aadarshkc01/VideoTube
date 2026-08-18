import { body } from "express-validator"

const publishVideoValidator = () => [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
]

const addCommentValidator = () => [
    body("content").trim().notEmpty().withMessage("Comment content is required"),
]

const createTweetValidator = () => [
    body("content").trim().notEmpty().withMessage("Tweet content is required"),
]

const createPlaylistValidator = () => [
    body("name").trim().notEmpty().withMessage("Playlist name is required"),
    body("description").trim().notEmpty().withMessage("Playlist description is required"),
]

export {
    publishVideoValidator,
    addCommentValidator,
    createTweetValidator,
    createPlaylistValidator,
}
