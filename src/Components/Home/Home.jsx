import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import CardPost from "../CardPost/CardPost";
import Spinner from "../Spinner/Spinner";
import { Avatar } from "@heroui/react";

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import CreatePostCard from "../CreatePostCard/CreatePostCard";

export default function Home() {
  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      params: {
        sort: "-createdAt",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getposts"],
    queryFn: getAllPosts,
    select: (data) => {
      return data?.data.data.posts;
    },
    enabled: true,
  });

  // console.log(data);

  // const posts = data?.data?.data?.posts || [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMsg message={error.message} />;
  }

  return (
    <>
      <CreatePostCard />
      <div>
        {data?.map((post) => {
          return <CardPost isSinglePost={false} key={post._id} post={post} />;
        })}
      </div>
    </>
  );
}
