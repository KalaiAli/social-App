
import CardPost from "../CardPost/CardPost";
import Spinner from "../Spinner/Spinner";


import ErrorMsg from "../ErrorMsg/ErrorMsg";
import CreatePostCard from "../CreatePostCard/CreatePostCard";
import usePosts from "./usePosts";

export default function Home() {
  const { data, isLoading, isError, error } = usePosts();
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
