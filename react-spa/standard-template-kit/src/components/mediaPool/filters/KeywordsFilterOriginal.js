import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import keywordsPayload from './payloads/keywordsPayload.json'
import { AiOutlineClose } from "react-icons/ai";

export default function KeywordsFilter({onUpdateSelectedKeywords, selectedKeywords}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  /* Dohvatanje Filtera */
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keywordsPayload)
    };

    fetch(`${baseUrl}/rest/mp/v1.1/search`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
      const countData = data;
        // Store the countResponseData and fetch the keywords
        return { countData, fetchPromise: fetch(`${baseUrl}/rest/mp/v1.2/keywords`) };
      })
      .then(async ({ countData, fetchPromise }) => {
        const response = await fetchPromise;
        const keywordsData = await response.json();
        return ({ keywordsData, countData });
      })
      .then(({ keywordsData, countData }) => {
        const countGroups = countData?.aggregations.keywords.aggs.id.subGroups;
        const transformedParents = mapData(keywordsData.items, countGroups);
        console.log("transformedParents");
        console.log(transformedParents);
        setParents(transformedParents);
        setInitialParents(transformedParents);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  }, [selectedKeywords]);

  const mapData = (data, countGroups) => {
    const mappedItems = data.map(item => {
      let mappedItem = {
        id: item.id,
        label: item.name.EN || item.name.DE,
        value: item.id.toString(),
        count: 0, // default count
        isChecked: selectedKeywords?.includes(item.id.toString()) // Check if the ID exists in the selectedKeywords
      };
  
      // Find the matching group from the POST request response
      const matchingGroup = countGroups?.find(group => parseInt(group.group) === item.id);
      
      // If a matching group is found, update the count
      if (matchingGroup) {
        mappedItem.count = matchingGroup.count;
      }
  
      return mappedItem;
    });

    // Sortiranje stavki po atributu count od najveće do najmanje vrednosti
    return mappedItems.sort((a, b) => b.count - a.count);
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
      if (parent.isChecked) { // Ako nisu svi childovi selektovani, dodajemo vrednosti childova pojedinačno
        values.push(parent.value);
      }
    });

    onUpdateSelectedKeywords(values);
    setIsFilterOpen(false);
  };

  /* Restartovanje stanja svih Checkboxova */

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
    <div className="searchFilter keywords">
      <Button className="filterButton" onClick={toggleFilter}>
        Keywords
      </Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Keywords</div>
            <div className="filtersFilter">
              <input
                type="text"
                placeholder="Filter keywords..."
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>          
          <div className="checkboxFormWrapper"
            key={parents.map(c => c.isChecked).join('-')}
          >
            {parents?.filter(parent => parent.label.toLowerCase().includes(filterValue.toLowerCase())).map((parent) => (
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
  )
}

