import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_users, affecter_permition } from "../../redux/thunk";

function Afficher_users() {
  const dispatch = useDispatch();
  const list_users = useSelector((state) => state.list_users);
  const loading=useSelector(state=>state.loading)
  
  useEffect(() => {
    dispatch(get_users());
  }, []);

  const set_permition = (event,id_user, obj_permition) => {
    
    const new_obj = obj_permition;
    Object.entries(obj_permition).map(([key, value]) => {
      if (key == [event.target.name]) {
        new_obj[event.target.name] = event.target.checked;
      }
    });
    dispatch(affecter_permition(id_user,new_obj))
  };

  
  console.log("list", list_users);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Loading State */}
      {loading && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-80 z-50 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-xl font-medium text-white">Chargement...</span>
    </div>
  </div>
)}


  
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des utilisateurs</h1>
  
      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">Nom</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Rôle</th>
              <th className="py-4 px-6 text-left">Permissions</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm">
            {list_users.length !== 0 ? (
              list_users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-4 px-6">{user.id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.role.nom_role}</td>
  
                  {/* Permissions */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-3">
                      {user.permition ? (
                        Object.entries(user.permition).map(([key, value]) => (
                          <label key={key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name={key}
                              className="form-checkbox h-4 w-4 text-blue-500"
                              checked={value}
                              onClick={(e) =>
                                set_permition(e, user.id, user.permition)
                              }
                            />
                            <span className="text-gray-600">{key}</span>
                          </label>
                        ))
                      ) : (
                        <span className="text-gray-500">Aucune permission</span>
                      )}
                    </div>
                  </td>
  
                  {/* Delete Button */}
                  <td className="py-4 px-6 text-center">
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-6 text-center text-gray-500 font-medium"
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
export default Afficher_users;
