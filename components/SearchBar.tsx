'use client';
import React, { useState, useCallback } from 'react';
import styles from '../app/styles.module.css';

interface SearchProps {
  onSubmitSearch: (ingredients: string, diet?: string[], health?: string[]) => void;
  onFetchRandomRecipes: () => void;
}

export default function Search({ onSubmitSearch, onFetchRandomRecipes }: SearchProps) {
  const [ingredients, setIngredients] = useState('');
  const [dietModalVisible, setDietModalVisible] = useState(false);
  const [healthModalVisible, setHealthModalVisible] = useState(false);
  const [activeDiet, setActiveDiet] = useState(new Set<string>());
  const [activeHealth, setActiveHealth] = useState(new Set<string>());

  const dietLabels = [
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium"
];
  const healthLabels = [
    "Sugar-Conscious",
    "Low Potassium",
    "Kidney-Friendly",
    "Keto-Friendly",
    "Vegetarian",
    "Pescatarian",
    "Paleo",
    "Mediterranean",
    "Dairy-Free",
    "Gluten-Free",
    "Wheat-Free",
    "Peanut-Free",
    "Tree-Nut-Free",
    "Soy-Free",
    "Fish-Free",
    "Shellfish-Free",
    "Pork-Free",
    "Red-Meat-Free",
    "Crustacean-Free",
    "Celery-Free",
    "Mustard-Free",
    "Sesame-Free",
    "Lupine-Free",
    "Mollusk-Free",
    "Alcohol-Free",
    "No oil added",
    "Sulfite-Free",
    "FODMAP-Free",
    "Kosher"
  ];

  const toggleFilter = (filter: string, filterType: "diet" | "health") => {
    if (filterType === "diet") {
        setActiveDiet(prevFilters => {
            const newFilters = new Set(prevFilters);
            if(newFilters.has(filter)){
                newFilters.delete(filter);
                console.log("Removed %s", filter);
            }
            else{
                newFilters.add(filter);
                console.log("Added %s", filter);
            }
            
            return newFilters;
        });
    } else if (filterType === "health") {
        setActiveHealth(prevFilters => {
            const newFilters = new Set(prevFilters);
            if(newFilters.has(filter)){
                newFilters.delete(filter);
                console.log("Removed %s", filter);
            }
            else{
                newFilters.add(filter);
                console.log("Added %s", filter);
            }
            
            return newFilters;
        });
    }
};
const applyFilters=(type:string)=>{
    if(type=='diet'){
        setDietModalVisible(false);
    }
    else if(type=='health'){
        setHealthModalVisible(false);
    }
    onSubmitSearch(ingredients, Array.from(activeDiet), Array.from(activeHealth));
};
const clearFilters = (type: string) =>{
    if(type=='diet'){
        setActiveDiet( new Set<string>());
        setDietModalVisible(false);
    }
    else if(type=='health'){
        setActiveHealth(new Set<string>());
        setHealthModalVisible(false);
    }
    onSubmitSearch(ingredients, Array.from(activeDiet), Array.from(activeHealth));
};

  return (
    <div className={styles.search}>
                    <input
                        onChange={(e) => setIngredients(e.target.value)}
                        className={styles.input}
                        type="text"
                        id="ingredient"
                        placeholder="Enter ingredients (comma-separated)"
                    />
                    <button
                        className={styles.button}
                        onClick={() => onSubmitSearch(ingredients, Array.from(activeDiet), Array.from(activeHealth))}>
                        Search
                    </button>
                    <button
                        className={styles.button}
                        onClick={onFetchRandomRecipes}>
                        Random
                    </button>


                    {/* Button to open Diet Type Modal */}
                    <button onClick={() => setDietModalVisible(true)} className={styles.button}>
                        Diet Type
                    </button>

                    {/* Button to open Health Labels Modal */}
                    <button onClick={() => setHealthModalVisible(true)} className={styles.button}>
                        Health Labels
                    </button>
                
            


            {/* Diet Filter Modal */}
            {dietModalVisible && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Filter Diet Type</h3>
                        {dietLabels.map((label, index) => (
                            <label key={index} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={activeDiet.has(label)}
                                    onChange={() => toggleFilter(label, "diet")}
                                />
                                {label}
                            </label>
                        ))}
                        <button onClick={() => applyFilters("diet")} className={styles.applyButton}>
                            Apply Filters
                        </button>
                        <button onClick={() => clearFilters("diet")} className={styles.applyButton}>
                            Clear All
                        </button>
                    </div>
                </div>
            )}

            {/* Health Filter Modal */}
            {healthModalVisible && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Filter Health Labels</h3>
                        {healthLabels.map((label, index) => (
                            <label key={index} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={activeHealth.has(label)}
                                    onChange={() => toggleFilter(label, "health")}
                                />
                                {label}
                            </label>
                        ))}
                        <button onClick={()=>applyFilters("health")} className={styles.applyButton}>
                            Apply Filters
                        </button>
                        <button onClick={()=>clearFilters("health")} className={styles.applyButton}>
                            Clear All
                        </button>
                    </div>
                </div>
            )}
            </div>
  );
}
