import { useRef } from "react";
import toast from "react-hot-toast";
import { http } from "../../utils/http";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const typeRef = useRef();

  async function register() {
    const res = await http("/user/register", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      type: typeRef.current.value,
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Registered successfully!");
    window.location.href = "/";
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-400">Sign Up</p>
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
            <label className="text-gray-400">
              <div>I am a:</div>
              <select
                defaultValue="mentee"
                className="p-2 rounded-md"
                ref={typeRef}
              >
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </label>
          </div>
          <div>
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={register}
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-center">
            <a className="text-sm text-blue-600 hover:underline" href="/">
              Already registered? Sign in!
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
