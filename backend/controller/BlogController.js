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

    try{
        const blog = await Blog.findById(req.params.id);
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

    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            res.status(404).json({success: false, message: `Blog with id of ${req.params.id} not found`});
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
