import { useState } from "react";
import { useAuth } from "./auth";
import { useBlogs } from "./DataProvider";


function CreatePost({ setCreatePost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const auth = useAuth();
    const blogs = useBlogs();

    
    const resetGaps = () => {
        setTitle('');
        setContent('');
        setAuthor('');
        setCreatePost(false);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(auth.user)
        let newAuthor; 
        if(auth.user){
            newAuthor = auth.user.username;
        } 
        
        blogs.addBlog({
            title: `${title}`,
            slug: `${title.toLowerCase().replaceAll(' ', '-')}`,
            content: `${content}`,
            author: `${newAuthor}`,
            comments: [],
        });
        resetGaps();
        console.log(blogs);
    }


    return(
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /> <br />
            </label>
            <label>
                Content:
                <textarea 
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea><br />
            </label>
            <label>
                Author:
                {!auth.user &&
                    <input 
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    ></input>
                }
                {auth.user &&
                    <input 
                    type="text"
                    readOnly
                    value={auth.user.username}
                    ></input>
                }
                <br />
            </label>
            <button type="submit">Create Post</button>
            <button type="button" onClick={resetGaps}>Cancel</button>
        </form>
    )
}

export { CreatePost };