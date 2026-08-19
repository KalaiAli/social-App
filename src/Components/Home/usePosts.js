import {  useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function usePosts () {
    
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getposts"],
    queryFn: getAllPosts,
    select: (data) => {
      return data?.data.data.posts;
    },
    enabled: true,
  });

  // console.log(data);
  return { data, isLoading, isError, error };
}


