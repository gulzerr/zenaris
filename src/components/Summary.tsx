import { MealPreferences, FOOD_CATEGORIES, ALLERGY_SEVERITIES, DISLIKE_SEVERITIES } from '../types/index';
import { getSeverityColor, getSeverityIcon } from '../utils/index';

interface SummaryProps {
  preferences: MealPreferences;
  onReset: () => void;
}

export const Summary = ({ preferences, onReset }: SummaryProps) => {
  const { favoriteFood, dislikedFood, allergies, specialInstructions } = preferences;

  const hasAnyData = 
    favoriteFood.length > 0 || 
    dislikedFood.length > 0 || 
    allergies.length > 0 || 
    specialInstructions.trim().length > 0;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const data = {
      exportDate: new Date().toISOString(),
      mealPreferences: preferences,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meal-preferences-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!hasAnyData) {
    return (
      <div className="card">
        <h2 className="section-header">
          <span className="text-2xl">📋</span>
          Summary
        </h2>
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl block mb-2">📝</span>
          <p>No meal preferences have been added yet.</p>
          <p className="text-sm">Start by adding favorite foods, dislikes, or allergies above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card print:shadow-none print:border-0">
      <div className="flex items-center justify-between mb-6 print:mb-4">
        <h2 className="section-header">
          <span className="text-2xl">📋</span>
          Meal Preferences Summary
        </h2>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="btn-secondary text-sm"
            aria-label="Print meal preferences summary"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleExport}
            className="btn-secondary text-sm"
            aria-label="Export meal preferences as JSON"
          >
            💾 Export
          </button>
          <button
            onClick={onReset}
            className="btn-danger text-sm"
            aria-label="Reset all meal preferences"
          >
            🗑️ Reset All
          </button>
        </div>
      </div>

      <div className="print:text-sm">
        <div className="text-xs text-gray-500 mb-4 print:mb-2">
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </div>

        {/* Critical Allergies Section */}
        {allergies.length > 0 && (
          <div className="mb-6 print:mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg print:border print:border-red-400">
            <h3 className="text-lg font-semibold text-red-800 mb-3 print:text-base">
              🚨 CRITICAL: Food Allergies & Intolerances
            </h3>
            <div className="space-y-2">
              {allergies.map((allergy) => (
                <div key={allergy.id} className="flex items-center gap-3 print:gap-2">
                  <span className={`px-3 py-1 text-sm rounded-full border font-medium print:px-2 print:py-0 print:text-xs ${getSeverityColor(allergy.severity)}`}>
                    <span className="mr-1">{getSeverityIcon(allergy.severity)}</span>
                    {ALLERGY_SEVERITIES.find(s => s.value === allergy.severity)?.label}
                  </span>
                  <span className="font-medium">{allergy.name}</span>
                  {allergy.isCommon && (
                    <span className="text-xs text-blue-600 print:text-xs">(Common Allergy)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorite Foods */}
        {favoriteFood.length > 0 && (
          <div className="mb-6 print:mb-4">
            <h3 className="text-lg font-semibold text-green-700 mb-3 print:text-base">
              😋 Favorite Foods ({favoriteFood.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:grid-cols-1">
              {favoriteFood.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200 print:border-green-400">
                  <span className="font-medium">{food.name}</span>
                  {food.category && (
                    <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full print:bg-transparent print:border print:border-green-600">
                      {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disliked Foods */}
        {dislikedFood.length > 0 && (
          <div className="mb-6 print:mb-4">
            <h3 className="text-lg font-semibold text-orange-700 mb-3 print:text-base">
              👎 Disliked Foods ({dislikedFood.length})
            </h3>
            <div className="space-y-2">
              {dislikedFood.map((food) => (
                <div key={food.id} className="flex items-center gap-3 p-2 bg-orange-50 rounded border border-orange-200 print:border-orange-400">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(food.severity)}`}>
                    <span className="mr-1">{getSeverityIcon(food.severity)}</span>
                    {DISLIKE_SEVERITIES.find(s => s.value === food.severity)?.label}
                  </span>
                  <span className="font-medium flex-1">{food.name}</span>
                  {food.category && (
                    <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full print:bg-transparent print:border print:border-orange-600">
                      {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        {specialInstructions.trim() && (
          <div className="mb-6 print:mb-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-3 print:text-base">
              📝 Special Instructions
            </h3>
            <div className="p-4 bg-blue-50 rounded border border-blue-200 print:border-blue-400">
              <div className="whitespace-pre-wrap text-sm print:text-xs">
                {specialInstructions}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 print:mt-4 p-4 bg-gray-50 rounded border border-gray-200 print:border-gray-400">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 print:text-xs">
            Quick Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm print:text-xs print:grid-cols-2">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 print:text-base">{favoriteFood.length}</div>
              <div className="text-gray-600">Favorite Foods</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600 print:text-base">{dislikedFood.length}</div>
              <div className="text-gray-600">Disliked Foods</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600 print:text-base">{allergies.length}</div>
              <div className="text-gray-600">Allergies/Intolerances</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 print:text-base">
                {specialInstructions.trim() ? '✓' : '✗'}
              </div>
              <div className="text-gray-600">Special Instructions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
