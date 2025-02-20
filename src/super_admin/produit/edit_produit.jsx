import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import {mise_jour_produit,get_category} from '../../redux/thunk'

function Edit_produit(){
    useEffect(() => {
        dispatch(get_category());
      }, []);
    const navigate=useNavigate()
    const list_category=useSelector(state=>state.list_category)
    const dispatch=useDispatch();
    const location=useLocation()
    const [produit,setProduit]=useState(location.state.produit)
    const from=location.state.from
    console.log(produit)
    const getValue=(e)=>{
        if([e.target.name]=='image'){
            setProduit({...produit,[e.target.name]:e.target.files[0]})
        }else{
            setProduit({...produit,[e.target.name]:e.target.value})
        }
        
        
    }

    const update_produit=()=>{
        dispatch(mise_jour_produit(produit))
        navigate(from,{state:produit.id_category})
    }
    console.log(produit)
  
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8">
          <form className="space-y-4">
            {/* Nom Produit */}
            <div>
              <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
                Nom Produit
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={produit.nom}
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
      
            {/* Image Produit */}
            <div>
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Image Produit
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
      
            {/* Category Produit */}
            <div>
              <label htmlFor="id_category" className="block text-gray-700 font-medium mb-2">
                Category Produit
              </label>
              <select
                name="id_category"
                id="id_category"
                value={produit.id_category} // Set the value for controlled component behavior
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Choisir une catégorie</option>
                {list_category.length !== 0 &&
                  list_category.map((i) => (
                    <option key={i.id_category} value={i.id_category}>
                      {i.nom}
                    </option>
                  ))}
              </select>
            </div>
      
            {/* Prix Produit */}
            <div>
              <label htmlFor="prix" className="block text-gray-700 font-medium mb-2">
                Prix Produit
              </label>
              <input
                type="number"
                name="prix_produit"
                id="prix_produit"
                value={produit.prix_produit}
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
      
            {/* Quantité Produit */}
            <div>
              <label htmlFor="quantite" className="block text-gray-700 font-medium mb-2">
                Quantité Produit
              </label>
              <input
                type="number"
                name="quantite"
                id="quantite"
                value={produit.quantite}
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
      
            {/* Edit Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  update_produit();
                }}
                className="w-full bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      );
      
}
export default Edit_produit