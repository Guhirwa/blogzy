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