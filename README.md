# Zenaris Elderly Meal Preferences Interface

A user-friendly web interface designed for relatives and caregivers to input comprehensive meal preference information for elderly individuals. The application prioritizes accessibility, clarity, and ease of use to reduce cognitive load for stressed caregivers.

## 🎯 Project Overview

This React TypeScript application was built as part of the Zenaris coding challenge. It provides a comprehensive solution for managing elderly meal preferences, including favorite foods, dislikes, allergies, and special dietary instructions.

## ✨ Features

### 1. Favorite Foods Section

- Dynamic list for foods the elderly person enjoys
- Add, edit, and remove functionality
- Meal categorization (breakfast, lunch, dinner, snacks)
- Quick keyboard shortcuts (Enter to add)

### 2. Disliked Foods Section

- Dynamic list for foods the elderly person dislikes
- Severity levels (mild dislike vs. absolutely won't eat)
- Visual indicators for different severity levels
- Meal categorization support

### 3. Food Allergies & Intolerances Section

- Critical medical information with clear visual distinction
- Severity indicators (mild intolerance, moderate intolerance, severe allergy)
- Quick-select common allergies (nuts, dairy, gluten, etc.)
- Color-coded severity system with icons

### 4. Special Instructions Section

- Free-form text area for additional considerations
- 500 character limit with real-time counter
- Quick-add common instruction templates
- Examples: texture preferences, temperature preferences, cultural/religious restrictions

### 5. Summary & Export Features

- Comprehensive overview of all preferences
- Quick statistics overview
- Reset functionality with confirmation

## 🛠 Technical Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling and responsive design
- **Custom hooks** for state management
- **UUID** for unique identifiers

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone git@github.com:gulzerr/zenaris.git
cd zenaris
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## 🔧 Architecture

### Component Structure

```
src/
├── components/
│   ├── FavoriteFood.tsx      # Favorite foods management
│   ├── DislikedFood.tsx      # Disliked foods with severity
│   ├── FoodAllergies.tsx     # Critical allergy information
│   ├── SpecialInstructions.tsx # Free-form instructions
│   └── Summary.tsx           # Overview and export
├── hooks/
│   └── useMealPreferences.ts # State management hook
├── types/
│   └── index.ts              # TypeScript definitions
├── utils/
│   └── index.ts              # Utility functions
└── App.tsx                   # Main application component
```
