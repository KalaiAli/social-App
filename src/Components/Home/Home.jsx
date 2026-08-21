import CardPost from "../CardPost/CardPost";
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet-async";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import CreatePostCard from "../CreatePostCard/CreatePostCard";
import usePosts from "./usePosts";
import homeIcon from "../../assets/home.svg";

export default function Home() {
  const { data, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMsg message={error?.message || "Something went wrong"} />;
  }

  const posts = data || [];

  return (
    <>
      <Helmet>
        <title>Home | Social App</title>

        <meta
          name="description"
          content="Explore the CEO profile, professional experience"
        />

        <meta
          name="keywords"
          content="CEO, Home,  business, technology, innovation, professional experience"
        />

        <meta name="Kalai Ali" content="CEO" />

        <link rel="icon" type="image/png" href={homeIcon} />
      </Helmet>

      <CreatePostCard />

      <div>
        {posts.map((post) => (
          <CardPost key={post._id} post={post} isSinglePost={false} />
        ))}
      </div>
    </>
  );
}
