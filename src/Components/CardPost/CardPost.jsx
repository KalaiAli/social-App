import CommentCard from "../CommentCard/CommentCard";

export default function CardPost({ post }) {
  return (
    <>
      <div className="bg-white p-4 rounded shadow w-1/2 mx-auto mb-10 mt-3">
        <header className="flex items-center space-x-3 mb-3">
          <img
            src={post.user.photo}
            className="w-10 -h-10 rounded-full object-cover"
            alt=""
          />
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </header>
        {post.body && <p className="mb-3">{post.body}</p>}

        {post.image && (
          <img
            src={post.image}
            alt={post.body}
            className="rounded max-h-96 w-full object-cover mb-3"
          />
        )}
        <div className="flex justify-between text-gray-600 text-sm font-semibold">
          <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <i className="fas fa-thumbs-up">
              {post.likesCount <= 0 ? "" : post.likesCount}
            </i>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 ">
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
        <CommentCard  comment ={post.topComment}/>
      </div>
    </>
  );
}
