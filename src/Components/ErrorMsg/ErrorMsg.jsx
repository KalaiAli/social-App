export default function ErrorMsg({ message }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>

        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
}
