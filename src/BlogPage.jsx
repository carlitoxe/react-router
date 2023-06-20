import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { blogdata } from "./blogdata";
import { CreatePost } from "./CreatePost";
import { useAuth } from "./auth";
import { useBlogs } from "./DataProvider";

function BlogPage() {
    //const [createPost, setCreatePost] = useState(false)
    const auth = useAuth();
    const blogs = useBlogs();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <h1>Blogs</h1>


                {auth.user ? (
                    <button onClick={() => navigate('/blog/create')}>Create Post</button>
                    ) : (
                        <button onClick={() => navigate('/login', { replace: true })}>
                        Login to create a new Post
                    </button>
                )}
            <ul>
                {blogs.data.map(post => (
                    <BlogLink key={post.slug} post={post} />
                    ))}
            </ul>
            <Outlet />
{/*             {(!createPost && auth.user) && <button onClick={() => setCreatePost(true)}>Create Post</button>}
            {createPost && <CreatePost setCreatePost={setCreatePost} />} */}
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