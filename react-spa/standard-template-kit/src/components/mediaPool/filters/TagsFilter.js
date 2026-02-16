import React, { useState, useEffect, useMemo } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import tagsPayload from './payloads/tagsPayload.json';

export default function TagsFilter({
  onUpdateSelectedTags,
  selectedTags = [],
  query = "",
  selectedCategories = [],
  selectedKeywords = [],
  selectedSuffixes = []
}) {
  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    (async () => {
      const payload = JSON.parse(JSON.stringify(tagsPayload));

      payload.criteria.subs[0].value = query;

      if (selectedCategories.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["themes.id"],
          long_value: selectedCategories,
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
      if (selectedSuffixes.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["customAttribute_28.id"],
          long_value: selectedSuffixes,
          any: true
        });
      }

      const resp = await fetch(
        `${baseUrl}/rest/mp/v1.1/search`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      const data = await resp.json();

      const groups = data.aggregations.tags.subGroups;
      const countsMap = new Map();
      groups.forEach(g => countsMap.set(g.group, g.count));

      const mapped = groups.map(item => ({
        name: item.group,
        count: countsMap.get(item.group) || 0,
        isChecked: selectedTags.includes(item.group)
      }));

      setParents(mapped);
      setInitialParents(mapped);
    })().catch(err => console.error('TagsFilter error:', err));
  }, [
    query,
    selectedCategories,
    selectedKeywords,
        selectedSuffixes
  ]);

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

  const filteredParents = useMemo(() => {
    return parents
      .filter(parent => parent.name.toLowerCase().includes(filterValue.toLowerCase()))
      .sort((a, b) => {
        const aHas = a.count > 0;
        const bHas = b.count > 0;
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
      });
  }, [parents, filterValue]);

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
                      label={`${filteredParents[index].name} (${filteredParents[index].count})`}
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
