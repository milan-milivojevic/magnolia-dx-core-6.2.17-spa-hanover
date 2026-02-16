import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import fileInfoFilterPayload from './payloads/fileInfoFilterPayload.json';

export default function FileInfoFilter({ onUpdateSelectedSuffixes, selectedSuffixes }) {

  const [suffixes, setSuffixes] = useState([]);
  const [initialSuffixes, setInitialSuffixes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempSuffixes, setTempSuffixes] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.0/asset-attributes/28/trees`)
      .then(res => res.json())
      .then(suffixesData => {
        fetch(`${baseUrl}/rest/mp/v1.1/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fileInfoFilterPayload)
        })
        .then(res => res.json())
        .then(searchData => {
          const countsMap = new Map();
          searchData.aggregations.customAttribute_28.aggs.id.subGroups.forEach(item => {
            countsMap.set(parseInt(item.group), item.count);
          });

          const mappedSuffixes = suffixesData.map(item => ({
            id: item.id,
            label: item.label.EN,
            count: countsMap.get(item.id) || 0,
            isChecked: selectedSuffixes?.includes(item.id)
          }));

          setSuffixes(mappedSuffixes);
          setInitialSuffixes(mappedSuffixes);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedSuffixes]);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setTempSuffixes(suffixes.map(suffix => suffix.isChecked));
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSuffixCheckbox = (id) => {
    setSuffixes(prev => prev.map(suffix => (
      suffix.id === id ? { ...suffix, isChecked: !suffix.isChecked } : suffix
    )));
  };

  const applySelection = () => {
    const selected = suffixes.filter(suffix => suffix.isChecked).map(suffix => suffix.id);
    onUpdateSelectedSuffixes(selected);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    setSuffixes(initialSuffixes.map(suffix => ({ ...suffix, isChecked: false })));
  };

  const cancel = () => {
    setSuffixes(suffixes.map((suffix, i) => ({ ...suffix, isChecked: tempSuffixes[i] })));
    setIsFilterOpen(false);
  };

  const filteredSuffixes = suffixes.filter(suffix =>
    suffix.label.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="searchFilter materialType">
      <Button className="filterButton" onClick={toggleFilter}>Material Type</Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Material Type</div>
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

          <div className="checkboxFormWrapper" key={suffixes.map(suffix => suffix.isChecked).join('-')}>
            <FixedSizeList
              className="fixedSizeList"
              height={300}
              width={300}
              itemCount={filteredSuffixes.length}
              itemSize={35}
            >
              {({ index, style }) => {
                const parent = filteredSuffixes[index];
                return (
                  <div style={style} key={parent.id}>
                    <div className="checkboxWrapper">
                      <FormControlLabel
                        className="checkboxForm"
                        label={`${parent.label}`}
                        control={<Checkbox
                          className="filterCheckbox"
                          checked={parent.isChecked}
                          onChange={() => toggleSuffixCheckbox(parent.id)}
                        />}
                      />
                    </div>
                  </div>
                );
              }}
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
