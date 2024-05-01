import { useRef } from "react";
import { http } from "../../utils/http";
import toast from "react-hot-toast";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login() {
    const res = await http("/user/login", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Logged in successfully!");
    localStorage.setItem("token", res.token);
    window.location.href = "/app";
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-800 flex-col">
        <img src="/big-logo.png" alt="logo" className="w-96 my-2 rounded-lg" />
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-400">Sign In</p>
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div>
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={login}
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="text-sm text-blue-600 hover:underline"
              href="/register"
            >
              Not registered? Sign up!
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
