import React, { useState, useEffect, useMemo } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";
import categoriesPayload from './payloads/categoriesPayload.json';

export default function CategoriesFilter({
  onUpdateSelectedCategories,
  selectedCategories,
  query,
  sortingType,
  isAsc,
  selectedSuffixes = [],
  selectedTags = [],
  selectedKeywords = []
}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  useEffect(() => {
    (async () => {
      const payload = JSON.parse(JSON.stringify(categoriesPayload));

      payload.criteria.subs[0].value = query;

      if (selectedSuffixes.length) {
        payload.criteria.subs.push({
          "@type": "in",
          fields: ["customAttribute_28.id"],
          long_value: selectedSuffixes,
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

      const response = await fetch(`${baseUrl}/rest/mp/v1.1/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      const countsMap = new Map();
      const groups = data.aggregations.categories.aggs.id.subGroups;
      groups.forEach(g => countsMap.set(+g.group, g.count));

      const mapItems = items => items
        .filter(i => !i.disabled)
        .map(i => {
          const children = i.children ? mapItems(i.children) : null;
          const direct = countsMap.get(i.id) || 0;
          const fromChildren = children ? children.reduce((s, c) => s + c.count, 0) : 0;
          const total = direct || fromChildren;
          return {
            id: i.id,
            label: i.name.EN || i.name.DE,
            value: i.id.toString(),
            count: total,
            isChecked: selectedCategories.includes(i.id.toString()),
            isParentOpen: false,
            children
          };
        });

      const sortItems = arr => arr
        .sort((a, b) => {
          const aHas = a.count > 0, bHas = b.count > 0;
          if (aHas !== bHas) return aHas ? -1 : 1;
          return a.label.localeCompare(b.label, 'en', { sensitivity: 'base' });
        })
        .map(i => i.children ? { ...i, children: sortItems(i.children) } : i);

      const resp = await fetch(`${process.env.REACT_APP_MGNL_HOST_NEW}/rest/mp/v1.2/themes`);
      const themesData = await resp.json();

      const transformed = sortItems(mapItems(themesData));
      setParents(transformed);
      setInitialParents(transformed);
    })();
  }, [
    query,
    selectedSuffixes,
    selectedTags,
    selectedKeywords
  ]);

  const extractCheckStates = (items) => items.map(i => ({
    isChecked: i.isChecked,
    children: i.children ? extractCheckStates(i.children) : null
  }));

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setTempParents(extractCheckStates(parents));
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleParentDropdown = (parentId) => setParents(p => p.map(par => par.id === parentId ? { ...par, isParentOpen: !par.isParentOpen } : par));
  const toggleChildDropdown = (parentId, childId) => setParents(p => p.map(par => par.id === parentId ? {
    ...par,
    children: par.children.map(ch => ch.id === childId ? { ...ch, isChildOpen: !ch.isChildOpen } : ch)
  } : par));
  const toggleSubchildDropdown = (parentId, childId, subchildId) => setParents(p => p.map(par => par.id === parentId ? {
    ...par,
    children: par.children.map(ch => ch.id === childId ? {
      ...ch,
      children: ch.children.map(sub => sub.id === subchildId ? { ...sub, isSubchildOpen: !sub.isSubchildOpen } : sub)
    } : ch)
  } : par));

  const toggleParentCheckbox = (parentId) => setParents(prev => prev.map(par => {
    if (par.id === parentId) {
      if (par.children) {
        const allChecked = par.children.every(ch => ch.isChecked);
        par.isChecked = !allChecked;
        par.children.forEach(ch => {
          ch.isChecked = !allChecked;
          ch.children?.forEach(sub => {
            sub.isChecked = !allChecked;
            sub.children?.forEach(gr => gr.isChecked = !allChecked);
          });
        });
      } else {
        par.isChecked = !par.isChecked;
      }
    }
    return par;
  }));

  const toggleChildCheckbox = (parentId, childId) => setParents(prev => prev.map(par => {
    if (par.id === parentId) {
      par.children = par.children.map(ch => {
        if (ch.id === childId) {
          if (ch.children) {
            const allSubChecked = ch.children.every(sub => sub.isChecked);
            ch.isChecked = !allSubChecked;
            ch.children.forEach(sub => {
              sub.isChecked = !allSubChecked;
              sub.children?.forEach(gr => gr.isChecked = !allSubChecked);
            });
          } else {
            ch.isChecked = !ch.isChecked;
          }
        }
        return ch;
      });
      par.isChecked = par.children.every(ch => ch.isChecked);
    }
    return par;
  }));

  const toggleSubchildCheckbox = (parentId, childId, subchildId) => setParents(prev => prev.map(par => {
    if (par.id === parentId) {
      par.children = par.children.map(ch => {
        if (ch.id === childId) {
          ch.children = ch.children.map(sub => {
            if (sub.id === subchildId) {
              if (sub.children) {
                const allGrandChecked = sub.children.every(gr => gr.isChecked);
                sub.isChecked = !allGrandChecked;
                sub.children.forEach(gr => gr.isChecked = !allGrandChecked);
              } else {
                sub.isChecked = !sub.isChecked;
              }
            }
            return sub;
          });
          ch.isChecked = ch.children.every(sub => sub.isChecked);
        }
        return ch;
      });
      par.isChecked = par.children.every(ch => ch.isChecked);
    }
    return par;
  }));

  const toggleGrandchildCheckbox = (parentId, childId, subchildId, grandId) => setParents(prev => prev.map(par => {
    if (par.id === parentId) {
      par.children = par.children.map(ch => {
        if (ch.id === childId) {
          ch.children = ch.children.map(sub => {
            if (sub.id === subchildId) {
              sub.children = sub.children.map(gr => gr.id === grandId ? { ...gr, isChecked: !gr.isChecked } : gr);
              sub.isChecked = sub.children.every(gr => gr.isChecked);
            }
            return sub;
          });
          ch.isChecked = ch.children.every(sub => sub.isChecked);
        }
        return ch;
      });
      par.isChecked = par.children.every(ch => ch.isChecked);
    }
    return par;
  }));

  const applySelection = () => {
    const values = [];
    const traverse = (items) => {
      items.forEach(it => {
        const addSelf = it.children ? it.children.every(ch => ch.isChecked) : it.isChecked;
        if (addSelf) values.push(it.value);
        it.children && traverse(it.children);
      });
    };
    traverse(parents);
    onUpdateSelectedCategories(values);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    const reset = (items) => items.map(it => ({
      ...it,
      isChecked: false,
      children: it.children ? reset(it.children) : null
    }));
    const cleared = reset(initialParents);
    setParents(cleared);
  };

  const resetCheckStates = (items, states) => items.map((it, i) => ({
    ...it,
    isChecked: states[i].isChecked,
    children: it.children ? resetCheckStates(it.children, states[i].children) : null
  }));

  const cancel = () => {
    setParents(resetCheckStates(parents, tempParents));
    setIsFilterOpen(false);
  };

  return (
    <div className="searchFilter categories">
      <Button className="filterButton" onClick={toggleFilter}>Categories</Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Products & Capabilities</div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>

          <div className="checkboxFormWrapper parent" key={parents.map(p => p.isChecked).join('-')}>
            {parents.map(parent => (
              <div className="filterCheckboxes" key={parent.id}>
                <div className="checkboxWrapper">
                  {parent.children ? (
                    <div className="filtersChevron" onClick={() => toggleParentDropdown(parent.id)}>
                      {parent.isParentOpen ? <ExpandMore /> : <ChevronRight />}
                    </div>
                  ) : <div className="noSublevels"></div>}
                  <FormControlLabel
                    label={`${parent.label} (${parent.count})`}
                    className="checkboxForm"
                    control={<Checkbox
                      className="filterCheckbox"
                      checked={parent.children ? parent.children.every(ch => ch.isChecked) : parent.isChecked}
                      indeterminate={parent.children && parent.children.some(ch => ch.isChecked) && !parent.children.every(ch => ch.isChecked)}
                      onChange={() => toggleParentCheckbox(parent.id)}
                    />}
                  />
                </div>

                {parent.children && (
                  <div className="checkboxFormWrapper child" style={{ display: parent.isParentOpen ? 'flex' : 'none' }} key={parent.children.map(c => c.isChecked).join('-')}>
                    {parent.children.map(child => (
                      <div className="filterCheckboxes" key={child.id}>
                        <div className="checkboxWrapper">
                          {child.children ? (
                            <div className="filtersChevron" onClick={() => toggleChildDropdown(parent.id, child.id)}>
                              {child.isChildOpen ? <ExpandMore /> : <ChevronRight />}
                            </div>
                          ) : <div className="noSublevels"></div>}
                          <FormControlLabel
                            className="checkboxForm"
                            label={`${child.label} (${child.count})`}
                            control={<Checkbox
                              className="filterCheckbox"
                              checked={child.children ? child.children.every(sub => sub.isChecked) : child.isChecked}
                              indeterminate={child.children && child.children.some(sub => sub.isChecked) && !child.children.every(sub => sub.isChecked)}
                              onChange={() => toggleChildCheckbox(parent.id, child.id)}
                            />}
                          />
                        </div>
                        {child.children && (
                          <div className="checkboxFormWrapper subchild" style={{ display: child.isChildOpen ? 'flex' : 'none' }} key={child.children.map(c => c.isChecked).join('-')}>
                            {child.children.map(subchild => (
                              <div className="filterCheckboxes" key={subchild.id}>
                                <div className="checkboxWrapper">
                                  {subchild.children ? (
                                    <div className="filtersChevron" onClick={() => toggleSubchildDropdown(parent.id, child.id, subchild.id)}>
                                      {subchild.isSubchildOpen ? <ExpandMore /> : <ChevronRight />}
                                    </div>
                                  ) : <div className="noSublevels"></div>}
                                  <FormControlLabel
                                    className="checkboxForm"
                                    label={`${subchild.label} (${subchild.count})`}
                                    control={<Checkbox
                                      className="filterCheckbox"
                                      checked={subchild.children ? subchild.children.every(gr => gr.isChecked) : subchild.isChecked}
                                      indeterminate={subchild.children && subchild.children.some(gr => gr.isChecked) && !subchild.children.every(gr => gr.isChecked)}
                                      onChange={() => toggleSubchildCheckbox(parent.id, child.id, subchild.id)}
                                    />}
                                  />
                                </div>
                                {subchild.children && (
                                  <div className="checkboxFormWrapper grandchild" style={{ display: subchild.isSubchildOpen ? 'flex' : 'none' }} key={subchild.children.map(c => c.isChecked).join('-')}>
                                    {subchild.children.map(grandchild => (
                                      <div className="filterCheckboxes" key={grandchild.id}>
                                        <div className="checkboxWrapper">
                                          <FormControlLabel
                                            className="checkboxForm"
                                            label={`${grandchild.label} (${grandchild.count})`}
                                            control={<Checkbox
                                              className="filterCheckbox"
                                              checked={grandchild.isChecked}
                                              onChange={() => toggleGrandchildCheckbox(parent.id, child.id, subchild.id, grandchild.id)}
                                            />}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
