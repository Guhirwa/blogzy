const express = require('express');
const {
    getAllBlogs, 
    getBlogById,
    saveBlog,
    updateBlog,
    deleteBlog
} = require('../controller/BlogController');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/save', saveBlog);
router.put('/update', updateBlog);
router.delete('/delete', deleteBlog);

module.exports = router;