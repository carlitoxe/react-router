import { useBlogs } from "./DataProvider"
import { useParams } from "react-router-dom";
import { useState } from "react";

function EditPost({ setEditPost, oldTitle, oldContent }) {
    const blogs = useBlogs();
    const { slug } = useParams();

    const blogpost = blogs.data.find(post => post.slug === slug)

    const [titleUpdated, setTitleUpdated] = useState(oldTitle);
    const [contentUpdated, setContentUpdated] = useState(oldContent);

    const onCancel = () => {
        setEditPost(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        blogpost.title = titleUpdated;
        blogpost.content = contentUpdated;
        setEditPost(false);
   /*      const slugUpdated = `${titleUpdated.toLowerCase().replaceAll(' ', '-')}`
        blogpost.slug = slugUpdated; */
        /* blogs.editBlog({
            title: `${title}`,
            slug: `${title.toLowerCase().replaceAll(' ', '-')}`,
            content: `${content}`,
            comments: [],
        }); */
    }

    return (
        <div className="modal">
            <form className="form-editblog" onSubmit={onSubmit}>
                <h3>Edit post</h3>
                <label>Title: </label>
                <input 
                    onChange={(e) => setTitleUpdated(e.target.value)} 
                    value={titleUpdated} >
                </input>
                <label>Content: </label>
                <textarea 
                    onChange={(e) => setContentUpdated(e.target.value)} 
                    value={contentUpdated} 
                    style={{width: "300px", height: "80px"}}>
                </textarea>
                <br />
                <button type="button" onClick={onSubmit}>Edit Post</button>
                <br />
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export { EditPost }