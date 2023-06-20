import React from 'react';
import { useBlogs } from "./DataProvider";
import { useAuth } from './auth';

const Comment = ({ comment, blogSlug, position }) => {
 
  const auth = useAuth();
  const { removeComment } = useBlogs();

 const deleteComment = () => {
     removeComment(blogSlug, position);
  };

  const canRemove = auth.user?.isAdmin || auth.user?.data?.username === comment.author;

  return (
    <li>
      <p style={{ fontWeight: 'bold' }}>
        {comment.author}
        {canRemove && (
          <span
            style={{ color: 'red', marginLeft: '8px', cursor: 'pointer' }}
            onClick={deleteComment}
          >
            X
          </span>
        )}
      </p>
      <p>{comment.content}</p>
    </li>
  );
};

export { Comment };