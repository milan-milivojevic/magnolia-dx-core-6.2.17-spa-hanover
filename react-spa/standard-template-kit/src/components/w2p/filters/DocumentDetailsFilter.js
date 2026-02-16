import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function DocumentDetailsFilter({ onUpdateSelectedDetails, selectedDetails }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/instances`)
      .then((response) => response.json())
      .then((data) => {
        const templateTypeObject = data.find(item => item.label === "Details");
        const transformedParents = mapData(JSON.parse(templateTypeObject.options));
        setParents(transformedParents);

        const correspondingSelected = transformedParents.find(parent => parent.value === selectedDetails);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDetails]);

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
      onUpdateSelectedDetails(null);
      return;
    }
    
    const selectedItem = parents.find(item => item.value === selectedValue);
    setSelectedOption(selectedItem);
    onUpdateSelectedDetails(selectedValue);
  };

  return (
    <div className="searchFilter details">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Details</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "none"}
          onChange={handleSelectChange}
          label="Details"
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