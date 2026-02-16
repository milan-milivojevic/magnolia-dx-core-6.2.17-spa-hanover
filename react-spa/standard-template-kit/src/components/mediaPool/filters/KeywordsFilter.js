import React, { useState, useEffect, useMemo } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { FixedSizeList } from 'react-window';

import keywordsPayload from './payloads/keywordsPayload.json';

export default function KeywordsFilter({
  onUpdateSelectedKeywords,
  selectedKeywords = [],
  query = "",
  selectedCategories = [],
  selectedTags = [],
  selectedSuffixes = []
}) {
  const [keywords, setKeywords] = useState([]);
  const [initialKeywords, setInitialKeywords] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [tempKeywords, setTempKeywords] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    (async () => {
      const respTree = await fetch(
        `${baseUrl}/rest/mp/v1.0/asset-attributes/27/trees`
      );
      const keywordsData = await respTree.json();

      const payload = JSON.parse(JSON.stringify(keywordsPayload));

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
      if (selectedSuffixes.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["customAttribute_28.id"],
          long_value: selectedSuffixes,
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
                         .customAttribute_27
                         .aggs
                         .id
                         .subGroups;
      const countsMap = new Map();
      groups.forEach(g => countsMap.set(parseInt(g.group, 10), g.count));

      const mapped = keywordsData.map(item => ({
        id: item.id,
        label: item.label.EN,
        count: countsMap.get(item.id) || 0,
        isChecked: selectedKeywords.includes(item.id)
      }));

      setKeywords(mapped);
      setInitialKeywords(mapped);
    })().catch(err => console.error('KeywordsFilter error:', err));
  }, [
    query,
    selectedCategories,
    selectedTags,
    selectedSuffixes
  ]);

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

  const filteredKeywords = useMemo(() => {
    return keywords
      .filter(kw => kw.label.toLowerCase().includes(filterValue.toLowerCase()))
      .sort((a, b) => {
        const aHas = a.count > 0;
        const bHas = b.count > 0;
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return a.label.localeCompare(b.label, 'en', { sensitivity: 'base' });
      });
  }, [keywords, filterValue]);

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
                        label={`${parent.label} (${parent.count})`}
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
