import { useState } from 'react';
import { FoodItem, FoodCategory, FOOD_CATEGORIES } from '../types/index';
import { getAriaLabel } from '../utils/index';

interface FavoriteFoodProps {
  favoriteFood: FoodItem[];
  onAdd: (name: string, category?: FoodCategory) => void;
  onUpdate: (id: string, name: string, category?: FoodCategory) => void;
  onRemove: (id: string) => void;
}

export const FavoriteFood = ({
  favoriteFood,
  onAdd,
  onUpdate,
  onRemove,
}: FavoriteFoodProps) => {
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCategory, setNewFoodCategory] = useState<FoodCategory | ''>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<FoodCategory | ''>('');

  const handleAdd = () => {
    if (newFoodName.trim()) {
      onAdd(newFoodName, newFoodCategory || undefined);
      setNewFoodName('');
      setNewFoodCategory('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const startEdit = (food: FoodItem) => {
    setEditingId(food.id);
    setEditName(food.name);
    setEditCategory(food.category || '');
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(editingId, editName, editCategory || undefined);
      setEditingId(null);
      setEditName('');
      setEditCategory('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCategory('');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="card">
      <h2 className="section-header">
        <span className="text-2xl">😋</span>
        Favorite Foods
      </h2>
      <p className="text-gray-600 mb-4">
        Add foods that this person enjoys eating. You can organize them by meal type.
      </p>

      {/* Add new favorite food */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="new-favorite-food" className="sr-only">
              Food name
            </label>
            <input
              id="new-favorite-food"
              type="text"
              placeholder="Enter a favorite food..."
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              aria-describedby="favorite-food-help"
            />
          </div>
          <div className="sm:w-40">
            <label htmlFor="new-favorite-category" className="sr-only">
              Meal category
            </label>
            <select
              id="new-favorite-category"
              value={newFoodCategory}
              onChange={(e) => setNewFoodCategory(e.target.value as FoodCategory | '')}
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
          <button
            onClick={handleAdd}
            disabled={!newFoodName.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={getAriaLabel('Add', 'favorite food')}
          >
            Add Food
          </button>
        </div>
        <p id="favorite-food-help" className="text-sm text-gray-500 mt-2">
          Press Enter to quickly add, or select a meal category for better organization.
        </p>
      </div>

      {/* List of favorite foods */}
      {favoriteFood.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl block mb-2">🍽️</span>
          <p>No favorite foods added yet.</p>
          <p className="text-sm">Start by adding foods this person enjoys!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteFood.map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {editingId === food.id ? (
                <div className="flex flex-1 gap-3 items-center">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    className="input-field flex-1"
                    autoFocus
                    aria-label={getAriaLabel('Edit', food.name)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as FoodCategory | '')}
                    className="input-field w-32"
                  >
                    <option value="">Any meal</option>
                    {FOOD_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
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
                    <span className="font-medium text-gray-800">{food.name}</span>
                    {food.category && (
                      <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                        {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(food)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      aria-label={getAriaLabel('Edit', food.name)}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onRemove(food.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      aria-label={getAriaLabel('Remove', food.name)}
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
