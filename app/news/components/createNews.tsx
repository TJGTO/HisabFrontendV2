import TextEditor from "./testing";

const CreateNews: React.FC = () => {
  return (
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl mt-5 mb-5">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <form>
          <div className="mb-2">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <TextEditor />
          </div>
          <div>
            <button
              type="submit"
              disabled={false}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>{" "}
      </article>
    </div>
  );
};

export default CreateNews;
