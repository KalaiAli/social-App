import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CommentCard from "../CommentCard/CommentCard";
import CreateComentCard from "../CreateComment/CreateComentCard";

import { Link } from "react-router-dom";
import axios from "axios";
import DropDownAction from "../DropDownAction/DropDownAction";
import { useContext } from "react";
import { AuthContext } from "./../../Context/AuthContext";

export default function CardPost({ post, isSinglePost = false }) {
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

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

  // like   and  Unlike
  function likePost(postId) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const {
    data: likeData,
    isPending: likePending,
    mutate: handleLikePost,
  } = useMutation({
    mutationFn: likePost,

    onSuccess: () => {
      // console.log("LIKE RESPONSE:", response);
      // console.log("RESPONSE DATA:", response.data);
      // console.log("LIKED:", response.data?.data?.liked);

      queryClient.invalidateQueries({
        queryKey: ["getposts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getProfilePost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSinglePost", post.id],
      });
    },
  });

  // console.log(likeData?.data?.data?.liked);
  return (
    <div className="bg-white p-4 rounded shadow w-1/2 mx-auto mb-10 mt-3">
      <header className="flex items-center space-x-3 mb-3 justify-between">
        <Link to={`/postDetails/${post._id}`}>
          <div className="flex items-center gap-3">
            <img
              src={post.user.photo}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="font-semibold">Name : {post.user.name}</p>
              <p className="text-red-600 font-bold">
                <span className="font-semibold text-gray-700">Post id : </span>
                {post.id}
              </p>
              <p className="text-m text-gray-700 mt-2">
                <span className="font-semibold">created Date : </span>
                {new Date(post.createdAt).toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </Link>
        {/* // drop down */}
        {userData?._id === post.user._id && (
          <div>
            <DropDownAction postId={post.id} />
          </div>
        )}
        {/* // drop down */}
      </header>

      {post.body && <p className="mb-3">{post.body}</p>}

      {post.image && (
        <img
          src={post.image}
          alt={post.body}
          className="max-h-96 w-full object-contain mt-3 bg-gray-200 rounded-lg"
        />
      )}

      <div className="flex justify-between text-gray-600 text-sm font-semibold">
        <button
          type="button"
          disabled={likePending}
          onClick={() => handleLikePost(post._id)}
          className="flex items-center space-x-1 cursor-pointer disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${likeData?.data?.data?.liked ? "text-red-800" : ""} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>

          {post.likesCount > 0 && <span>{post.likesCount}</span>}

          <span>{likePending ? "..." : "Like"}</span>
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
