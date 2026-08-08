/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../Context/CounterContext";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import CardPost from "../CardPost/CardPost";

export default function Home() {
  const { counter, setCounter } = useContext(CounterContext);
  // eslint-disable-next-line no-unused-vars
  const [AllPosts, setallPosts] = useState(null);

  // eslint-disable-next-line no-unused-vars

  const [error, setError] = useState(null);
  const [isError, setisError] = useState(false);

  const [isLoading, setisLoading] = useState(true);

  function getPosts() {
    axios
      .get("https://route-posts.routemisr.com/posts", {
        params: {sort:'createdAt'},
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data.data.posts);
        setallPosts(response.data.data.posts);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setisError(true);
        setError("Error : No Posts");
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-red-600 text-xl font-semibold">{error}</div>
      </div>
    );
  }
  return (
    <div className="w-1/2 mx-auto mb-5 -mt-5">
      {AllPosts?.map((post) => (
        <CardPost key ={post._id} post={post} />
      ))}
    </div>
  );
}
