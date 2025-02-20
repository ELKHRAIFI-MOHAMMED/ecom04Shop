import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

//lucid reqct icons
import { FaCalendar } from "react-icons/fa";
import { SearchIcon } from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { get_cmd_calculs, get_depences } from "../redux/thunk";

function Accueil() {
  const dispatch = useDispatch();
  const list_cmd_calcul = useSelector((state) => state.list_cmd_calcul);

  console.log(list_cmd_calcul);
  useEffect(() => {
    dispatch(get_cmd_calculs());
  }, []);
  const list_depence = useSelector((state) => state.list_depence);
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(get_depences());
  }, []);
  console.log(list_depence);
  const [nb_commandes, setNb_commandes] = useState(0);
  const [nb_commandes_livrer, setNb_commandes_livrer] = useState(0);
  const [nb_commandes_en_coure, setNb_commandes_en_coure] = useState(0);
  const [nb_commandes_annuler, setNb_commandes_annuler] = useState(0);
  const [nb_commandes_refuser, setNb_commandes_refuser] = useState(0);
  ///////////////////////////////////////////////////////////////////
  const [chiffre_affaire, setchiffre_affaire] = useState(0);
  const [frais_livraison, setFrais_livraison] = useState(0);
  const [frais_depence, setFrais_depence] = useState(0);
  const [profite, setProfite] = useState(0);

  const calculer = () => {
    const date1 = range[0].startDate.toISOString().split("T")[0]; // pour la forme de date "YYYY-MM-DD"
    const date2 = range[0].endDate.toISOString().split("T")[0];
    const new_list = list_cmd_calcul.filter(
      (i) => i.date_commande >= date1 && i.date_commande <= date2
    );
    setNb_commandes(new_list.length);
    ///////////////////////////////
    var livrer = 0;
    var en_coure = 0;
    var annuler = 0;
    var refuser = 0;
    var chiffre = 0;
    var frais_livraison = 0;
    var frais_produit = 0;
    var chifre_livrer=0;
    new_list.map((i) => {
      // frais_produit+=(i.prix_produit*i.quantite)
      switch (i.status) {
        case "livrer":
          livrer += 1;
          chiffre += parseInt(i.prix, 10); // pour le chiffre d'affaire
          frais_livraison += parseInt(i.prix_livraison);
          frais_produit += parseInt(i.prix_produit * i.quantite);
          chifre_livrer+=parseInt(i.prix, 10);
          break;
        case "annuler":
          annuler += 1;
          frais_livraison += parseInt(i.prix_retour, 10);
          chiffre += parseInt(i.prix, 10);
          break;
        case "en coure":
          en_coure += 1;
          chiffre += parseInt(i.prix, 10);
          break;
        case "refuser":
          refuser += 1;
          frais_livraison += parseInt(i.prix_retour, 10);
          chiffre += parseInt(i.prix, 10);
          break;
        default:
          break;
      }
    });
    const new_list_depences = list_depence.filter(
      (i) => i.date_depence >= date1 && i.date_depence <= date2
    );
    console.log("list depence", new_list_depences);
    var depences = 0;
    new_list_depences.map((i) => {
      depences += i.montant;
    });

    alert(frais_produit);
    console.log("new list :", new_list);
    setNb_commandes_livrer(livrer);
    setNb_commandes_refuser(refuser);
    setNb_commandes_annuler(annuler);
    setNb_commandes_en_coure(en_coure);
    setchiffre_affaire(parseInt(chiffre + depences));
    setFrais_livraison(frais_livraison);
    setFrais_depence(parseInt(depences));
    setProfite(chifre_livrer - frais_livraison - depences - frais_produit);
  };

  ///////////////////////////////////
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log("date start", range[0].startDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
  };

  const applyPreset = (preset) => {
    let startDate;
    let endDate = new Date();

    switch (preset) {
      case "Aujourd'hui":
        startDate = endDate;
        break;
      case "Hier":
        startDate = addDays(endDate, -1);
        endDate = startDate;
        break;
      case "7 derniers jours":
        startDate = addDays(endDate, -7);
        break;
      case "30 derniers jours":
        startDate = addDays(endDate, -30);
        break;
      case "Ce mois":
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case "Le mois dernier":
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        break;
      default:
        return;
    }

    setRange([{ startDate, endDate, key: "selection" }]);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-100 min-h-screen">
        {loading === true  ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      ) : (<div>
          <div className="relative   py-8 bg-gray-100 ">
        {/* Barre compacte de date */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md max-w-xl mx-auto cursor-pointer hover:shadow-lg transition duration-200">
          {/* Calendar Range */}
          <div
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaCalendar className="text-blue-500 w-5 h-5" />
            <span className="text-sm font-semibold text-gray-600">
              {range[0].startDate.toLocaleDateString()} -{" "}
              {range[0].endDate.toLocaleDateString()}
            </span>
          </div>

          {/* Search Button */}
          <button
            aria-label="Search for selected date range"
            className="w-16 h-10 bg-orange-500 hover:bg-orange-400 focus:outline-none flex items-center justify-center rounded-lg transition duration-300"
            onClick={() => calculer()}
          >
            <SearchIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Calendrier déroulant */}
        {isOpen && (
          <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-full max-w-4xl p-6 z-50">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Liste des préréglages */}
              <div className="w-full md:w-1/3 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md">
                <ul className="space-y-3 text-blue-600 font-medium">
                  {[
                    "Aujourd'hui",
                    "Hier",
                    "7 derniers jours",
                    "30 derniers jours",
                    "Ce mois",
                    "Le mois dernier",
                  ].map((label) => (
                    <li
                      key={label}
                      onClick={() => applyPreset(label)}
                      className="cursor-pointer hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Composant de sélection de dates */}
              <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={true}
                  ranges={range}
                  rangeColors={["#4C9AFF"]}
                  className="text-gray-700 w-3/4 "
                />
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>
          {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
        </style>
      </div>
      {/* Section des statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: "Profit", value: profite, bg: "bg-teal-500" },
          {
            label: "Chiffre d'affaire",
            value: chiffre_affaire,
            bg: "bg-green-500",
          },
          { label: "Total Commandes", value: nb_commandes, bg: "bg-blue-500" },
          {
            label: "Frais de Livraison",
            value: frais_livraison,
            bg: "bg-purple-500",
          },
          {
            label: "Dépenses",
            value: frais_depence,
            /*icon: "💸",*/ color: "bg-reed-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-white ${item.bg} flex flex-col items-center`}
          >
            <p className="text-xl font-semibold">{item.label}</p>
            <p className="text-4xl font-bold mt-3">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Section des commandes détaillées */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Détails des Commandes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Commandes Livrées",
              value: nb_commandes_livrer,
              icon: "✔️",
              color: "text-green-500",
            },
            {
              label: "Commandes en cours",
              value: nb_commandes_en_coure,
              icon: "⏳",
              color: "text-yellow-500",
            },
            {
              label: "Commandes annulées",
              value: nb_commandes_annuler,
              icon: "❌",
              color: "text-red-500",
            },
            {
              label: "Commandes refusées",
              value: nb_commandes_refuser,
              icon: "🚫",
              color: "text-gray-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className=" p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 "
            >
              <div className="flex items-center space-x-4 ">
                <span className={`text-4xl ${item.color}`}>{item.icon}</span>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="bg-gray-50 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Graphes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Statut des Commandes
            </h2>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["Livrées", "En cours", "Retours"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [
                    nb_commandes_livrer,
                    nb_commandes_en_coure,
                    nb_commandes_refuser + nb_commandes_annuler,
                  ],
                  color: ["#3B82F6"],
                },
              ]}
              width={500}
              height={300}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Répartition des Commandes
            </h2>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: nb_commandes_refuser,
                      label: "Refusées",
                      color: "#FBBF24", // Orange doux
                    },
                    {
                      id: 1,
                      value: nb_commandes_annuler,
                      label: "Annulées",
                      color: "#EF4444", // Rouge clair
                    },
                    {
                      id: 2,
                      value: nb_commandes_en_coure,
                      label: "En cours",
                      color: "#3B82F6", // Bleu clair
                    },
                    {
                      id: 3,
                      value: nb_commandes_livrer,
                      label: "Livrées",
                      color: "#10B981", // Vert doux
                    },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
      </div>)}

    </div>
  );
}

export default Accueil;
