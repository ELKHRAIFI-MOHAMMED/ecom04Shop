import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_list_cmd, set_status_commande } from "../redux/thunk";
import { tr, vi } from "date-fns/locale";
import axios from "axios";
import { set } from "date-fns/fp/set";

function List_commande() {
  const [list_villes, setList_villes] = useState("");
  const loading = useSelector((state) => state.loading);
  const list_commandes = useSelector((state) => state.list_commandes);
  console.log(list_commandes);
  const [list_cmd, setList_cmd] = useState([]);
  console.log("1:" + list_cmd);
  const [list_status, setList_status] = useState(null);
  const dispatch = useDispatch();
  //////pertier filtre
  const [date_commande, setDate_commande] = useState("");
  const [ville, setVille] = useState("");
  const [status_cmd, setStatus_cmd] = useState("");
  const [global_find, setGlobal_find] = useState("");

  console.log(date_commande);
  console.log(ville);
  console.log(status_cmd);
  useEffect(() => {
    dispatch(get_list_cmd());

    axios.get("http://localhost:3004/status").then((res) => {
      setList_status(res.data);
    });

    axios.get("http://localhost:3004/ville").then((res) => {
      setList_villes(res.data);
    });
  }, []);
  useEffect(() => {
    setList_cmd(list_commandes);
  }, [list_commandes]);

  //////// mise_a_jour des status
  const up_dtae_status = (idc, new_status) => {
    alert(idc);
    alert(new_status);
    const status = list_status.filter((i) => i.nom === new_status);
    dispatch(set_status_commande(idc, status));
    setList_cmd(
      list_cmd.map((i) => {
        if (i.id_commande == idc) {
          return { ...i, status: new_status };
        }
        return i;
      })
    );
  };
  ////////
  const filter_date = (val) => {
    setDate_commande(val);
    setGlobal_find("");
    if (ville != "" && status_cmd != "") {
      if (val == "") {
        setList_cmd(
          list_commandes.filter(
            (i) => i.ville == ville && i.status == status_cmd
          )
        );
      } else {
        setList_cmd(
          list_commandes.filter(
            (i) =>
              i.ville == ville &&
              i.date_commande == val &&
              i.status == status_cmd
          )
        );
      }
    } else {
      if (status_cmd != "" && ville == "") {
        if (val == "") {
          setList_cmd(list_commandes.filter((i) => i.status == status_cmd));
        } else {
          setList_cmd(
            list_commandes.filter(
              (i) => i.date_commande == val && i.status == status_cmd
            )
          );
        }
      } else {
        if (status_cmd == "" && ville != "") {
          if (val == "") {
            setList_cmd(list_commandes.filter((i) => i.ville == ville));
          } else {
            setList_cmd(
              list_commandes.filter(
                (i) => i.ville == ville && i.date_commande == val
              )
            );
          }
        } else {
          if (status_cmd == "" && ville == "") {
            if (val == "") {
              setList_cmd(list_commandes);
            } else {
              setList_cmd(list_commandes.filter((i) => i.date_commande == val));
            }
          }
        }
      }
    }
  };
  const filter_ville = (val) => {
    setVille(val);
    setGlobal_find("");
    if (status_cmd != "" && date_commande != "") {
      if (val === "") {
        setList_cmd(
          list_commandes.filter(
            (i) => i.date_commande == date_commande && i.status == status_cmd
          )
        );
      } else {
        setList_cmd(
          list_commandes.filter(
            (i) =>
              i.ville == val &&
              i.date_commande == date_commande &&
              i.status == status_cmd
          )
        );
      }
    } else {
      if (date_commande != "" && status_cmd == "") {
        if (val === "") {
          setList_cmd(
            list_commandes.filter((i) => i.date_commande == date_commande)
          );
        } else {
          setList_cmd(
            list_commandes.filter(
              (i) => i.ville == val && i.date_commande == date_commande
            )
          );
        }
      } else {
        if (date_commande == "" && status_cmd != "") {
          if (val == "") {
            setList_cmd(list_commandes.filter((i) => i.status == status_cmd));
          } else {
            setList_cmd(
              list_commandes.filter(
                (i) => i.ville == val && i.status == status_cmd
              )
            );
          }
        } else {
          if (date_commande == "" && status_cmd == "") {
            if (val === "") {
              setList_cmd(list_commandes);
            } else {
              setList_cmd(list_commandes.filter((i) => i.ville == val));
            }
          }
        }
      }
    }
  };

  const filter_status = (val) => {
    setStatus_cmd(val);
    setGlobal_find("");
    if (ville != "" && date_commande != "") {
      setList_cmd(
        list_commandes.filter(
          (i) =>
            i.ville == ville &&
            i.date_commande == date_commande &&
            i.status == val
        )
      );
    } else {
      if (date_commande != "" && ville == "") {
        setList_cmd(
          list_commandes.filter(
            (i) => i.status == val && i.date_commande == date_commande
          )
        );
      } else {
        if (date_commande == "" && ville != "") {
          setList_cmd(
            list_commandes.filter((i) => i.ville == ville && i.status == val)
          );
        } else {
          setList_cmd(list_commandes.filter((i) => i.status == val));
        }
      }
    }
  };

  const filter_global = (val) => {
    setGlobal_find(val);
    setDate_commande("");
    setVille("");
    // setList_status('')
    // setList_status('')
    if (val === "") {
      setList_cmd(list_commandes);
    } else {
      setList_cmd(
        list_commandes.filter(
          (i) =>
            i.nom == val ||
            i.nom == val ||
            i.id_commande == val ||
            i.nom_c == val ||
            i.numero == val
        )
      );
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "refuser":
        return "bg-red-400 text-black-800";
      case "en cours":
        return "bg-blue-200 text-blue-800";
      case "livrer":
        return "bg-green-200 text-green-800";
      case "annulé":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-7xl bg-gray-50 shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Liste des Commandes
        </h1>
  
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
          </div>
        ) : (
          <div>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                onChange={(e) => filter_date(e.target.value)}
                value={date_commande}
              />
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                onChange={(e) => filter_status(e.target.value)}
              >
                <option value="">Tous les Statuts</option>
                {list_status?.map((s) => (
                  <option key={s.nom} value={s.nom}>
                    {s.nom}
                  </option>
                ))}
              </select>
              <input
                type="text"
                list="browsers"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                onChange={(e) => filter_ville(e.target.value)}
                value={ville}
              />
              <datalist id="browsers">
              {list_villes?.length
                  ? list_villes.map((ville, index) => (
                      <option key={index} value={ville.ville} />
                    ))
                  : null}
              </datalist>
              <input
                type="text"
                placeholder="Rechercher globalement"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                onChange={(e) => filter_global(e.target.value)}
                value={global_find}
              />
            </div>
  
            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-md">
              <table className="min-w-full bg-white border border-gray-300 rounded-2xl text-gray-800">
                <thead className="bg-gray-100">
                  <tr>
                    {['ID Commande', 'Numéro Client', 'Nom Client', 'Ville', 'Nom Produit', 'Statut', 'Prix', 'Date Commande'].map((header) => (
                      <th
                        key={header}
                        className="py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wider text-center border-b"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list_cmd.length > 0 ? (
                    list_cmd.map((i) => (
                      <tr key={i.id_commande} className="hover:bg-gray-50 transition duration-200">
                        <td className="py-3 px-4 text-center border-b">{i.id_commande}</td>
                        <td className="py-3 px-4 text-center border-b">{i.numero}</td>
                        <td className="py-3 px-4 text-center border-b">{i.nom_c}</td>
                        <td className="py-3 px-4 text-center border-b">{i.ville_commande}</td>
                        <td className="py-3 px-4 text-center border-b">{i.nom}</td>
                        <td className="py-3 px-4 text-center border-b">
                          <div className={`px-2 py-1 text-sm rounded-lg ${getStatusColor(i.status)} bg-gray-100`}> 
                            <select
                              onChange={(e) => up_dtae_status(i.id_commande, e.target.value)}
                              className="bg-transparent outline-none text-center w-full"
                            >
                              <option value={i.status}>{i.status}</option>
                              {list_status.map((s) => (
                                <option key={s.nom} value={s.nom}>
                                  {s.nom}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center border-b">{i.prix}</td>
                        <td className="py-3 px-4 text-center border-b">{i.date_commande}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-6 text-center text-gray-500">
                        Aucune commande trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
export default List_commande;
