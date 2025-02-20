import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_category ,supprimer_category} from "../../redux/thunk";
import axios from "axios";

function Afficher_category() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [test,setTest]=useState('')
 
  useEffect(() => {
    dispatch(get_category());
  }, []);
  const list_category = useSelector((state) => state.list_category);
  const loading = useSelector((state) => state.loading);

  const produit_caregory=(idc)=>{
    navigate('/index/category/produit',{state:idc})
  }

  const delete_category=(idc)=>{
    dispatch(supprimer_category(idc))
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
        </div>
      ) : (
        <div className="mt-8">
          {list_category && list_category.length > 0 ? (
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">ID Category</th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Nom Category</th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Nombre produit</th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Produit</th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {list_category.map((t) => (
                  <tr key={t.id_category} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-300">{t.id_category}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{t.nom}</td>
                    <td className="px-6 py-4 border-b border-gray-300">{t.nombre_produit}</td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <button
                        onClick={() => produit_caregory(t.id_category)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                      onClick={()=>{delete_category(t.id_category)}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full mt-4">
              <p className="text-gray-500">Aucun category pour le moment</p>
            </div>
          )}
        </div>
      )}

      <div>
        {test!='' && (
          <div>
            <p>{test[0].nom}</p>
            <p>{test[0].caracteristiques.couleur}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Afficher_category;
