export default function Login1() {
  return (
    <div className="bg-black flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-300">
        <div className="flex justify-between mb-6 border-b border-gray-200">
          <button className="w-1/2 text-center text-gray-600 pb-2 font-medium border-b-2 border-indigo-500">
            Sign In
          </button>

          <button className="w-1/2 text-center text-gray-600 pb-2 font-medium border-b-2 border-transparent hover:border-indigo-500">
            Sign Up
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="rajesh@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />

              <span>Remember me</span>
            </label>

            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition">
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-500">Or continue with</p>

          <div className="mt-4 flex gap-3">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                className="h-5"
                alt="facebook"
              />
            </button>

            <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                className="h-5"
                alt="github"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
