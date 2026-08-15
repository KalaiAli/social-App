import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const { userData } = useContext(AuthContext);

  const imageRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // =========================
  // Upload Profile Photo
  // =========================
  const uploadPhoto = async (file) => {
    const formData = new FormData();

    formData.append("photo", file);

    return axios.put(
      "https://route-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: uploadPhoto,

    onSuccess: (response) => {
      console.log("Photo uploaded:", response.data);

      toast.success("Profile photo updated successfully");

      // Update preview with uploaded image
      if (response.data?.data?.user?.photo) {
        setPreview(response.data.data.user.photo);
      }
    },

    onError: (error) => {
      console.error("Upload photo error:", error);
      console.error("API response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to update profile photo",
      );
    },
  });

  // =========================
  // Select Image
  // =========================
  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // Send to backend
    mutate(file);
  }

  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900">
          {/* Cover */}
          <div className="relative h-48  from-blue-500 to-purple-600 md:h-64">
            {userData?.cover && (
              <img
                src={userData.cover}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Profile Header */}
          <div className="relative px-6 pb-6">
            {/* Profile Photo */}
            <div className="-mt-16">
              <div className="relative h-32 w-32">
                <img
                  src={preview || userData?.photo}
                  alt={userData?.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md dark:border-gray-900"
                />

                {/* Upload Button */}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => imageRef.current?.click()}
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  📷
                </button>

                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Name */}
            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData?.name}
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                  @{userData?.username}
                </p>
              </div>

              {isPending && (
                <p className="text-sm text-blue-600">Uploading photo...</p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-8 border-y border-gray-200 py-5 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {userData?.followersCount}
                </p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {userData?.followingCount}
                </p>
                <p className="text-sm text-gray-500">Following</p>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {userData?.bookmarksCount}
                </p>
                <p className="text-sm text-gray-500">Bookmarks</p>
              </div>
            </div>

            {/* Information */}
            <div className="mt-8">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Email</p>

                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    {userData?.email}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Username</p>

                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    @{userData?.username}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Date of Birth</p>

                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    {formatDate(userData?.dateOfBirth)}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Gender</p>

                  <p className="mt-1 font-medium capitalize text-gray-900 dark:text-white">
                    {userData?.gender}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800 md:col-span-2">
                  <p className="text-sm text-gray-500">Joined</p>

                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    {formatDate(userData?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
