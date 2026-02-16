import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import keywordsPayload from './payloads/keywordsPayload.json';

export default function KeywordsFilter({ onUpdateSelectedKeywords, selectedKeywords }) {
  
  const [keywords, setKeywords] = useState([]);
  const [initialKeywords, setInitialKeywords] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempKeywords, setTempKeywords] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.0/asset-attributes/27/trees`)
      .then(res => res.json())
      .then(keywordsData => {
        fetch(`${baseUrl}/rest/mp/v1.1/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(keywordsPayload)
        })
        .then(res => res.json())
        .then(searchData => {
          const countsMap = new Map();
          searchData.aggregations.customAttribute_27.aggs.id.subGroups.forEach(item => {
            countsMap.set(parseInt(item.group), item.count);
          });

          const mappedKeywords = keywordsData.map(item => ({
            id: item.id,
            label: item.label.EN,
            count: countsMap.get(item.id) || 0,
            isChecked: selectedKeywords?.includes(item.id)
          }));

          setKeywords(mappedKeywords);
          setInitialKeywords(mappedKeywords);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedKeywords]);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setTempKeywords(keywords.map(kw => kw.isChecked));
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleKeywordCheckbox = (id) => {
    setKeywords(prev => prev.map(kw => (
      kw.id === id ? { ...kw, isChecked: !kw.isChecked } : kw
    )));
  };

  const applySelection = () => {
    const selected = keywords.filter(kw => kw.isChecked).map(kw => kw.id);
    onUpdateSelectedKeywords(selected);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    setKeywords(initialKeywords.map(kw => ({ ...kw, isChecked: false })));
  };

  const cancel = () => {
    setKeywords(keywords.map((kw, i) => ({ ...kw, isChecked: tempKeywords[i] })));
    setIsFilterOpen(false);
  };

  const filteredKeywords = keywords.filter(kw =>
    kw.label.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="searchFilter bussinesLine">
      <Button className="filterButton" onClick={toggleFilter}>Business Line</Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Business Line</div>
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

          <div className="checkboxFormWrapper" key={keywords.map(kw => kw.isChecked).join('-')}>
            <FixedSizeList
              className="fixedSizeList"
              height={300}
              width={300}
              itemCount={filteredKeywords.length}
              itemSize={35}
            >
              {({ index, style }) => {
                const parent = filteredKeywords[index];
                return (
                  <div style={style} key={parent.id}>
                    <div className="checkboxWrapper">
                      <FormControlLabel
                        className="checkboxForm"
                        label={`${parent.label}`}
                        control={<Checkbox
                          className="filterCheckbox"
                          checked={parent.isChecked}
                          onChange={() => toggleKeywordCheckbox(parent.id)}
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
