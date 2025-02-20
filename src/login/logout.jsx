import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/thunk.jsx";
import { useNavigate } from "react-router-dom";


function Logout(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
   useEffect(()=>{
       dispatch(logout())
       

   },[])
   return(
    <>
    </>
   )

}
export default Logout