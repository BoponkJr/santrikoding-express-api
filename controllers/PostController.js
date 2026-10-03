// import express-validator
import { validationResult } from 'express-validator';

// import prisma client
import prisma from '../prisma/client/index.js';

// import fs for file manipulation
import fs from 'fs';

/**
 * findPosts - Get all posts
 */
export const findPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                id: 'desc',
            },
        });

        res.status(200).send({
            success: true,
            message: 'Get all posts successfully',
            data: posts,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * createPost - Create a new post
 */
export const createPost = async (req, res) => {
    // periksa hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    // pastikan file gambar di-upload
    if (!req.file) {
        return res.status(422).json({
            success: false,
            message: 'Image is required',
        });
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                image: req.file.filename,
            },
        });

        res.status(201).send({
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * findPostById - Get single post by ID
 */
export const findPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!post) {
            return res.status(404).send({
                success: false,
                message: `Post with ID ${id} not found`,
            });
        }

        res.status(200).send({
            success: true,
            message: `Get post by ID : ${id} successfully`,
            data: post,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * updatePost - Update existing post by ID
 */
export const updatePost = async (req, res) => {
    const { id } = req.params;

    // periksa hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        // cari post yang ada
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!existingPost) {
            return res.status(404).send({
                success: false,
                message: `Post with ID ${id} not found`,
            });
        }

        let imageName = existingPost.image;

        // jika ada upload gambar baru
        if (req.file) {
            imageName = req.file.filename;

            // hapus gambar lama dari folder
            const oldImagePath = `./public/uploads/${existingPost.image}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const post = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                image: imageName,
            },
        });

        res.status(200).send({
            success: true,
            message: 'Post updated successfully',
            data: post,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * deletePost - Delete post by ID
 */
export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!post) {
            return res.status(404).send({
                success: false,
                message: `Post with ID ${id} not found`,
            });
        }

        // hapus file gambar
        const imagePath = `./public/uploads/${post.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // hapus data dari database
        await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(200).send({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
