// import express
import express from 'express';

// init express router
const router = express.Router();

// import post controller
import {
    findPosts,
    createPost,
    findPostById,
    updatePost,
    deletePost,
} from '../controllers/PostController.js';

// import validate post
import { validatePost } from '../utils/validators/post.js';

// import upload middleware
import upload from '../middlewares/upload.js';

// route get all posts
router.get('/posts', findPosts);

// route create post
router.post('/posts', upload.single('image'), validatePost, createPost);

// route get post by id
router.get('/posts/:id', findPostById);

// route update post
router.put('/posts/:id', upload.single('image'), validatePost, updatePost);

// route delete post
router.delete('/posts/:id', deletePost);

// export router
export default router;
