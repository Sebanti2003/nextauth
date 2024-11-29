import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden
      hover:shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-lg font-bold text-gray-900">
                  Welcome to our website
                </h2>
                <Link
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  href="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
