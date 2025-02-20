import { useDispatch, useSelector } from "react-redux";
import Nav_admin from "./nav/admin.jsx";
import Nav_supper_admin from "./nav/super_admin.jsx";
import Login from "./login/login.jsx";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const id_role = useSelector((state) => state.id_role);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      {token == null && user==null ? <Login /> : <Nav_supper_admin />}
    </div>
  );
}

export default App;
