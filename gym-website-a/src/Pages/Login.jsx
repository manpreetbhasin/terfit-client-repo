import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Login() {
  const navigate = useNavigate();

  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/#home");
    goTop();
  };

  return (
    <>
      <section className="login-section">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[30px] font-bold">Sign In</h1>
        </div>
        {/* form  */}
        <div className="page-padding py-[100px] flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-40 px-20 bg-black w-[550px] min450:w-full  shadow-xl"
          >
            <label className="text-[20px] text-white mb-3 font-medium ">Email</label>
            <input
              className="text-[17px] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="gymate@gymail.com"
              type="email"
              required
            ></input>

            <label className="text-[20px] text-white mb-3 font-medium outline-[#ff0336] outline-2">
              Password
            </label>
            <input
              className="text-[17px] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="password"
              type="password"
              required
            ></input>

            <button
              type="submit"
              className="bg-[#ff0336] text-white py-4 font-medium text-[20px] w-full mt-10"
            >
              Sign In
            </button>
            <div className="flex gap-4 items-center mt-16 min450:flex-col">
              <p className="text-white text-[15px]">New to Gymate?</p>
              <Link to="/signup" className="text-[#ff0336] font-bold text-[15px]">
                Sign Up
              </Link>
            </div>
            <p className="text-[#ffffffbc] text-[14px] mt-3">
              <span className="text-[#ff0336]">Test Account</span> - gymate@gymail.com{" "}
              <span className="text-[#ff0336]"> / </span>
              testpassword123
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Login;
