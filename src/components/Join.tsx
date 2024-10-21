const Join = () => {

  return (
    <div className="flex items-center v-screen w-full">
      <div className="flex justify-center w-screen">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
        <label
            className="block text-primary_text text-xl font-bold mb-2 flex justify-center"
        >
            회원 가입
        </label>
          <div className="flex items-center justify-center mt-5">
            <button type="button" className="p-0 m-0 border-none bg-transparent">
              <img
                src="src/assets/images/web_neutral_rd_SU.svg"
                alt="Sign up with Google"
                className="w-auto h-auto"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
