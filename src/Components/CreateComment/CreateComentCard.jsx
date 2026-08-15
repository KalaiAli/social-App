import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CommentForm({ post }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const creatCommentFunc = async (formData) => {
    if (!post?._id) {
      throw new Error("Post ID is missing");
    }

    const response = await axios.post(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: creatCommentFunc,

    onSuccess: (data) => {
      toast.success("comment Created successfully", { position: "top-left" });

      reset();
      queryClient.invalidateQueries({
        queryKey: ["GetPostComments", post._id],
      });
    },

    onError: (error) => {
      toast.error("Cannot create comment");
      console.log("Error creating comment:", error);
    },
  });

  function handleCreateComment(data) {
    const formData = new FormData();

    const image = data.image?.[0];

    if (!data.content && !image) {
      return;
    }

    if (data.content) {
      formData.append("content", data.content);
    }

    if (image) {
      formData.append("image", image);
    }

    mutate(formData);
  }

  //   call API

  // console.log(post);
  return (
    <form onSubmit={handleSubmit(handleCreateComment)}>
      <div className="max-w-2xl mx-auto mt-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          {/* <button
            type="button"
            onClick={() =>
              toast.success("comment Created successfully", {
                position: "top-right",
              })
            }
          >
            Test Toast
          </button> */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add a comment
          </h3>

          <div className="flex items-center">
            <label
              htmlFor="imgFile"
              className="flex items-center gap-2  py-2 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-10 h-10 text-red-400"
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
                className="hidden"
              />
            </label>

            <textarea
              {...register("content")}
              placeholder="Write your comment..."
              rows="1"
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition shrink-0"
            >
              {isPending ? (
                //
                //
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    stroke-inecap="round"
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
                    stroke-inecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
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
