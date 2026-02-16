
import React, { useState, useEffect, useMemo } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import fileInfoFilterPayload from './payloads/fileInfoFilterPayload.json';

export default function FileInfoFilter({
  onUpdateSelectedSuffixes,
  selectedSuffixes,
  query = "",                
  selectedCategories = [],   
  selectedTags = [],         
  selectedKeywords = []     
}) {
  const [suffixes, setSuffixes] = useState([]);
  const [initialSuffixes, setInitialSuffixes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempSuffixes, setTempSuffixes] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    (async () => {
      const respTree = await fetch(
        `${baseUrl}/rest/mp/v1.0/asset-attributes/28/trees`
      );
      const suffixesData = await respTree.json();

      const payload = JSON.parse(JSON.stringify(fileInfoFilterPayload));

      payload.criteria.subs[0].value = query;

      if (selectedCategories.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["themes.id"],
          long_value: selectedCategories,
          any: true
        });
      }
      if (selectedTags.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["keywords_multi"],
          text_value: selectedTags,
          any: true
        });
      }
      if (selectedKeywords.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["customAttribute_27.id"],
          long_value: selectedKeywords,
          any: true
        });
      }

      const respSearch = await fetch(
        `${baseUrl}/rest/mp/v1.1/search`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      const data = await respSearch.json();

      const groups = data.aggregations
                         .customAttribute_28
                         .aggs
                         .id
                         .subGroups;
      const countsMap = new Map();
      groups.forEach(item => {
        countsMap.set(parseInt(item.group, 10), item.count);
      });

      const mapped = suffixesData.map(item => ({
        id: item.id,
        label: item.label.EN,
        count: countsMap.get(item.id) || 0,
        isChecked: selectedSuffixes.includes(item.id)
      }));

      setSuffixes(mapped);
      setInitialSuffixes(mapped);
    })().catch(err => console.error('FileInfoFilter fetch error:', err));
  }, [
    query,
    selectedCategories,
    selectedTags,
    selectedKeywords,
  ]);

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

  const filteredSuffixes = useMemo(() => {
    return suffixes
      .filter(suffix => suffix.label.toLowerCase().includes(filterValue.toLowerCase()))
      .sort((a, b) => {
        const aHas = a.count > 0;
        const bHas = b.count > 0;
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return a.label.localeCompare(b.label, 'en', { sensitivity: 'base' });
      });
  }, [suffixes, filterValue]);

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
                        label={`${parent.label} (${parent.count})`}
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
