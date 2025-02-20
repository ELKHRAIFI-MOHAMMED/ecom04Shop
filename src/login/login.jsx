import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/thunk.jsx";

function Login() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const loading = useSelector((state) => state.loading);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login_user = () => {
    dispatch(login(user));
    window.history.pushState(null, '', '/');
  };
  console.log(user);

  return (
    <div className="w-full">
      {loading == true  ? (
        <div>
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <div class="flex justify-center items-center h-screen">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full">
            <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
            <form action="">
              <div class="mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={getValue}
                />
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={getValue}
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    login_user();
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            {message && (
              <div style={{ color: "red" }}>
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
