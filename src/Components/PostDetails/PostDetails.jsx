import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CardPost from "../CardPost/CardPost";
import Spinner from "../Spinner/Spinner";
import ErrorMsg from "../ErrorMsg/ErrorMsg";



export default function PostDetails() {
  const { id } = useParams();
  console.log(id);
  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getPostDetails,

    enabled: !!id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <>
        <div>
            <ErrorMsg message={error.message} />
        </div>
      </>
    );
  }
  console.log(data);

  return (
    <div>
      <CardPost  isSinglePost={true}    post={data?.data.data.post} />
    </div>
  );
}
