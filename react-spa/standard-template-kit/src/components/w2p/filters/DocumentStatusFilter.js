import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function DocumentStatusFilter({ onUpdateSelectedDocumentStatus, selectedDocumentStatus }) {

  const [parents, setParents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/wp/rest/search-filters/instances`)
      .then((response) => response.json())
      .then((data) => {
        const templateTypeObject = data.find(item => item.name === "filter");
        const transformedParents = mapData(JSON.parse(templateTypeObject.options));
        setParents(transformedParents);

        const correspondingSelected = transformedParents.find(parent => parent.value === selectedDocumentStatus);
        setSelectedOption(correspondingSelected || null);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedDocumentStatus]);

  const mapData = (data) => {
    return data.map((option, index) => ({
      id: index,
      label: option.label,
      value: option.value,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = parents.find(item => item.value === selectedValue);
    setSelectedOption(selectedItem);
    onUpdateSelectedDocumentStatus(selectedValue);
  };

  return (
    <div className="searchFilter templateStatus">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="details-label">Document Status</InputLabel>
        <Select
          labelId="details-label"
          value={selectedOption?.value || "in-work"}
          onChange={handleSelectChange}
          label="Document Status"
        >          
          {parents.map(parent => (
            <MenuItem key={parent.id} value={parent.value}>{parent.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}