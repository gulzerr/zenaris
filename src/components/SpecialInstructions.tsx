import { useState, useEffect } from "react";
import { validateMaxLength } from "../utils/index";

interface SpecialInstructionsProps {
  specialInstructions: string;
  onUpdate: (instructions: string) => void;
}

const MAX_LENGTH = 500;

export const SpecialInstructions = ({
  specialInstructions,
  onUpdate,
}: SpecialInstructionsProps) => {
  const [localInstructions, setLocalInstructions] =
    useState(specialInstructions);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setLocalInstructions(specialInstructions);
  }, [specialInstructions]);

  const handleChange = (value: string) => {
    setLocalInstructions(value);
    const valid = validateMaxLength(value, MAX_LENGTH);
    setIsValid(valid);

    if (valid) {
      onUpdate(value);
    }
  };

  const remainingChars = MAX_LENGTH - localInstructions.length;
  const isNearLimit = remainingChars <= 50;

  const exampleInstructions = [
    "Prefers soft textures due to dental issues",
    "Enjoys warm meals, dislikes cold food",
    "Kosher dietary requirements",
    "Needs food cut into small pieces",
    "Prefers mild flavors, no spicy food",
    "Vegetarian for religious reasons",
    "Needs thickened liquids for swallowing safety",
    "Prefers familiar comfort foods",
  ];

  const addExample = (example: string) => {
    const newText = localInstructions
      ? `${localInstructions}\n• ${example}`
      : `• ${example}`;

    if (validateMaxLength(newText, MAX_LENGTH)) {
      handleChange(newText);
    }
  };

  return (
    <div className="card">
      <h2 className="section-header">
        <span className="text-2xl">📝</span>
        Special Instructions
      </h2>
      <p className="text-gray-600 mb-4">
        Add any additional information about meal preferences, dietary
        restrictions, or special considerations.
      </p>

      {/* Quick examples */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Quick Add Common Instructions:
        </h3>
        <div className="flex flex-wrap gap-2">
          {exampleInstructions.map((example, index) => (
            <button
              key={index}
              onClick={() => addExample(example)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-300"
              disabled={
                !validateMaxLength(
                  localInstructions + `\n• ${example}`,
                  MAX_LENGTH
                )
              }
            >
              + {example}
            </button>
          ))}
        </div>
      </div>

      {/* Text area */}
      <div className="relative">
        <label htmlFor="special-instructions" className="sr-only">
          Special instructions and dietary considerations
        </label>
        <textarea
          id="special-instructions"
          value={localInstructions}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter special instructions, texture preferences, cultural/religious restrictions, temperature preferences, or any other important meal considerations..."
          className={`input-field min-h-32 resize-y ${
            !isValid ? "border-red-500 focus:ring-red-500" : ""
          }`}
          aria-describedby="instructions-help instructions-count"
          maxLength={MAX_LENGTH}
        />

        {/* Character count */}
        <div
          id="instructions-count"
          className={`absolute bottom-3 right-3 text-sm ${
            isNearLimit ? "text-orange-600" : "text-gray-500"
          } ${!isValid ? "text-red-600" : ""}`}
        >
          {remainingChars} characters remaining
        </div>
      </div>

      {/* Help text */}
      <div id="instructions-help" className="mt-3 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Examples of helpful information:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            <strong>Texture:</strong> "Prefers soft foods" or "Needs pureed
            consistency"
          </li>
          <li>
            <strong>Temperature:</strong> "Enjoys warm meals" or "Prefers room
            temperature drinks"
          </li>
          <li>
            <strong>Cultural/Religious:</strong> "Halal requirements" or "No
            pork products"
          </li>
          <li>
            <strong>Medical:</strong> "Low sodium diet" or "Diabetic-friendly
            portions"
          </li>
          <li>
            <strong>Behavioral:</strong> "Eats better with familiar caregivers"
            or "Prefers quiet dining environment"
          </li>
        </ul>
      </div>

      {/* Validation message */}
      {!isValid && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            ⚠️ Instructions exceed the {MAX_LENGTH} character limit. Please
            shorten your text.
          </p>
        </div>
      )}

      {/* Summary when content exists */}
      {localInstructions.trim() && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Instructions Summary:
          </h4>
          <div className="text-sm text-blue-700 whitespace-pre-wrap">
            {localInstructions}
          </div>
        </div>
      )}
    </div>
  );
};
