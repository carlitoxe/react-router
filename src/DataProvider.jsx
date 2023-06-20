import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { blogdata } from "./blogdata";

const BlogsContext = createContext();

function DataProvider({ children }) {
    
    const navigate = useNavigate();
    const [data, setBlogdata] = useState(blogdata);
    
    const addBlog = (newElement) => {
        setBlogdata(data => [...data, newElement]);
        navigate('/blog');
    }
    
    const deleteBlog = (slug) => {
        const dataUpdate = data.filter(e => e.slug !== slug);
        //console.log(dataUpdate);        
        setBlogdata([...dataUpdate]);
        navigate('/blog');
    }

    const commentBlog = (blogSlug, comment) => {
        const idx = data.findIndex((blog) => blog.slug === blogSlug);
        if (idx >= 0) {
          setBlogdata((prevState) => {
            const blogsTemp = [...prevState];
            const blog = blogsTemp[idx];
            const newComments = [...blog.comments, comment];
            blog.comments = newComments;
            blogsTemp[idx] = blog;
            return blogsTemp;
          });
        }
      };

      const removeComment = (blogSlug, position) => {
        const idx = data.findIndex((blog) => blog.slug === blogSlug);
        if (idx >= 0) {
          const blogsTemp = [...data];
          blogsTemp[idx].comments.splice(position, 1);
          setBlogdata(blogsTemp);
        }
      };

/*     const editBlog = (array) => {

        const editedElement = {
            title: `${array[1].title}`,
            slug: `${array[1].slug}`,
            content: `${array[1].content}`,
        };

        const editedArray = data.map(e => e.title === array[0] ? editedElement : e );
        setBlogdata([...editedArray]);
        navigate('/blog')
    } */

    const blogs = { data, addBlog, deleteBlog, commentBlog, removeComment };
    
    return (
        <BlogsContext.Provider value={blogs}>
            {children}
        </BlogsContext.Provider>
    );
}

function useBlogs(){
    const blogs = useContext(BlogsContext);
    return blogs;
}

export { DataProvider, useBlogs };