const Blog = require('../model/Blog');

const getAllBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: blogs});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

const getBlogById = async (req, res) => {

    const blogToSearch = req.params.id;

    try{
        const blog = await Blog.findById(blogToSearch);
        if(!blog) {
            res.status(200).json({success: true, message: "Blog not found"});
        } else {
            res.status(200).json({success: true, data: blog});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

const saveBlog = async (req, res) => {

    try {
        const {title, body, author, published, imageUrl} = req.body;

        if(!title || !body || !author) {
            res.status(400).json({success: false, message: 'Title, Body, Author are requeired'});
        } else {
            await Blog.save(req.body);
            res.status(201).json({success: true, message: 'Blog saved successfully'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

const updateBlog = async (req, res) => {

    const blogToUpdate = req.params.id;

    try {
        const blog = await Blog.findById(blogToUpdate);

        if(!blog) {
            res.status(404).json({success: false, message: `Blog with id of ${blogToUpdate} not found`});
        }
        const {title, body, author, published, imageUrl} = req.body;

        blog.title = title || blog.title;
        blog.body = body || blog.body;
        blog.author = author || blog.author;
        if(published !== undefined) blog.published = published;
        blog.imageUrl = imageUrl || blog.imageUrl;
        
        await blog.save()

        res.status(200).json({success: true, message: 'Blog updated successfully'});

    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

const deleteBlog = async (req, res) => {

    try {

        const blogToDelete = req.params.id;

        const blog = await Blog.findById(blogToDelete);

        if(!blog) {
            res.status(404).json({success: false, message: 'Blog you want to delete do not exist'});
        }

        Blog.delete(blogToDelete);
        res.status(200).json({success: true, message: "Blog deleted successfully"});

    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    saveBlog,
    updateBlog,
    deleteBlog
}