import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";

export default function FileInfoFilter({onUpdateSelectedSuffixes, selectedSuffixes}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  /* Dohvatanje Filtera */
  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.1/suffixes`)
      .then((response) => response.json())
      .then((data) => {
        const transformedParents = mapData(data);
        setParents(transformedParents);
        setInitialParents(transformedParents);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedSuffixes]);

  /*Mapiranje Filtera*/

  const mapData = (data) => {
    return data.map(item => {
      const mappedItem = {
        id: item.name,
        label: item.label,
        children: item.suffixes.map((suffix, index) => ({
          id: index + 1, // Ovde koristimo index za ID deteta, ali možete koristiti bilo koju logiku koja vam odgovara
          label: suffix,
          value: suffix,
          isChecked: selectedSuffixes?.includes(suffix.toString())
        }))
      };
      return mappedItem;
    });
  };


  /* Otvaranje Filtera i Dropdowna  */

  const extractCheckStates = (items) => {
    return items.map(item => {
      return {
        isChecked: item.isChecked,
        children: item.children ? extractCheckStates(item.children) : null
      };
    });
  };

  const toggleFilter = () => {
    if (!isFilterOpen) {
      const tempCheckStates = extractCheckStates(parents);
      setTempParents(tempCheckStates);
    }
    setIsFilterOpen(!isFilterOpen);
  };  

  const toggleParentDropdown = (parentId) => {
    setParents((prevState) => {      
      return prevState.map((parent) => {
        if (parent.id === parentId) {
          parent.isParentOpen = !parent.isParentOpen;
        }       
        return parent;
      });
    });
  };

  /* Hendlovanje promena stanja Checkbox-ova */

  const toggleParentCheckbox = (parentId) => {
    setParents((prevState) => {
      return prevState.map((parent) => {
        if (parent.id === parentId) {          
          const allChildrenChecked = parent.children.every((child) => child.isChecked);
          parent.children = parent.children.map((child) => {
            child.isChecked = !allChildrenChecked;
            return child;
          });
        }
        return parent;
      });
    });
  };
  

  const toggleChildCheckbox = (parentId, childId) => {
    setParents((prevState) => {
      return prevState.map((parent) => {   
        if (parent.id === parentId) {
          parent.children = parent.children.map((child) => {
            if (child.id === childId) {
              child.isChecked = !child.isChecked;
            }
            return child;
          });
        }
        return parent;
      });
    });
  };  

   /* Pakovanje selektovanih vrednosti u niz i zatvaranje filtera */

  const applySelection = () => {
    const values = [];
    parents.forEach(parent => {
      parent.children.forEach(child => {
        if (child.isChecked) {
          values.push(child.value);
        }
      });
    });

    onUpdateSelectedSuffixes(values);
    setIsFilterOpen(false);
  };

  /* Restartovanje stanja svih Checkboxova */

  const clearAll = () => {
    setParents(initialParents.map(parent => {     
      parent.isChecked = false;
      parent.children?.forEach(child => {
        child.isChecked = false;
      });
      return parent;
    }));
  };

  const resetCheckStates = (items, tempStates) => {
    return items.map((item, index) => {
      return {
        ...item,
        isChecked: tempStates[index].isChecked,
        children: item.children ? resetCheckStates(item.children, tempStates[index].children) : null
      };
    });
  };
  
  const cancel = () => {
    const resetParents = resetCheckStates(parents, tempParents);
    setParents(resetParents);
    setIsFilterOpen(false);
  };

  return (
    <div className="searchFilter suffixes">
      <Button className="filterButton" onClick={toggleFilter}>
        File Information
      </Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">File Information</div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>
          <div className="checkboxFormWrapper parent"
            key={parents.map(c => c.isChecked).join('-')}
          >
            {parents?.map((parent) => (
              <div className="filterCheckboxes" key={parent.id}>
                <div className="checkboxWrapper">
                  <div className="filtersChevron" onClick={() => toggleParentDropdown(parent.id)}>
                    {parent.isParentOpen ? <ExpandMore /> : <ChevronRight />}
                  </div>
                  <FormControlLabel
                    className="checkboxForm"
                    label={parent.label}
                    control={
                      <Checkbox
                        className="filterCheckbox"
                        checked={parent.children.every((child) => child.isChecked)}
                        indeterminate={
                          parent.children.some((child) => child.isChecked) &&
                          !parent.children.every((child) => child.isChecked)
                        }
                        onChange={() => toggleParentCheckbox(parent.id)}
                      />
                    }
                  />
                </div>
                <div className="checkboxFormWrapper child" style={{ display: parent.isParentOpen ? 'flex' : 'none' }}
                  key={parent.children.map(c => c.isChecked).join('-')}
                >
                  {parent.children.map((child) => (
                    <div className="checkboxWrapper" key={child.id}>
                      <FormControlLabel
                        className="checkboxForm"
                        label={child.label}
                        control={
                          <Checkbox
                            className="filterCheckbox"
                            checked={child.isChecked}
                            onChange={() => toggleChildCheckbox(parent.id, child.id)}
                          />
                        }
                      />
                    </div>
                  ))}
                </div>
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