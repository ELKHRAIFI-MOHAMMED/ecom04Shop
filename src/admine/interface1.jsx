import { useState, useEffect } from "react";
import { compareAsc, format, set } from "date-fns"; // pour la date
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCity,
    FaHome,
    FaDollarSign,
    FaTrashAlt,
    FaEdit,
} from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import * as XLSX from "xlsx"; //pour exportation xlsx
import Select from "react-select";
import {
    get_produit,
    delete_commande,
    add_commandes,
    set_qnt_produit,
    engr_commande,
    get_commandes,
    update_commande,
} from "../redux/thunk.jsx";
import { useDispatch, useSelector } from "react-redux";
import Claster_commande from "./commande_claster";
import "../App.css";
import axios from "axios";

function Add_commande() {
    const [old_qnt, setOld_qnt] = useState(0);
    const [errors, setErrors] = useState({});
    const loading = useSelector((state) => state.loading);
    const [button, setButton] = useState(false); // pour le chnagement de button ajouter et update
    const user = useSelector((state) => state.user);
    const id_user = user.id;
    const [list_villes, setList_villes] = useState([]);
    const commandes = useSelector((state) => state.commandes); //le claster current pour ajouter les commandes
    const [commande, setCommande] = useState({
        id_commande: Date.now().toString(),
        nom_client: "",
        numero_client: "",
        adresse_client: "",
        ville: "",
        ville_id: "",
        prix_livraison: "",
        quntite: 1,
        prix: "",
        commantaire: "",
        produit_id: "",
        nom_produit: "",
        ville_commande: "",
    });
    //////////////////////////////////////////////////////////
    const list_produit = useSelector((stater) => stater.list_produit);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_produit());
        dispatch(get_commandes());
        axios.get("http://localhost:3004/ville").then((res) => {
            if (res.status == 200) {
                res.data.map((i) => {
                    const newVille = {
                        value: i.NAME,
                        label: i.NAME,
                        id: i.id,
                        REF: i.REF,
                        NAME: i.NAME,
                        DELIVERED: i.DELIVERED,
                        RETURNED: i.RETURNED,
                        REFUSED: i.REFUSED,
                    };
                    setList_villes((prevVilles) => {
                        if (
                            !prevVilles.some((ville) => ville.value === i.NAME)
                        ) {
                            return [...prevVilles, newVille];
                        }
                        return prevVilles; // No duplicate added
                    });
                });
                // setList_villes(res.data);
            }
        });
    }, []);
    console.log(list_villes);
    /////////////////////////////////////////////////////////////////////
    const get_value = (e) => {
        setCommande({ ...commande, [e.target.name]: e.target.value });
    };

    const get_valueV = (option) => {
        console.log("option chosi" + option.DELIVERED);
        // setCommande({ ...commande, [e.target.name]: e.target.value });
        const value = option.value;

        if (true) {
            setCommande({
                ...commande,
                ville: value,
                prix_livraison: option.DELIVERED,
                ville_id: option.id,
                ville_commande: value,
            });
        } else {
            setCommande({
                ...commande,
                ville: value,
                prix_livraison: "",
                ville_commande: value,
            });
            console.log("Aucune correspondance trouvée pour la ville saisie.");
        }
    };

    /////////////////////////////////////////////////////////////////////
    const get_value_produit = (e) => {
        if ([e.target.name == "id_produit"]) {
            // setCommande({...commande,[e.target.name]:e.target.value})
            list_produit.map((i) => {
                if (i.id_produit == e.target.value) {
                    setCommande({
                        ...commande,
                        nom_produit: i.nom,
                        produit_id: e.target.value,
                    });
                }
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////

    const add_commande = () => {
        const newErrors = {};
        if (!commande.nom_client)
            newErrors.nom_client = "Le nom du client est requis";
        if (!commande.numero_client)
            newErrors.numero_client = "Le numéro du client est requis";
        if (!commande.adresse_client)
            newErrors.adresse_client = "L'adresse du client est requise";
        if (!commande.ville) newErrors.ville = "La ville est requise";
        if (!commande.prix) newErrors.prix = "Le prix est requis";
        if (!commande.nom_produit)
            newErrors.nom_produit = "Le produit est requis";
        if (!commande.commantaire)
            newErrors.commantaire = "Le commentaire est requis";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const validNumber = /^06||07||05\d{8}$/;
            if (!validNumber.test(commande.numero_client))
                newErrors.numero_client =
                    "Le numéro de client doit être de 10 chiffres et commencer par 0";
            if (Object.keys(newErrors).length === 0) {
                const objQnt = {
                    id_produit: commande.produit_id,
                    action: "ajouter",
                    new_qnt: commande.quntite,
                    old_qnt: 0,
                };
                dispatch(add_commandes(commande));
                dispatch(set_qnt_produit(objQnt));
                setCommande({
                    id_commande: Date.now().toString(),
                    nom_client: "",
                    numero_client: "",
                    adresse_client: "",
                    ville: "",
                    ville_id: "",
                    prix_livraison: "",
                    quntite: 1,
                    prix: "",
                    commantaire: "",
                    produit_id: "",
                    nom_produit: "",
                    ville_commande: "",
                });
                setErrors({});
            }
        }
    };
    const add_commanded = () => {
        if (
            commande.adresse_client != "" &&
            commande.nom_client != "" &&
            commande.commantaire &&
            commande.nom_produit != "" &&
            commande.id_produit != "" &&
            commande.numero_client != "" &&
            commande.prix != "" &&
            commande.quntite != "" &&
            commande.ville != ""
        ) {
            if (commande.prix_livraison == "") {
            } else {
                const validNumber = /^0\d{9}$/;
                if (!validNumber.test(commande.numero_client)) {
                    alert(
                        "Le numéro de client doit être de 10 chiffres et commencer par 0"
                    );
                    return;
                }

                dispatch(add_commandes(commande));
                dispatch(set_qnt_produit(commande.produit_id));
                setCommande({
                    id_commande: Date.now().toString(),
                    nom_client: "",
                    numero_client: "",
                    adresse_client: "",
                    ville: "",
                    ville_id: "",
                    prix_livraison: "",
                    quntite: 1,
                    prix: "",
                    commantaire: "",
                    produit_id: "",
                    nom_produit: "",
                    ville_commande: "",
                });
            }
        } else {
            alert("chi haja khawya");
        }
    };
    console.log(commande);
    //////////////////////////////////////////////////////////////////////////
    const supprimer_commande = (cmd) => {
        const objQnt = {
            id_produit: cmd.produit_id,
            action: "delete",
            new_qnt: 0,
            old_qnt: cmd.quntite,
        };
        dispatch(set_qnt_produit(objQnt));
        dispatch(delete_commande(cmd.id));
    };
    //////////////////////////////////////////////////////////////////////////////
    const edit_commande = (cmd) => {
        setOld_qnt(cmd.quntite);
        setCommande({
            id: cmd.id,
            id_commande: cmd.id_commande,
            nom_client: cmd.nom_client,
            numero_client: cmd.numero_client,
            adresse_client: cmd.adresse_client,
            ville: cmd.ville,
            prix_livraison: cmd.prix_livraison,
            quntite: cmd.quntite,
            prix: cmd.prix,
            commantaire: cmd.commantaire,
            produit_id: cmd.produit_id,
            nom_produit: cmd.nom_produit,
        });
        setButton(true);
    };

    /////////////////////////////////////////////////////////
    const upDate_commande = () => {
        const objQnt = {
            id_produit: commande.produit_id,
            action: "edit",
            new_qnt: commande.quntite,
            old_qnt: old_qnt,
        };
        dispatch(set_qnt_produit(objQnt));
        dispatch(update_commande(commande));

        setCommande({
            id_commande: Date.now().toString(),
            nom_client: "",
            numero_client: "",
            adresse_client: "",
            ville: "",
            ville_id: "",
            prix_livraison: "",
            quntite: 1,
            prix: "",
            commantaire: "",
            produit_id: "",
            nom_produit: "",
            ville_commande: "",
        });
        setOld_qnt(0);
        setButton(false);
    };
    /////////////////////////////////////////
    const export_xl_data = () => {
        const data_exp = commandes.map((i) => ({
            "CODE SUIVI": i.id_commande,
            DESTINATAIRE: i.nom_client,
            TELEPHONE: i.numero_client,
            ADRESSE: i.adresse_client,
            PRIX: i.prix,
            VILLE: i.ville,
            COMMENTAIRE: i.commantaire,
            QUARTIER: "",
            NATURE: "",
        }));

        // Convert customized data to sheet
        const worksheet = XLSX.utils.json_to_sheet(data_exp);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, worksheet, "CustomizedSheet");

        // Write the new Excel file
        XLSX.writeFile(newWorkbook, "customized_file.xlsx");
    };
    /////////////////////////////////////////////////
    const enregistrer_commande = () => {
        export_xl_data();
        dispatch(engr_commande(commandes));
    };
    //////////////////////////////////////
    const enregistrer_commande_ozon = () => {
        commandes.map((i) => {
            const formData = new FormData();
            formData.append("tracking-number", i.id_commande);
            formData.append("parcel-receiver", i.nom_client);
            formData.append("parcel-phone", i.numero_client);
            formData.append("parcel-city", i.ville_id);
            formData.append("parcel-address", i.adresse_client);
            formData.append("parcel-note", i.commantaire);
            formData.append("parcel-price", i.prix);
            formData.append("parcel-nature", i.nom_produit);
            formData.append("parcel-stock", 0);
            formData.append("products", [{ ref: "", qnty: 2 }]);
            console.log("form datet ",formData)
            axios
                .post(
                    "https://api.ozonexpress.ma/customers/24539/002b25-110795-e1cdcf-be7ffc-660fc2/add-parcel",
                    formData
                )
                .then((res) => {
                    if (res) {
                        if (res.data["ADD-PARCEL"]?.["RESULT"] === "SUCCESS") {
                            console.log("✅ Résultat :", res.data);
                            dispatch(engr_commande([i]))
                        } else {

                            console.log("✅ Résultat :", res.data);
                        }
                    }
                })

        });
       // enregistrer_commande();
    };
    console.log(commandes);
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {loading === true || user === undefined ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-center text-blue-700">
                        Formulaire de Commande
                    </h1>
                    <form className="max-w-11/12 mx-auto bg-white p-8 rounded-xl shadow-sm space-y-6 border border-gray-100">
                        {/* Groupe: Nom du client et Numéro du client */}
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="relative z-0 w-full md:w-1/2 group">
                                <input
                                    type="text"
                                    value={commande.nom_client}
                                    id="nom_client"
                                    name="nom_client"
                                    onChange={get_value}
                                    className="block py-2.5 px-4 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="nom_client"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 bg-white px-1 peer-focus:px-1 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Nom du client
                                </label>
                                {errors.nom_client && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.nom_client}
                                    </p>
                                )}
                            </div>

                            <div className="relative z-0 w-full md:w-1/2 group">
                                <input
                                    type="text"
                                    value={commande.numero_client}
                                    id="numero_client"
                                    name="numero_client"
                                    onChange={get_value}
                                    className="block py-2.5 px-4 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="numero_client"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 bg-white px-1 peer-focus:px-1 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Numéro du client
                                </label>
                                {errors.numero_client && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.numero_client}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Groupe: Adresse email et Ville */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="adresse_client"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Adresse du client
                                </label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={commande.adresse_client}
                                        id="adresse_client"
                                        name="adresse_client"
                                        onChange={get_value}
                                        className="block w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    />
                                </div>
                                {errors.adresse_client && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.adresse_client}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="ville"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Ville
                                </label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCity className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Select
                                        options={list_villes}
                                        placeholder="Choisir une ville"
                                        onChange={get_valueV}
                                        className="block w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    />
                                </div>
                                {errors.ville && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.ville}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Groupe: Prix et Produit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="prix"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Prix
                                </label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={commande.prix}
                                        id="prix"
                                        name="prix"
                                        onChange={get_value}
                                        className="block w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    />
                                </div>
                                {errors.prix && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.prix}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="produit_id"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Produit
                                </label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineProductionQuantityLimits className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="produit_id"
                                        name="produit_id"
                                        onChange={get_value_produit}
                                        className="block w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                    >
                                        <option value="">
                                            Choisir un produit
                                        </option>
                                        {list_produit.length > 0 ? (
                                            list_produit.map((i) => (
                                                <option
                                                    key={i.id_produit}
                                                    value={i.id_produit}
                                                    disabled={i.quantite === 0}
                                                    className="text-gray-700"
                                                >
                                                    {`${i.nom} - Quantité: ${i.quantite}`}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">
                                                Aucun produit disponible
                                            </option>
                                        )}
                                    </select>
                                </div>
                                {errors.nom_produit && (
                                    <p className="mt-2 text-sm text-red-500 font-medium">
                                        {errors.nom_produit}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Commentaire */}
                        <div>
                            <div className="mb-6">
                                <label
                                    htmlFor="commantaire"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Commentaire
                                </label>
                                <input
                                    type="text"
                                    value={commande.commantaire}
                                    id="commantaire"
                                    name="commantaire"
                                    onChange={get_value}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="commantaire"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Quantite
                                </label>
                                <input
                                    type="number"
                                    value={commande.quntite}
                                    id="quntite"
                                    name="quntite"
                                    onChange={get_value}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="flex space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={add_commande}
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-colors"
                            >
                                Ajouter
                            </button>
                            {button && (
                                <button
                                    type="button"
                                    onClick={upDate_commande}
                                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 transition-colors"
                                >
                                    Mettre à jour
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Tableau */}
                    <div className="mt-8">
                        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Client
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Téléphone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Ville
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Prix
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Produit
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Adresse
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Commentaire
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {commandes.map((commande, index) => (
                                    <tr
                                        key={commande.id_commande}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.id_commande}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.nom_client}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.numero_client}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.ville}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.prix} DH
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.nom_produit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.adresse_client}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {commande.commantaire}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    supprimer_commande(commande)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                                title="Supprimer"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    edit_commande(commande)
                                                }
                                                className="ml-2 text-blue-600 hover:text-blue-900"
                                                title="Modifier"
                                            >
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={export_xl_data}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Exporter
                            </button>
                            <button
                                onClick={enregistrer_commande}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Enregistrer
                            </button>
                            <button
                                onClick={enregistrer_commande_ozon}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Ozon
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Add_commande;
