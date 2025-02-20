import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouter_users, get_roles } from "../../redux/thunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Ajouter_user() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const Confirmer_password = useSelector((state) => state.Confirmer_password);
  const name = useSelector((state) => state.name);
  const role = useSelector((state) => state.role);
  const list_role = useSelector((state) => state.list_role);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    Confirmer_password: "",
    id_role: "",
  });

  useEffect(() => {
    dispatch(get_roles());
  }, []);
  const getValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const add_users = () => {
    if (user) {
      dispatch(ajouter_users(user));
      if(email==''&&password==''&&role==''&&name==''&&Confirmer_password==''){

        setUser({
            name: "",
            email: "",
            password: "",
            Confirmer_password: "",
            id_role: "",
          });
          toast.success('bien ajouter!')
      }
    }
  };

  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Ajouter un nouveau utilisateur
        </h1>
        <form action="">
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Nom</label>
            <input
              type="text"
              value={user.name}
              name="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={getValue}
            />
            <div>
              {name !== "" && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.517 11.6A1.5 1.5 0 0117.517 17H2.483a1.5 1.5 0 01-1.257-2.301l6.517-11.6zM10 13a1 1 0 100-2 1 1 0 000 2zm.75-3.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {name}
                </p>
              )}
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">role</label>
            <select name="id_role" id="" onClick={getValue}>
              <option value="">choisir un role</option>
              {list_role.length !== 0
                ? list_role.map((i) => (
                    <option value={i.id_role}>{i.nom_role}</option>
                  ))
                : null}
            </select>
            <div>
              {role !== "" && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.517 11.6A1.5 1.5 0 0117.517 17H2.483a1.5 1.5 0 01-1.257-2.301l6.517-11.6zM10 13a1 1 0 100-2 1 1 0 000 2zm.75-3.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {role}
                </p>
              )}
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={getValue}
            />
            <div>
              {email !== "" && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.517 11.6A1.5 1.5 0 0117.517 17H2.483a1.5 1.5 0 01-1.257-2.301l6.517-11.6zM10 13a1 1 0 100-2 1 1 0 000 2zm.75-3.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {email}
                </p>
              )}
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Mot de passe</label>
            <input
              value={user.password}
              type="password"
              name="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={getValue}
            />
            <div>
              {password !== "" && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.517 11.6A1.5 1.5 0 0117.517 17H2.483a1.5 1.5 0 01-1.257-2.301l6.517-11.6zM10 13a1 1 0 100-2 1 1 0 000 2zm.75-3.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {password}
                </p>
              )}
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-gray-600 mb-2">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              value={user.Confirmer_password}
              name="Confirmer_password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={getValue}
            />
            <div>
              {Confirmer_password !== "" && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.517 11.6A1.5 1.5 0 0117.517 17H2.483a1.5 1.5 0 01-1.257-2.301l6.517-11.6zM10 13a1 1 0 100-2 1 1 0 000 2zm.75-3.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {Confirmer_password}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              add_users();
            }}
            type="button"
            class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Ajouter_user;
