import { Button, Dropdown, Input, Label, Modal, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DropDownAction({ postId }) {
  const [uploadedImg, setuploadedImg] = useState(null);
  const [isOpen, setisOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Start Delete Post
  const deletePost = async () => {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,

    onSuccess: async () => {
      toast.success("Post deleted successfully");
      // PostDetails → always go Home
      if (location.pathname.startsWith("/postDetails")) {
        navigate("/home");
        return;
      }

      // Profile → refetch profile posts and check remaining posts
      if (location.pathname === "/profile") {
        const result = await queryClient.refetchQueries({
          queryKey: ["getProfilePost"],
        });

        const profileData = result.data;

        const posts = profileData?.data?.data?.posts || [];

        if (posts.length === 0) {
          navigate("/home");
        }

        return;
      }

      // Other pages
      queryClient.invalidateQueries({
        queryKey: ["getposts"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Can't delete post");
    },
  });

  // End Delete Post

  // Start  Update Post
  let image = useRef(null);
  let body = useRef(null);

  function PrepareData() {
    let formData = new FormData();
    if (body.current?.value) {
      formData.append("body", body.current.value);
    }
    if (image.current?.files?.[0]) {
      formData.append("image", image.current.files[0]);
    }

    return formData;
  }

  const updatePost = () => {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      PrepareData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  };

  const { data, mutate: handleUpdatePost } = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      toast.success("Post Created Successfully");

      queryClient.invalidateQueries({ queryKey: ["getposts"] });
      queryClient.invalidateQueries({ queryKey: ["getProfilePost"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost", postId] });

      console.log(data);
      resetPostForm();
      setisOpen(false);
    },

    onError: (error) => {
      console.error("Create Post Error:", error);
      console.error("API Response:", error.response?.data);

      toast.error(error.response?.data?.message || "Can't Create Post");
    },
  });

  function resetPostForm() {
    setuploadedImg(null);

    if (image.current) {
      image.current.value = "";
    }

    if (body.current) {
      body.current.value = "";
    }
  }

  function handleImagePreview(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imgSrc = URL.createObjectURL(file);
    setuploadedImg(imgSrc);
  }
  function handleCloseImg() {
    setuploadedImg(null);

    if (image.current) {
      image.current.value = "";
    }
  }

  return (
    <>
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>

        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              if (key === "edit-post") {
                setisOpen(true);
              }
              if (key === "delete-post") {
                handleDeletePost();
              }
            }}
          >
            <Dropdown.Item id="edit-post" textValue="Edit Post">
              <Label>Edit Post</Label>
            </Dropdown.Item>

            <Dropdown.Item
              id="delete-post"
              textValue="Delete Post"
              variant="danger"
            >
              <Label>Delete Post</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Edit modal */}
      <Modal isOpen={isOpen} onOpenChange={setisOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full sm:max-w-xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Edit Post</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="flex justify-center items-end gap-4">
                  <TextArea
                    ref={body}
                    aria-label="Edit post detail"
                    className="h-32 w-full"
                    placeholder="Add your Post Detail..."
                  />
                  <label htmlFor={postId}>
                    <Input
                      ref={image}
                      onChange={handleImagePreview}
                      type="file"
                      id={postId}
                      hidden
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </label>
                </div>
                {uploadedImg && (
                  <div className="relative mt-4">
                    <img
                      src={uploadedImg}
                      alt="Post preview"
                      className="w-full h-80 object-contain rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={handleCloseImg}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      aria-label="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => handleUpdatePost()} className="w-full">
                  Update Post
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
