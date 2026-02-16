import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function TemplateOutputFilter({ onUpdateSelectedOutput, selectedOutput }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/templates`)
      .then((response) => response.json())
      .then((data) => {
        const templateOutputObject = data.find(item => item.label === "Output method");
        const transformedParents = mapData(JSON.parse(templateOutputObject.options));
        setParents(transformedParents);

        const correspondingSelected = transformedParents.find(parent => parent.value === selectedOutput);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedOutput]);

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
      onUpdateSelectedOutput(null);
      return;
    }
    
    const selectedItem = parents.find(item => item.value === selectedValue);
    setSelectedOption(selectedItem);
    onUpdateSelectedOutput(selectedValue);
  };

  return (
    <div className="searchFilter templateOutput">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Output Format</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "none"}
          onChange={handleSelectChange}
          label="Template Output"
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
