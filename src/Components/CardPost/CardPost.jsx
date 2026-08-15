import { useQuery } from "@tanstack/react-query";
import CommentCard from "../CommentCard/CommentCard";
import CreateComentCard from "../CreateComment/CreateComentCard";

import { Link } from "react-router-dom";
import axios from "axios";

export default function CardPost({ post, isSinglePost = false }) {
  function GetPostComment() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,
      {
        params: {
          limit: 5,
          sort: "-createdAt",
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { data } = useQuery({
    queryKey: ["GetPostComments", post._id],
    queryFn: GetPostComment,
    enabled: isSinglePost,
  });

  return (
    <div className="bg-white p-4 rounded shadow w-1/2 mx-auto mb-10 mt-3">
      <Link to={`/postDetails/${post._id}`}>
        <header className="flex items-center space-x-3 mb-3">
          <img
            src={post.user.photo}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </header>
      </Link>

      {post.body && <p className="mb-3">{post.body}</p>}

      {post.image && (
        <img
          src={post.image}
          alt={post.body}
          className="max-h-96 w-full object-contain mt-3 bg-gray-200 rounded-lg"
        />
      )}

      <div className="flex justify-between text-gray-600 text-sm font-semibold">
        <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
          <i className="fas fa-thumbs-up">
            {post.likesCount <= 0 ? "" : post.likesCount}
          </i>
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
          <i className="fas fa-comment">
            {post.commentsCount <= 0 ? "" : post.commentsCount}
          </i>
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
          <i className="fas fa-share">
            {post.sharesCount <= 0 ? "" : post.sharesCount}
          </i>
          <span>Share</span>
        </button>
      </div>

      {/* post comment */}
      <CreateComentCard post={post} />

      {/* single top comment on feed view */}
      {!isSinglePost && post.topComment && (
        <CommentCard comment={post.topComment} />
      )}

      {/* all comments on single post view */}
      {isSinglePost &&
        data?.data?.data?.comments?.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
    </div>
  );
}
