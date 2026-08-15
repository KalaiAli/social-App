import { FadeLoader } from "react-spinners";
export default function Spinner() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        type="button"
        className="py-5 px-10 text-2xl rounded-2xl flex items-center gap-5 font-bold text-white bg-blue-600"
      >
        Loading
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 fill-white animate-spin"
          viewBox="0 0 24 24"
        >
          <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
        </svg>
      </button>
    </div>
  );
}
