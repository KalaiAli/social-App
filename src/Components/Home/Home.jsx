import { useContext } from "react";
import { CounterContext } from "../../Context/CounterContext";

export default function Home() {
  const { counter, setCounter } = useContext(CounterContext);

return (
  <div className="container mx-auto py-10">
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome Home 👋</h1>

      <p className="text-gray-600 mb-2">Current Counter</p>

      <h2 className="text-5xl font-bold text-blue-600 mb-6">{counter}</h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCounter(counter - 1)}
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          -
        </button>

        <button
          onClick={() => setCounter(0)}
          className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          +
        </button>
      </div>
    </div>
  </div>
);
}
