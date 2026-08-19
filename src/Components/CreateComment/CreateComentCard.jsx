import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CommentForm({ post }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: null,
    },
  });

  const createComment = async (formData) => {
    if (!post?._id) {
      throw new Error("Post ID is missing");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    console.log("Post ID:", post._id);
    console.log("Token exists:", !!token);

    const response = await axios.post(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Comment response:", response.data);

    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      toast.success("Comment created successfully", {
        position: "top-left",
      });

      reset();

      queryClient.invalidateQueries({
        queryKey: ["GetPostComments", post?._id],
      });
    },

    onError: (error) => {
      console.error("Comment error:", error);
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);

      toast.error(error.response?.data?.message || "Cannot create comment");
    },
  });

  const handleCreateComment = (data) => {
    console.log("Form data:", data);

    const content = data.content?.trim();
    const image = data.image?.[0];

    // Don't send an empty comment
    if (!content && !image) {
      toast.warning("Please write a comment or select an image");
      return;
    }

    const formData = new FormData();

    if (content) {
      formData.append("content", content);
    }

    if (image) {
      formData.append("image", image);
    }

    // Debug FormData
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateComment)}>
      <div className="max-w-2xl mx-auto mt-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add a comment
          </h3>

          <div className="flex items-center gap-3">
            <label
              htmlFor="imgFile"
              className="flex items-center justify-center p-2 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-8 h-8 text-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Z"
                />
              </svg>

              <input
                {...register("image")}
                id="imgFile"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>

            <textarea
              {...register("content")}
              placeholder="Write your comment..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition shrink-0 disabled:opacity-50"
            >
              {isPending ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 0 .75Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 0 .75Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 0-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0-.978-2.025C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
