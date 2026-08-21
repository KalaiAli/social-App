import { WifiOff } from "lucide-react";

export default function Offline() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <WifiOff className="h-10 w-10 text-blue-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">You're Offline</h1>

        {/* Description */}
        <p className="mt-3 text-gray-500">
          It looks like you're not connected to the internet. Please check your
          connection and try again.
        </p>

        {/* Status */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            No Internet Connection
          </p>
          <p className="mt-1 text-xs text-blue-500">
            Waiting for your connection to come back...
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
