<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'numero' => 'required|integer',
                // 'nom' => 'required|string|max:255',
                // 'ville' => 'required',
                // 'adresse' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'numero.required' => 'Le numéro est obligatoire.',
            'numero.integer' => 'Le numéro doit être un nombre entier.',
            //'numero.regex' => 'Le numéro doit commencer par 06 ou 07 et contenir exactement 10 chiffres.',
            // Messages personnalisés pour d'autres règles de validation si nécessaire
        ];
    }
}
