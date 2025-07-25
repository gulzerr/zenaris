import { useState } from "react";
import { useMealPreferences } from "./hooks/useMealPreferences";
import { FavoriteFood } from "./components/FavoriteFood";
import { DislikedFood } from "./components/DislikedFood";
import { FoodAllergies } from "./components/FoodAllergies";
import { SpecialInstructions } from "./components/SpecialInstructions";
import { Summary } from "./components/Summary";

function App() {
  const {
    preferences,
    addFavoriteFood,
    updateFavoriteFood,
    removeFavoriteFood,
    addDislikedFood,
    updateDislikedFood,
    removeDislikedFood,
    addAllergy,
    updateAllergy,
    removeAllergy,
    updateSpecialInstructions,
    resetPreferences,
  } = useMealPreferences();

  const [activeSection, setActiveSection] = useState<string>("favorites");

  const sections = [
    { id: "favorites", label: "Favorite Foods", icon: "😋" },
    { id: "dislikes", label: "Disliked Foods", icon: "👎" },
    { id: "allergies", label: "Allergies", icon: "🚨" },
    { id: "instructions", label: "Special Instructions", icon: "📝" },
    { id: "summary", label: "Summary", icon: "📋" },
  ];

  const handleResetWithConfirmation = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all meal preferences? This action cannot be undone."
      )
    ) {
      resetPreferences();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  Zenaris Meal Preferences
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Elderly Care Meal Planning Interface
                </p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 hidden md:block">
              Designed with empathy for caregivers
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeSection === section.id ? "page" : undefined}
              >
                <span className="text-lg">{section.icon}</span>
                {section.label}
                {section.id === "favorites" &&
                  preferences.favoriteFood.length > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {preferences.favoriteFood.length}
                    </span>
                  )}
                {section.id === "dislikes" &&
                  preferences.dislikedFood.length > 0 && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {preferences.dislikedFood.length}
                    </span>
                  )}
                {section.id === "allergies" &&
                  preferences.allergies.length > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {preferences.allergies.length}
                    </span>
                  )}
                {section.id === "instructions" &&
                  preferences.specialInstructions.trim() && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      ✓
                    </span>
                  )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-4 print:px-0">
        {/* Progress Indicator */}
        <div className="mb-8 print:hidden">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-700">
                Progress Overview
              </h2>
              <span className="text-xs text-gray-500">
                {
                  [
                    preferences.favoriteFood.length > 0,
                    preferences.dislikedFood.length > 0,
                    preferences.allergies.length > 0,
                    preferences.specialInstructions.trim().length > 0,
                  ].filter(Boolean).length
                }{" "}
                / 4 sections completed
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={`h-2 rounded-full ${
                  preferences.favoriteFood.length > 0
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
              <div
                className={`h-2 rounded-full ${
                  preferences.dislikedFood.length > 0
                    ? "bg-orange-500"
                    : "bg-gray-200"
                }`}
              />
              <div
                className={`h-2 rounded-full ${
                  preferences.allergies.length > 0
                    ? "bg-red-500"
                    : "bg-gray-200"
                }`}
              />
              <div
                className={`h-2 rounded-full ${
                  preferences.specialInstructions.trim()
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 print:space-y-4">
          {activeSection === "favorites" && (
            <FavoriteFood
              favoriteFood={preferences.favoriteFood}
              onAdd={addFavoriteFood}
              onUpdate={updateFavoriteFood}
              onRemove={removeFavoriteFood}
            />
          )}

          {activeSection === "dislikes" && (
            <DislikedFood
              dislikedFood={preferences.dislikedFood}
              onAdd={addDislikedFood}
              onUpdate={updateDislikedFood}
              onRemove={removeDislikedFood}
            />
          )}

          {activeSection === "allergies" && (
            <FoodAllergies
              allergies={preferences.allergies}
              onAdd={addAllergy}
              onUpdate={updateAllergy}
              onRemove={removeAllergy}
            />
          )}

          {activeSection === "instructions" && (
            <SpecialInstructions
              specialInstructions={preferences.specialInstructions}
              onUpdate={updateSpecialInstructions}
            />
          )}

          {activeSection === "summary" && (
            <Summary
              preferences={preferences}
              onReset={handleResetWithConfirmation}
            />
          )}
        </div>

        {/* Print View - Show All Sections */}
        <div className="hidden print:block print:space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Meal Preferences Summary
            </h1>
            <p className="text-gray-600">Elderly Care Meal Planning</p>
          </div>

          <Summary preferences={preferences} onReset={() => {}} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Zenaris Elderly Meal Preferences Interface
            </p>
            <p className="text-xs text-gray-500">
              Designed with empathy for caregivers managing multiple
              responsibilities. This interface aims to reduce cognitive load and
              improve meal planning for elderly care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
