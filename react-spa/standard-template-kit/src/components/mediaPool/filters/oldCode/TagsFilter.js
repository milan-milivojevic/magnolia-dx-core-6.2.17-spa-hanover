import React, { useState, useEffect, useMemo } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import tagsPayload from './payloads/tagsPayload.json';

export default function TagsFilter({ onUpdateSelectedTags, selectedTags }) {
  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tagsPayload)
    };

    fetch(`${baseUrl}/rest/mp/v1.1/search`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const transformedParents = mapData(data?.aggregations.tags.subGroups);
        setParents(transformedParents);
        setInitialParents(transformedParents);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  }, []);

  useEffect(() => {
    setParents(prev => prev.map(parent => ({
      ...parent,
      isChecked: selectedTags?.includes(parent.name)
    })));
  }, [selectedTags]);

  const mapData = useMemo(() => (data) => {
    return data.map(item => ({
      name: item.group,
      count: item.count,
      isChecked: selectedTags?.includes(item.group)
    }));
  }, [selectedTags]);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setTempParents(parents.map(parent => parent.isChecked));
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleParentCheckbox = (parentName) => {
    setParents(prevState => prevState.map(parent =>
      parent.name === parentName ? { ...parent, isChecked: !parent.isChecked } : parent
    ));
  };

  const applySelection = () => {
    const values = parents.filter(parent => parent.isChecked).map(parent => parent.name);
    onUpdateSelectedTags(values);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    setParents(initialParents.map(parent => ({ ...parent, isChecked: false })));
  };

  const cancel = () => {
    setParents(parents.map((parent, index) => ({
      ...parent,
      isChecked: tempParents[index]
    })));
    setIsFilterOpen(false);
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="searchFilter keywords">
      <Button className="filterButton" onClick={toggleFilter}>Keywords</Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Keywords</div>
            <div className="filtersFilter">
              <input
                type="text"
                placeholder="Filter..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>

          <div className="checkboxFormWrapper" key={parents.map(c => c.isChecked).join('-')}>
            <FixedSizeList
              className="fixedSizeList"
              height={300}
              width={300}
              itemCount={filteredParents.length}
              itemSize={35}
            >
              {({ index, style }) => (
                <div style={style} key={index}>
                  <div className="checkboxWrapper">
                    <FormControlLabel
                      className="checkboxForm"
                      label={`${filteredParents[index].name}`}
                      control={<Checkbox
                        className="filterCheckbox"
                        checked={filteredParents[index].isChecked}
                        onChange={() => toggleParentCheckbox(filteredParents[index].name)}
                      />}
                    />
                  </div>
                </div>
              )}
            </FixedSizeList>
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
