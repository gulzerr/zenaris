import { useState } from "react";
import {
  FoodAllergy,
  AllergySeverity,
  COMMON_ALLERGIES,
  ALLERGY_SEVERITIES,
} from "../types/index";
import {
  getAriaLabel,
  getSeverityColor,
  getSeverityIcon,
} from "../utils/index";

interface FoodAllergiesProps {
  allergies: FoodAllergy[];
  onAdd: (name: string, severity: AllergySeverity, isCommon?: boolean) => void;
  onUpdate: (id: string, name: string, severity: AllergySeverity) => void;
  onRemove: (id: string) => void;
}

export const FoodAllergies = ({
  allergies,
  onAdd,
  onUpdate,
  onRemove,
}: FoodAllergiesProps) => {
  const [newAllergyName, setNewAllergyName] = useState("");
  const [newAllergySeverity, setNewAllergySeverity] =
    useState<AllergySeverity>("mild-intolerance");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSeverity, setEditSeverity] =
    useState<AllergySeverity>("mild-intolerance");

  const handleAdd = () => {
    if (newAllergyName.trim()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isCommon = COMMON_ALLERGIES.includes(newAllergyName as any);
      onAdd(newAllergyName, newAllergySeverity, isCommon);
      setNewAllergyName("");
      setNewAllergySeverity("mild-intolerance");
    }
  };

  const handleCommonAllergyAdd = (allergyName: string) => {
    onAdd(allergyName, newAllergySeverity, true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const startEdit = (allergy: FoodAllergy) => {
    setEditingId(allergy.id);
    setEditName(allergy.name);
    setEditSeverity(allergy.severity);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(editingId, editName, editSeverity);
      setEditingId(null);
      setEditName("");
      setEditSeverity("mild-intolerance");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditSeverity("mild-intolerance");
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const availableCommonAllergies = COMMON_ALLERGIES.filter(
    (commonAllergy) =>
      !allergies.some((allergy) => allergy.name === commonAllergy)
  );

  return (
    <div className="card border-red-200 bg-red-50">
      <h2 className="section-header text-red-800">
        <span className="text-2xl">🚨</span>
        Food Allergies & Intolerances
      </h2>
      <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
        <p className="text-red-800 font-medium mb-2">
          ⚠️ Critical Medical Information
        </p>
        <p className="text-red-700 text-sm">
          This section contains vital health information. Please be accurate and
          thorough when adding allergies and intolerances.
        </p>
      </div>

      {/* Quick add common allergies */}
      {availableCommonAllergies.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Quick Add Common Allergies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {availableCommonAllergies.map((allergyName) => (
              <button
                key={allergyName}
                onClick={() => handleCommonAllergyAdd(allergyName)}
                className="text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-colors text-sm"
                aria-label={getAriaLabel("Add common allergy", allergyName)}
              >
                {allergyName}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label
              htmlFor="common-allergy-severity"
              className="text-sm font-medium text-gray-700"
            >
              Severity for quick-add:
            </label>
            <select
              id="common-allergy-severity"
              value={newAllergySeverity}
              onChange={(e) =>
                setNewAllergySeverity(e.target.value as AllergySeverity)
              }
              className="input-field w-48"
            >
              {ALLERGY_SEVERITIES.map((severity) => (
                <option key={severity.value} value={severity.value}>
                  {severity.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Add custom allergy */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-red-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Add Custom Allergy/Intolerance
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="new-allergy-name" className="sr-only">
                Allergy or intolerance name
              </label>
              <input
                id="new-allergy-name"
                type="text"
                placeholder="Enter allergy or intolerance..."
                value={newAllergyName}
                onChange={(e) => setNewAllergyName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field"
                aria-describedby="allergy-help"
              />
            </div>
            <div className="sm:w-48">
              <label
                htmlFor="new-allergy-severity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Severity Level
              </label>
              <select
                id="new-allergy-severity"
                value={newAllergySeverity}
                onChange={(e) =>
                  setNewAllergySeverity(e.target.value as AllergySeverity)
                }
                className="input-field"
              >
                {ALLERGY_SEVERITIES.map((severity) => (
                  <option key={severity.value} value={severity.value}>
                    {severity.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAdd}
              disabled={!newAllergyName.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={getAriaLabel("Add", "custom allergy")}
            >
              Add Allergy
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p id="allergy-help" className="mb-2">
              <strong>Severity levels:</strong>
            </p>
            <ul className="space-y-1 ml-4">
              {ALLERGY_SEVERITIES.map((severity) => (
                <li key={severity.value} className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(
                      severity.value
                    )}`}
                  >
                    {getSeverityIcon(severity.value)} {severity.label}
                  </span>
                  <span className="text-xs">{severity.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* List of allergies */}
      {allergies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl block mb-2">🏥</span>
          <p>No allergies or intolerances recorded.</p>
          <p className="text-sm">
            Add any known food allergies or intolerances above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-red-200 hover:border-red-300 transition-colors"
            >
              {editingId === allergy.id ? (
                <div className="flex flex-1 gap-3 items-center flex-wrap">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    className="input-field flex-1 min-w-0"
                    autoFocus
                    aria-label={getAriaLabel("Edit", allergy.name)}
                  />
                  <select
                    value={editSeverity}
                    onChange={(e) =>
                      setEditSeverity(e.target.value as AllergySeverity)
                    }
                    className="input-field w-48"
                  >
                    {ALLERGY_SEVERITIES.map((severity) => (
                      <option key={severity.value} value={severity.value}>
                        {severity.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800 p-1"
                      aria-label="Save changes"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-600 hover:text-gray-800 p-1"
                      aria-label="Cancel editing"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium text-gray-800 text-lg">
                        {allergy.name}
                      </span>
                      {allergy.isCommon && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          Common Allergy
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 text-sm rounded-full border font-medium ${getSeverityColor(
                          allergy.severity
                        )}`}
                      >
                        <span className="mr-1">
                          {getSeverityIcon(allergy.severity)}
                        </span>
                        {
                          ALLERGY_SEVERITIES.find(
                            (s) => s.value === allergy.severity
                          )?.label
                        }
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {
                        ALLERGY_SEVERITIES.find(
                          (s) => s.value === allergy.severity
                        )?.description
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(allergy)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      aria-label={getAriaLabel("Edit", allergy.name)}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onRemove(allergy.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      aria-label={getAriaLabel("Remove", allergy.name)}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
