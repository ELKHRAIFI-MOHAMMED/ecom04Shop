import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { get_depences } from "../redux/thunk";


function Afficher_depence(){
    const dispatch=useDispatch()
    const list_depence=useSelector(state=>state.list_depence)
    const loading=useSelector(state=>state.loading)
    let [table,settable] = useState([])
    useEffect(()=>{
       dispatch(get_depences())
    },[])
     console.log(list_depence)
    return(
        <div>
            {loading == true  ? (
        <div>
             <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </div>
        
      ) : (
        <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-100 border-b">
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Date de Dépense</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Ajouté par</th>
            </tr>
        </thead>
        <tbody>
            {list_depence.length != 0 ? (
                list_depence.map((i) => (
                    <tr class="border-b hover:bg-gray-50" key={i.id}>
                        <td class="py-2 px-4 text-gray-800">{i.nom}</td>
                        <td class="py-2 px-4 text-gray-800">{i.description}</td>
                        <td class="py-2 px-4 text-gray-800">{i.date_depence}</td>
                        <td class="py-2 px-4 text-gray-800">{i.name}</td>
                        <td><input type="checkbox" name="hh" id="" /></td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" class="py-4 text-center text-gray-500">Aucune dépense trouvée</td>
                </tr>
            )}
        </tbody>
    </table>
</div>

      )}
        </div>
    )

}
export default Afficher_depence