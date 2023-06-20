import React, { useState } from 'react';
import { useBlogs } from './DataProvider';
import { useAuth } from './auth';

const CommentBox = ({ blogSlug }) => {
  const { commentBlog } = useBlogs();
  const { user: userData } = useAuth();
  const [comment, setComment] = useState('');

  const saveComment = (e) => {
    e.preventDefault();
    commentBlog(blogSlug, {
      content: comment,
      author: userData.username,
    });
    setComment('');
  };

  return (
    <form onSubmit={saveComment}>
      <label>
        New comment:
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit" disabled={!comment}>
          Add Comment
        </button>
      </label>
    </form>
  );
};

export { CommentBox };