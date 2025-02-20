import { useState } from "react";
import { useDispatch } from "react-redux";
import { compareAsc, format } from "date-fns"; // pour la date
import { add_depences } from "../redux/thunk";

function Ajouter_depence() {
  const dispatch = useDispatch();
  const [typ_input, setTyp_input] = useState("");
  const [depence, setDepence] = useState({
    nom: "",
    description: "",
    montant:'',
    date_depence:format(new Date(), "yyyy-MM-dd"),
  });
  const [errors, setErrors] = useState({});
 console.log(depence)
  const getValue = (e) => {
    if (e.target.type === "file") {
      setDepence({ ...depence, [e.target.name]: e.target.files[0] });
    } else {
      setDepence({ ...depence, [e.target.name]: e.target.value });
    }
  };

  // Validation logic
  const validateForm = () => {
    let tempErrors = {};
    if (!depence.nom) {
      tempErrors.nom = "Le nom est requis";
    }
    if (!depence.montant) {
      tempErrors.montant = "Le montant est requis";
    }
    if (!depence.description) {
      tempErrors.description = "La description est requise";
    }
    if (typ_input === "file" && !depence.description) {
      tempErrors.description = "Veuillez sélectionner un fichier";
    }
    return tempErrors;
  };

  const Ajouter = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Dispatch action if no errors
      dispatch(add_depences(depence));
      setDepence({
        nom: "",
        description: "",
        montant:'',
        date_depence: format(new Date(), "yyyy-MM-dd"),
      })
    }
  };

  return (
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">
        Ajouter les dépenses
      </h1>

      <form>
        {/* Nom */}
        <div class="mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={depence.nom}
            id="nom"
            placeholder="Montant de dépense"
            class={`mt-1 p-2 block w-full border ${
              errors.nom ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            onChange={getValue}
          />
          {errors.nom && <p class="text-red-500 text-sm">{errors.nom}</p>}
        </div>

        <div class="mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">
            Montant
          </label>
          <input
            type="text"
            name="montant"
            value={depence.montant}
            id="nom"
            placeholder="Nom de dépense"
            class={`mt-1 p-2 block w-full border ${
              errors.nom ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            onChange={getValue}
          />
          {errors.montant && <p class="text-red-500 text-sm">{errors.montant}</p>}
        </div>

        {/* Description */}
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <input
                value="text"
                type="radio"
                id="radio1"
                name="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onClick={(e) => {
                  setTyp_input(e.target.value);
                }}
              />
              <label
                for="radio1"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Texte
              </label>
            </div>
            <div class="flex items-center">
              <input
                value="file"
                type="radio"
                id="radio2"
                name="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onClick={(e) => {
                  setTyp_input(e.target.value);
                }}
              />
              <label
                for="radio2"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Fichier
              </label>
            </div>
          </div>

          {/* Textarea for description */}
          {typ_input === "text" && (
            <textarea
              name="description"
              value={depence.description}
              class={`mt-3 p-2 block w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Description de la dépense"
              onChange={getValue}
            ></textarea>
          )}

          {/* File input for description */}
          {typ_input === "file" && (
            <input
              type="file"
              name="description"
              class={`mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                errors.description ? "border-red-500" : ""
              }`}
              onChange={getValue}
            />
          )}
          {errors.description && (
            <p class="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={Ajouter}
          class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Ajouter_depence;
