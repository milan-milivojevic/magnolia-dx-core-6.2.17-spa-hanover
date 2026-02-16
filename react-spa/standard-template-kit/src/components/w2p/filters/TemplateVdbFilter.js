import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function TemplateVdbFilter({ onUpdateSelectedVdb, selectedVdb }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/templates`)
      .then((response) => response.json())
      .then((data) => {
        const templateVdbObject = data.find(item => item.label === "VDB");
        const transformedParents = mapData(JSON.parse(templateVdbObject.options));
        setParents(transformedParents);

        const correspondingSelected = transformedParents.find(parent => parent.value === selectedVdb);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedVdb]);

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
      onUpdateSelectedVdb(null);
      return;
    }
    
    const selectedItem = parents.find(item => item.value === selectedValue);
    setSelectedOption(selectedItem);
    onUpdateSelectedVdb(selectedValue);
  };

  return (
    <div className="searchFilter templateVdb">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Vdb</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "none"}
          onChange={handleSelectChange}
          label="Template Vdb"
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
