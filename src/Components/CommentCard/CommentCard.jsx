export default function CommentCard({ comment }) {
  if (!comment) return null;

  const { commentCreator, content, image, createdAt } = comment;

  return (
    <div className="border border-gray-300 p-3 mt-2">
      <header className="flex items-center space-x-3 mb-3">
        <img
          src={commentCreator?.photo}
          className="w-10 h-10 rounded-full object-cover"
          alt={commentCreator?.name || "user"}
        />
        <div>
          <p className="font-semibold">{commentCreator?.name}</p>
          <p className="text-xs text-gray-500">
            {createdAt && new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </header>

      {content && <p className="mb-3">{content}</p>}
      {image && (
        <img
          src={image}
          alt="comment attachment"
          className="w-full rounded object-cover mb-3"
        />
      )}
    </div>
  );
}
