import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function TemplateCategoriesFilter({ onUpdateSelectedTemplateCategory, selectedTemplateCategory }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/templates`)
      .then((response) => response.json())
      .then((data) => {
        const templateCategoryObject = data.find(item => item.label === "Categories");
        const transformedParents = mapData(JSON.parse(templateCategoryObject.options)).map(item => ({
          ...item,
          isOpen: false,
        }));
        setParents(transformedParents);

        // After setting the parents, also set the correct selected option based on prop
        const correspondingSelected = transformedParents.find(parent => parent.value === selectedTemplateCategory);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedTemplateCategory]);

  const mapData = (data) => {
    const mapItem = (item, parentId) => {
      const id = parentId ? `${parentId}_${item.value}` : item.value;
      return {
        id,
        label: item.label,
        value: item.value,
        children: item.children ? item.children.map(child => mapItem(child, id)) : [],
      };
    };

    const flattenItems = (items) => {
      return items.reduce((acc, item) => {
        acc.push(item);
        if (item.children) {
          acc.push(...flattenItems(item.children));
        }
        return acc;
      }, []);
    };

    return flattenItems(data.map(item => mapItem(item, null)));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
  
    if (selectedValue === "none") {
      setSelectedOption(null);
      onUpdateSelectedTemplateCategory(null);
      return;
    }
  
    const findSelectedItem = (items, value) => {
      for (const item of items) {
        if (item.value === value) {
          return item;
        }
        if (item.children) {
          const found = findSelectedItem(item.children, value);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };
  
    const templateCategoryObject = parents.find(item => item.value === selectedValue);
    const flattenedItems = mapData(JSON.parse(templateCategoryObject.options));
    const selectedItem = findSelectedItem(flattenedItems, selectedValue);
  
    setSelectedOption(selectedItem);
    onUpdateSelectedTemplateCategory(selectedValue);
  };

  const renderOptions = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <MenuItem value={item.value} style={{ marginLeft: `${level * 16}px` }}>
          {item.children && (
            <span onClick={() => handleToggle(item)}>{item.isOpen ? '-' : '+'}</span>
          )}
          {item.label}
        </MenuItem>
        {item.isOpen && item.children && renderOptions(item.children, level + 1)}
      </React.Fragment>
    ));
  };
  
  const handleToggle = (item) => {
    const updatedParents = toggleItem(parents, item);
    setParents(updatedParents);
  };
  
  const toggleItem = (items, targetItem) => {
    return items.map(item => {
      if (item.value === targetItem.value) {
        return { ...item, isOpen: !item.isOpen };
      } else if (item.children) {
        return { ...item, children: toggleItem(item.children, targetItem) };
      }
      return item;
    });
  };
  

  return (
    <div className="searchFilter templateCategory">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Category</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "none"}
          onChange={handleSelectChange}
          label="Template Category"
        >
          <MenuItem value="none">Please select</MenuItem>
          {renderOptions(parents)}
        </Select>
      </FormControl>
    </div>
  );
}