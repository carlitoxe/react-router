import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { blogdata } from "./blogdata";
import { CreatePost } from "./CreatePost";
import { useAuth } from "./auth";
import { useBlogs } from "./DataProvider";

function BlogPage() {
    const [createPost, setCreatePost] = useState(false)
    const auth = useAuth();
    const blogs = useBlogs();

    return (
        <>
            <h1>Blog</h1>

            <Outlet />

            <ul>
                {blogs.data.map(post => (
                    <BlogLink key={post.slug} post={post} />
                ))}
            </ul>
            {(!createPost && auth.user) && <button onClick={() => setCreatePost(true)}>Create Post</button>}
            {createPost && <CreatePost setCreatePost={setCreatePost} />}
        </>
    );
}

function BlogLink({ post }) {
    return (
        <>
            <li key={post.title}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
        </>
    )
}

export { BlogPage };