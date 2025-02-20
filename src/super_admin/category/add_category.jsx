import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {ajouter_category } from '../../redux/thunk'
import axios from "axios";


function Ajouter_category(){
 const dispatch=useDispatch()
 const loading=useSelector(state=>state.loading)
 const [new_category,setNew_category]=useState({
    nom:""
 })


 const ajt_category=()=>{
     if(new_category.nom!=''){
        dispatch(ajouter_category(new_category))
        setNew_category({
            nom:""
        })
     }
 }
 console.log(new_category)

 return(
 <div className="p-4">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
        </div>
      ) : (
        <div className="mt-8">
  <form action="" className="space-y-4">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Nom Category</label>
    <input
      type="text"
      name="category"
      id="category"
      value={new_category.nom}
      className="mt-1 block w-full px-3 py-2 border content-center border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e)=>{setNew_category({nom:e.target.value})}}
    />
    <button
      type="button"
      onClick={()=>{ajt_category()}}
      className="mt-4 w-1/2 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mx-auto"
    >
      Add
    </button>
  </form>
</div>
      )}
    </div>
  );
}
export default Ajouter_category