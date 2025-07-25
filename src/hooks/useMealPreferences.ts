import { useState, useCallback } from "react";
import {
  MealPreferences,
  FoodItem,
  DislikedFood,
  FoodAllergy,
  FoodCategory,
  AllergySeverity,
  DislikeSeverity,
} from "../types/index";
import { generateId } from "../utils/index";

const initialPreferences: MealPreferences = {
  favoriteFood: [],
  dislikedFood: [],
  allergies: [],
  specialInstructions: "",
};

export const useMealPreferences = () => {
  const [preferences, setPreferences] =
    useState<MealPreferences>(initialPreferences);

  const addFavoriteFood = useCallback(
    (name: string, category?: FoodCategory) => {
      const newFood: FoodItem = {
        id: generateId(),
        name: name.trim(),
        category,
      };
      setPreferences((prev) => ({
        ...prev,
        favoriteFood: [...prev.favoriteFood, newFood],
      }));
    },
    []
  );

  const updateFavoriteFood = useCallback(
    (id: string, name: string, category?: FoodCategory) => {
      setPreferences((prev) => ({
        ...prev,
        favoriteFood: prev.favoriteFood.map((food) =>
          food.id === id ? { ...food, name: name.trim(), category } : food
        ),
      }));
    },
    []
  );

  const removeFavoriteFood = useCallback((id: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteFood: prev.favoriteFood.filter((food) => food.id !== id),
    }));
  }, []);

  const addDislikedFood = useCallback(
    (name: string, severity: DislikeSeverity, category?: FoodCategory) => {
      const newFood: DislikedFood = {
        id: generateId(),
        name: name.trim(),
        severity,
        category,
      };
      setPreferences((prev) => ({
        ...prev,
        dislikedFood: [...prev.dislikedFood, newFood],
      }));
    },
    []
  );

  const updateDislikedFood = useCallback(
    (
      id: string,
      name: string,
      severity: DislikeSeverity,
      category?: FoodCategory
    ) => {
      setPreferences((prev) => ({
        ...prev,
        dislikedFood: prev.dislikedFood.map((food) =>
          food.id === id
            ? { ...food, name: name.trim(), severity, category }
            : food
        ),
      }));
    },
    []
  );

  const removeDislikedFood = useCallback((id: string) => {
    setPreferences((prev) => ({
      ...prev,
      dislikedFood: prev.dislikedFood.filter((food) => food.id !== id),
    }));
  }, []);

  const addAllergy = useCallback(
    (name: string, severity: AllergySeverity, isCommon = false) => {
      const newAllergy: FoodAllergy = {
        id: generateId(),
        name: name.trim(),
        severity,
        isCommon,
      };
      setPreferences((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy],
      }));
    },
    []
  );

  const updateAllergy = useCallback(
    (id: string, name: string, severity: AllergySeverity) => {
      setPreferences((prev) => ({
        ...prev,
        allergies: prev.allergies.map((allergy) =>
          allergy.id === id
            ? { ...allergy, name: name.trim(), severity }
            : allergy
        ),
      }));
    },
    []
  );

  const removeAllergy = useCallback((id: string) => {
    setPreferences((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((allergy) => allergy.id !== id),
    }));
  }, []);

  const updateSpecialInstructions = useCallback((instructions: string) => {
    setPreferences((prev) => ({
      ...prev,
      specialInstructions: instructions,
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(initialPreferences);
  }, []);

  return {
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
  };
};
