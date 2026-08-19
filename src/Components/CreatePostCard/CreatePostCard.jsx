import { Avatar, Input } from "@heroui/react";
import { TextArea } from "@heroui/react";
import { Button, Modal } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";

import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { AuthContext } from "../../Context/AuthContext";

export default function CreatePostCard() {
  const query = useQueryClient();
  const [uploadedImg, setuploadedImg] = useState(null);

  const { userData } = useContext(AuthContext);

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

  function handleImagePreview(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imgSrc = URL.createObjectURL(file);
    setuploadedImg(imgSrc);
  }

  function createpostFunc(formData) {
    return axios.post("https://route-posts.routemisr.com/posts", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, isPending, mutate } = useMutation({
    mutationFn: createpostFunc,

    onSuccess: () => {
      toast.success("Post Created Successfully");

      setTimeout(() => {
        query.invalidateQueries({
          queryKey: ["getposts"],
          refetchType: "all",
        });
      }, 1000);

      resetPostForm();
    },

    onError: (error) => {
      console.error("Create Post Error:", error);
      console.error("API Response:", error.response?.data);

      toast.error(error.response?.data?.message || "Can't Create Post");
    },
  });
  // console.log(data);
  function handleCreatePost() {
    const formData = PrepareData();
    mutate(formData);
  }
  //   console.log("What Data ", data);
  function resetPostForm() {
    setuploadedImg(null);

    if (image.current) {
      image.current.value = "";
    }

    if (body.current) {
      body.current.value = "";
    }
  }
  function handleCloseImg() {
    setuploadedImg(null);

    if (image.current) {
      image.current.value = "";
    }
  }

  return (
    <div className="bg-gray-200 p-4 rounded shadow w-1/2 mx-auto mb-10 mt-3">
      <div className="flex items-center gap-4 p-3">
        <Avatar>
          <Avatar.Image src={userData?.photo} />
        </Avatar>

        <Modal>
          {/* Open Modal */}
          <Button variant="secondary" className="w-full">
            <TextArea
              readOnly
              fullWidth
              placeholder="Add your post"
              variant="primary"
            />
          </Button>

          {/* Modal */}
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="w-full sm:max-w-xl">
                <Modal.CloseTrigger />

                {/* Header */}
                <Modal.Header>
                  <Modal.Heading>Create Post</Modal.Heading>
                </Modal.Header>

                {/* Body */}
                <Modal.Body>
                  <div className="flex items-end justify-center gap-4">
                    <TextArea
                      ref={body}
                      aria-label="Create post"
                      className="h-32 w-96"
                      placeholder="Add your Post Detail..."
                    />

                    {/* Image Upload */}
                    <label htmlFor="create-post-image">
                      <Input
                        ref={image}
                        id="create-post-image"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImagePreview}
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
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                        />
                      </svg>
                    </label>
                  </div>

                  {/* Image Preview */}
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

                {/* Footer */}
                <Modal.Footer>
                  <Button
                    onClick={handleCreatePost}
                    className="w-full"
                    slot="close"
                    isDisabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Create Post"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
