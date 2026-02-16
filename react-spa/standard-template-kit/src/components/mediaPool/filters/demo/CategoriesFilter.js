import React, { useState, useEffect } from "react";

function CategoriesFilter ({onUpdateSelectedCategories}) {

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openParents, setOpenParents] = useState([]); // Prati otvorene parent dropdown menije
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    // Simulirajte preuzimanje podataka iz GET zahteva
    fetch(`${baseUrl}/rest/mp/v1.2/themes`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data); // Postavlja preuzete podatke u stanje komponente
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, []);

  const toggleParent = (parentId) => {
    // Otvaranje/zatvaranje parent dropdown menija
    if (openParents.includes(parentId)) {
      setOpenParents(openParents.filter((id) => id !== parentId));
    } else {
      setOpenParents([...openParents, parentId]);
    }
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const isParentOpen = (parentId) => {
    // Provera da li je parent dropdown otvoren
    return openParents.includes(parentId);
  };

  const renderCategory = (category) => {
    const isSelected = selectedCategories.includes(category.id);
    const isParent = category.children && category.children.length > 0;

    return (
      <div key={category.id}>
        <label>
          {isParent && (
            <button onClick={() => toggleParent(category.id)}>
              {isParentOpen(category.id) ? "Zatvori" : "Otvori"}
            </button>
          )}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleCategory(category.id)}
          />
          {category.name.EN || category.name.DE}
        </label>
        {isParentOpen(category.id) && isParent && (
          <div style={{ marginLeft: "20px" }}>
            {category.children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  const toggleCategorieDropdown = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const applyChanges = () => {
    console.log("selectedCategories");
    console.log(selectedCategories);
        // Call the callback function and pass the updated selectedCategories
        onUpdateSelectedCategories(selectedCategories);
        toggleCategorieDropdown();
  }

  return (
    <div>
      <button className="filterDropdowns" onClick={toggleCategorieDropdown}>
        Categories
      </button>

      {isCategoriesOpen && (
        <div className="dropdown-content">
          {categories.map((category) => renderCategory(category))}
          <div>
            <button onClick={toggleCategorieDropdown}>Close</button>
            <button onClick={applyChanges}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesFilter;
