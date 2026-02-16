import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";

export default function VdbFilter({onUpdateSelectedVdbs, selectedVdbs}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.1/virtual-databases`)
      .then((response) => response.json())
      .then((data) => {
        const transformedParents = mapData(data);
        setParents(transformedParents);
        setInitialParents(transformedParents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedVdbs]);

  const mapData = (data) => {
    return data.map(item => {
      let mappedItem = {
        id: item.id,
        label: item.name,
        value: item.id.toString(),
        isChecked: selectedVdbs?.includes(item.id.toString())
      };
  
      return mappedItem;
    });
  };

  const toggleFilter = () => {
    if (!isFilterOpen) {
      const tempCheckStates = parents.map(parent => parent.isChecked);
      setTempParents(tempCheckStates);
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleParentCheckbox = (parentId) => {
    setParents((prevState) => {
      return prevState.map((parent) => {
        if (parent.id === parentId) {          
          parent.isChecked = !parent.isChecked;
        }
        return parent;
      });
    });
  };

  const applySelection = () => {
    const values = [];
    
    parents.forEach(parent => {      
      if (parent.isChecked) {
        values.push(parent.value);
      }
    });
  
    onUpdateSelectedVdbs(values);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    setParents(initialParents.map(parent => {     
      parent.isChecked = false;
      return parent;
    }));
  };

  const cancel = () => {
    const resetParents = parents.map((parent, index) => {
      return {
        ...parent,
        isChecked: tempParents[index]
      };
    });
    setParents(resetParents);
    setIsFilterOpen(false);
  };

  return (
    <div className="searchFilter vdb">
      <Button className="filterButton" onClick={toggleFilter}>
        VDB
      </Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">VDB</div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>
          <div className="checkboxFormWrapper"
            key={parents.map(c => c.isChecked).join('-')}
          >
            {parents?.map((parent) => (
              <div className="checkboxWrapper">
                <FormControlLabel
                className="checkboxForm"
                  key={parent.id}
                  label={parent.label}
                  control={
                    <Checkbox
                      className="filterCheckbox"
                      checked={parent.isChecked}
                      onChange={() => toggleParentCheckbox(parent.id)}
                    />
                  }
                />
              </div>
            ))}
          </div>
          <div className="filterActionButtons">            
            <button className="clearButton" onClick={clearAll}>Clear All</button>
            <div>
              <button className="cancelButton" onClick={cancel}>Cancel</button>
              <button className="applyButton" onClick={applySelection}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
