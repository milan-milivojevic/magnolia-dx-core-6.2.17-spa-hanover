import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function TemplateColorFilter({ onUpdateSelectedColor, selectedColor }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/templates`)
      .then((response) => response.json())
      .then((data) => {
        const templateColorObject = data.find(item => item.label === "Color");
        const transformedParents = mapData(JSON.parse(templateColorObject.options));
        setParents(transformedParents);

        const correspondingSelected = transformedParents.find(parent => parent.value === selectedColor);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedColor]);

  const mapData = (data) => {
    return data.map((option, index) => ({
      id: index,
      label: option.label,
      value: option.value,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    
    if (selectedValue === "none") {
      setSelectedOption(null);
      onUpdateSelectedColor(null);
      return;
    }
    
    const selectedItem = parents.find(item => item.value === selectedValue);
    setSelectedOption(selectedItem);
    onUpdateSelectedColor(selectedValue);
  };

  return (
    <div className="searchFilter templateColor">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Color</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "none"}
          onChange={handleSelectChange}
          label="Template Color"
        >
          <MenuItem value="none">Please select</MenuItem>
          {parents.map(parent => (
            <MenuItem key={parent.id} value={parent.value}>{parent.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
