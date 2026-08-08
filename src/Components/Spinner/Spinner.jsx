import { FadeLoader } from "react-spinners";
export default function Spinner() {
  return (
    <div className="h-screen flex  justify-center items-center ">
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div> */}
      <FadeLoader
        color="#2563eb"
     
        height={80}
        width={18}
        radius={8}
        margin={15}
        speedMultiplier={1}
      />
    </div>
  );
}
