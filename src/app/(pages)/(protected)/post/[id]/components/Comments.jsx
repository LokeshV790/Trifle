"use client";
import React, { useEffect, useState, useTransition } from "react";
import Post from "../../../components/Post";
import axios from "axios";
import BackToTop from "../../../components/BackToTop";

function Comments({id}) {
  const [pending, startTransition] = useTransition();
  const [comments, setComments] = useState(null)
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/posts/comments", { id: id });
      setComments(res.data.comments);
    });
  }, []);
  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          return (
            <Post
              disabled={false}
              key={index}
              user={comment.createdBy}
              details={{
                comments: comment.comments,
                likes: comment.likes,
                createdAt: comment.createdAt,
                id: comment._id,
                image: comment.image,
                reposts: comment.reposts,
                repostedBy: comment.repostedBy,
                
              }}
            >
              {comment.content}
            </Post>
          );
        })}

        {comments && comments.length == 0 ? <div className="h-32 flex items-center justify-center">This post does not have any comments</div> : <BackToTop></BackToTop>}
    </>
  );
}

export default Comments;
