import { useState }  from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogdata } from './blogdata.jsx'
import { useBlogs } from "./DataProvider.jsx";
import { useAuth } from "./auth.jsx";
import { EditPost } from "./EditPost.jsx"; 
import { Comment } from "./Comment.jsx";
import { CommentBox } from "./CommentBox.jsx";

function BlogPost() {

    const navigate = useNavigate();
    const { slug } = useParams();
    const auth = useAuth();
    const blogs = useBlogs();

    const { commentBlog } = useBlogs();

    const [editPost, setEditPost] = useState(false);
    
    
    const blogpost = blogs.data.find(post => post.slug === slug)
    
    const canComment = auth.user?.isEditor || auth.user?.isAdmin || auth.user;
    const canDelete = auth.user?.isAdmin || blogpost.author === auth.username;
    const canEdit = auth.user?.isEditor || auth.user?.isAdmin;
    
    const returnToBlog = () => {
        navigate('/blog');
    }
  
/*     const onDelete = () => {
        const blogdataUpdate = [...blogdata]
        const index = blogdata.indexOf(blogpost);
        console.log(index);
        if (index > -1) {
            blogdata.splice(index, 1)
        }
        console.log(blogdataUpdate);
    } */

    //const [comment, setComment] = useState('')

  /*   const addComment = (comment) => {
      //  const comment = e.target.value;
      blogpost.comments.push(comment)
      console.log(comment);
    }   */

    
 /*    const onSubmit = (e) => {
        e.preventDefault();
        commentBlog(blogSlug, {
        content: comment,
        author: userData.username,
        });
        setComment('');
    }; */

    return (
        <>
            <button onClick={returnToBlog}>Back to blog</button>
            <h2>{blogpost.title}</h2>
            <p>{blogpost.author}</p>
            <p>{blogpost.content}</p>
            
            {canEdit && (
                 <button onClick={() => setEditPost(true)}>Edit blogpost</button>
             )}
            {editPost && <EditPost 
                            setEditPost={setEditPost} 
                            oldTitle={blogpost.title} 
                            oldContent={blogpost.content} 
                            oldAuthor={blogpost.author} 
                         />} 

           {canDelete && (
                <button onClick={() => blogs.deleteBlog(blogpost.slug)}>Delete blog</button>
            )}
            
            {blogpost.comments.length > 0 && (
                <>
                    <p>Comments:</p>
                    <ul>    
                    {blogpost.comments.map((comment, idx) => (
                        <Comment
                            comment={comment}
                            blogSlug={blogpost.slug}
                            position={idx}
                            key={`${comment.author}-${idx}`}
                        />
                    ))}
                    </ul>
                </>
            )}
    
                
            {canComment && (
                <CommentBox blogSlug={blogpost.slug} />
            )}

        </>
    );
}

export { BlogPost }