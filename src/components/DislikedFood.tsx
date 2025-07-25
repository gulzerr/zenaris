import { useState } from "react";
import {
  DislikedFood as DislikedFoodType,
  FoodCategory,
  DislikeSeverity,
  FOOD_CATEGORIES,
  DISLIKE_SEVERITIES,
} from "../types/index";
import {
  getAriaLabel,
  getSeverityColor,
  getSeverityIcon,
} from "../utils/index";

interface DislikedFoodProps {
  dislikedFood: DislikedFoodType[];
  onAdd: (
    name: string,
    severity: DislikeSeverity,
    category?: FoodCategory
  ) => void;
  onUpdate: (
    id: string,
    name: string,
    severity: DislikeSeverity,
    category?: FoodCategory
  ) => void;
  onRemove: (id: string) => void;
}

export const DislikedFood = ({
  dislikedFood,
  onAdd,
  onUpdate,
  onRemove,
}: DislikedFoodProps) => {
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodCategory, setNewFoodCategory] = useState<FoodCategory | "">("");
  const [newFoodSeverity, setNewFoodSeverity] =
    useState<DislikeSeverity>("mild");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState<FoodCategory | "">("");
  const [editSeverity, setEditSeverity] = useState<DislikeSeverity>("mild");

  const handleAdd = () => {
    if (newFoodName.trim()) {
      onAdd(newFoodName, newFoodSeverity, newFoodCategory || undefined);
      setNewFoodName("");
      setNewFoodCategory("");
      setNewFoodSeverity("mild");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const startEdit = (food: DislikedFoodType) => {
    setEditingId(food.id);
    setEditName(food.name);
    setEditCategory(food.category || "");
    setEditSeverity(food.severity);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(editingId, editName, editSeverity, editCategory || undefined);
      setEditingId(null);
      setEditName("");
      setEditCategory("");
      setEditSeverity("mild");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCategory("");
    setEditSeverity("mild");
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className="card">
      <h2 className="section-header">
        <span className="text-2xl">👎</span>
        Disliked Foods
      </h2>
      <p className="text-gray-600 mb-4">
        Add foods this person dislikes or refuses to eat. Specify how strong
        their dislike is.
      </p>

      {/* Add new disliked food */}
      <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="new-disliked-food" className="sr-only">
                Food name
              </label>
              <input
                id="new-disliked-food"
                type="text"
                placeholder="Enter a disliked food..."
                value={newFoodName}
                onChange={(e) => setNewFoodName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field"
                aria-describedby="disliked-food-help"
              />
            </div>
            <div className="sm:w-40">
              <label htmlFor="new-disliked-category" className="sr-only">
                Meal category
              </label>
              <select
                id="new-disliked-category"
                value={newFoodCategory}
                onChange={(e) =>
                  setNewFoodCategory(e.target.value as FoodCategory | "")
                }
                className="input-field"
              >
                <option value="">Any meal</option>
                {FOOD_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label
                htmlFor="new-disliked-severity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dislike Level
              </label>
              <select
                id="new-disliked-severity"
                value={newFoodSeverity}
                onChange={(e) =>
                  setNewFoodSeverity(e.target.value as DislikeSeverity)
                }
                className="input-field"
              >
                {DISLIKE_SEVERITIES.map((severity) => (
                  <option key={severity.value} value={severity.value}>
                    {severity.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAdd}
              disabled={!newFoodName.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={getAriaLabel("Add", "disliked food")}
            >
              Add Food
            </button>
          </div>
        </div>
        <p id="disliked-food-help" className="text-sm text-gray-500 mt-2">
          Be specific about the dislike level to help caregivers make better
          meal decisions.
        </p>
      </div>

      {/* List of disliked foods */}
      {dislikedFood.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl block mb-2">🚫</span>
          <p>No disliked foods added yet.</p>
          <p className="text-sm">Add foods this person prefers to avoid.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dislikedFood.map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {editingId === food.id ? (
                <div className="flex flex-1 gap-3 items-center flex-wrap">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    className="input-field flex-1 min-w-0"
                    autoFocus
                    aria-label={getAriaLabel("Edit", food.name)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value as FoodCategory | "")
                    }
                    className="input-field w-32"
                  >
                    <option value="">Any meal</option>
                    {FOOD_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editSeverity}
                    onChange={(e) =>
                      setEditSeverity(e.target.value as DislikeSeverity)
                    }
                    className="input-field w-40"
                  >
                    {DISLIKE_SEVERITIES.map((severity) => (
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-800">
                        {food.name}
                      </span>
                      {food.category && (
                        <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                          {
                            FOOD_CATEGORIES.find(
                              (c) => c.value === food.category
                            )?.label
                          }
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(
                          food.severity
                        )}`}
                      >
                        <span className="mr-1">
                          {getSeverityIcon(food.severity)}
                        </span>
                        {
                          DISLIKE_SEVERITIES.find(
                            (s) => s.value === food.severity
                          )?.label
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(food)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      aria-label={getAriaLabel("Edit", food.name)}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onRemove(food.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      aria-label={getAriaLabel("Remove", food.name)}
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
