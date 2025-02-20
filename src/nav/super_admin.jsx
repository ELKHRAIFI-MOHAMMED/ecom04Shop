import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineAppstore,
  AiOutlineUsergroupAdd,
  AiOutlineDollarCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdCategory, MdEdit } from "react-icons/md";

// Import components
import Add_commande from "../admine/interface1";
import List_commande from "../admine/interface2";
import Add_produit from "../super_admin/produit/Add_produit";
import Afficher_produit from "../super_admin/produit/index_produit";
import Edit_produit from "../super_admin/produit/edit_produit";
import Afficher_category from "../super_admin/category/index_category";
import Ajouter_category from "../super_admin/category/add_category";
import Ajouter_user from "../super_admin/users/add_user";
import Afficher_users from "../super_admin/users/index_user";
import Afficher_depence from "../full_control/index_despence";
import Ajouter_depence from "../full_control/add_depence";
import Logout from "../login/logout";
import Accueil from "../full_control/accueil";
import Afficher_category_produit from "../super_admin/category/index_category_produit";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import NewVille from "../complain/newVille";

function NavSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { path: "/", label: "Accueil", icon: <AiOutlineHome /> ,permission: true},
    { path: "/add/commande", label: "Ajouter une commande", icon: <AiOutlinePlus />, permission: "commandes"},
    { path: "/index/commande", label: "Liste commandes", icon: <AiOutlineUnorderedList />,permission: "commandes" },
    { path: "/add/produit", label: "Ajouter un produit", icon: <AiOutlinePlus />,permission: "produits" },
    { path: "/index/produit", label: "Liste produits", icon: <AiOutlineAppstore />,permission: "produits" },
    { path: "/index/category", label: "Liste catégories", icon: <MdCategory />,permission: "categorys" },
    { path: "/add/category", label: "Ajouter catégorie", icon: <AiOutlinePlus />,permission: "categorys" },
    { path: "/add/users", label: "Ajouter utilisateur", icon: <AiOutlineUsergroupAdd />,permission: "utilisateurs" },
    { path: "/index/users", label: "Liste utilisateurs", icon: <AiOutlineUsergroupAdd />,permission: "utilisateurs" },
    { path: "/index/depences", label: "Liste dépenses", icon: <AiOutlineDollarCircle />,permission: "depence" },
    { path: "/add/depences", label: "Ajouter dépense", icon: <AiOutlinePlus />,permission: "depence" },
    { path: "/logout", label: "Déconnexion", icon: <AiOutlineLogout />,permission: true },
    //{ path: "/ville", label: "ville", icon: <AiOutlineLogout />,permission: "depence" },
  ];

  const routes = [
    { path: "/ville", element: <NewVille /> },
    { path: "/", element: <Accueil /> },
    {
      path: "/add/commande",
      element: <Add_commande />,
      permission: "commandes",
    },
    {
      path: "/index/commande",
      element: <List_commande />,
      permission: "commandes",
    },
    {
      path: "/add/produit",
      element: <Add_produit />,
      permission: "produits",
    },
    {
      path: "/index/produit",
      element: <Afficher_produit />,
      permission: "produits",
    },
    {
      path: "/edit/produit",
      element: <Edit_produit />,
      permission: "produits",
    },
    {
      path: "/index/category",
      element: <Afficher_category />,
      permission: "categorys",
    },
    {
      path: "/index/category/produit",
      element: <Afficher_category_produit />,
      permission: "categorys",
    },
    {
      path: "/add/category",
      element: <Ajouter_category />,
      permission: "categorys",
    },
    {
      path: "/add/users",
      element: <Ajouter_user />,
      permission: "utilisateurs",
    },
    {
      path: "/index/users",
      element: <Afficher_users />,
      permission: "utilisateurs",
    },
    {
      path: "/index/depences",
      element: <Afficher_depence />,
      permission: "depence",
    },
    {
      path: "/add/depences",
      element: <Ajouter_depence />,
      permission: "depence",
    },
    { path: "/logout", element: <Logout /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg transition-all duration-300 z-20 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <button
          className="p-4 text-white flex items-center justify-center w-full"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </button>
        <nav className="mt-4 flex flex-col overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <ul className="space-y-3">
            {navLinks.map(({ path, label, icon,permission }) => (
              <li className={user.permition[permission] !== false ? "visible-class" : "hidden"}>
                <Link
                  to={path}
                  className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transform transition ${
                    location.pathname === path ? "bg-gray-700" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{icon}</span>
                  {isSidebarOpen && <span>{label}</span>}
                </Link>
              </li>
            ))}
            <li></li><br />
            <li></li><br />
            <li></li><br />

            <li></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow p-6 bg-gray-100 text-gray-900 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Routes>
      {routes.map(({ path, element, permission }, index) => (
        <Route
          key={index}
          path={path}
          element={
            permission ? (
              <ProtectedRoute isAllowed={user.permition[permission]}>
                {element}
              </ProtectedRoute>
            ) : (
              element
            )
          }
        />
      ))}
    </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <NavSuperAdmin />
    </Router>
  );
}
