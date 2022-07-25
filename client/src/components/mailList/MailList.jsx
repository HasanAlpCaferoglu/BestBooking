const MailList = () => {
  return (
    <section className="flex flex-col items-center justify-center pb-24 bg-gray-900 w-screen mt-[250px] lg:mt-[300px]">
        <div className=" flex justify-center -mt-48 mx-4 break-words w-3/4 md:w-max shadow-lg rounded-lg bg-gray-300 ">
          <div className="flex-auto w-full p-5 lg:p-10">
            <h4 className="text-2xl font-semibold">
              Want to get best deals for you?
            </h4>
            <p className="leading-relaxed mt-1 mb-4 text-gray-600">
              Complete this form and we will get back to you in 24 hours.
            </p>
            <div className="relative w-full mb-3 mt-8">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full transition-all"
                placeholder="Full Name"
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full transition-all"
                placeholder="Email"
              />
            </div>

            <div className="text-center mt-6">
              <button
                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all"
                type="button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
    </section>
  );
};

export default MailList;
