import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import {ajouter_produit,get_category} from '../../redux/thunk'

function Add_produit(){
  const value = localStorage.getItem('user'); 
    console.log(value)
    useEffect(() => {
        dispatch(get_category());
      }, []);
    const list_category=useSelector(state=>state.list_category)
    const dispatch=useDispatch();
    const [produit,setProduit]=useState({
        nom:'',
        image:'',
        category:'',
        quantite:0,
        prix:0
    })

    const getValue=(e)=>{
        if([e.target.name]=='image'){
            setProduit({...produit,[e.target.name]:e.target.files[0]})
        }else{
            setProduit({...produit,[e.target.name]:e.target.value})
        }
        
        
    }

    const add_produit=()=>{
        dispatch(ajouter_produit(produit))
        setProduit({
            nom:'',
            image:'',
            category:'',
            quantite:0,
            prix:0
        })
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
                value={produit.nom}
                name="nom"
                id="nom"
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
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category Produit
              </label>
              <select
                name="category"
                id="category"
                value={produit.category}
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Choisir une catégorie</option>
                {list_category.length !== 0 ? (
                  list_category.map((i) => (
                    <option key={i.id_category} value={i.id_category}>
                      {i.nom}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
      
            {/* Prix Produit */}
            <div>
              <label htmlFor="prix" className="block text-gray-700 font-medium mb-2">
                Prix Produit
              </label>
              <input
                type="number"
                value={produit.prix}
                name="prix"
                id="prix"
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
                value={produit.quantite}
                name="quantite"
                id="quantite"
                onChange={getValue}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
      
            {/* Add Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  add_produit();
                }}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      );
}
export default Add_produit