export interface FoodItem {
  id: string;
  name: string;
  category?: "breakfast" | "lunch" | "dinner" | "snacks";
}

export interface DislikedFood extends FoodItem {
  severity: "mild" | "strong";
}

export interface FoodAllergy {
  id: string;
  name: string;
  severity: "mild-intolerance" | "moderate-intolerance" | "severe-allergy";
  isCommon?: boolean;
}

export interface MealPreferences {
  favoriteFood: FoodItem[];
  dislikedFood: DislikedFood[];
  allergies: FoodAllergy[];
  specialInstructions: string;
}

export type FoodCategory = "breakfast" | "lunch" | "dinner" | "snacks";
export type AllergySeverity =
  | "mild-intolerance"
  | "moderate-intolerance"
  | "severe-allergy";
export type DislikeSeverity = "mild" | "strong";

export const COMMON_ALLERGIES = [
  "Nuts (Tree nuts)",
  "Peanuts",
  "Dairy/Milk",
  "Eggs",
  "Gluten/Wheat",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
] as const;

export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snacks", label: "Snacks" },
];

export const ALLERGY_SEVERITIES: {
  value: AllergySeverity;
  label: string;
  description: string;
}[] = [
  {
    value: "mild-intolerance",
    label: "Mild Intolerance",
    description: "May cause mild discomfort",
  },
  {
    value: "moderate-intolerance",
    label: "Moderate Intolerance",
    description: "Causes noticeable symptoms",
  },
  {
    value: "severe-allergy",
    label: "Severe Allergy",
    description: "Life-threatening reaction",
  },
];

export const DISLIKE_SEVERITIES: { value: DislikeSeverity; label: string }[] = [
  { value: "mild", label: "Mild Dislike" },
  { value: "strong", label: "Absolutely Won't Eat" },
];
