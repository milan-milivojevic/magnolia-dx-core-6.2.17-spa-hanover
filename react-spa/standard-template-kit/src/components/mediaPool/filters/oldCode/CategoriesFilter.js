import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";

export default function CategoriesFilter({onUpdateSelectedCategories, selectedCategories}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempParents, setTempParents] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  /* Dohvatanje Filtera */
  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.2/themes`)
      .then((response) => response.json())
      .then((data) => {
        const transformedParents = mapData(data);
        setParents(transformedParents);
        setInitialParents(transformedParents);
      })
      .catch((error) => {
        console.error("Greška prilikom preuzimanja podataka:", error);
      });
  }, [selectedCategories]);

  const mapItems = (items) => {
    return items.map(item => {
      let mappedItem = {
        id: item.id,
        label: item.name.EN || item.name.DE,
        value: item.id.toString(),
        isChecked: selectedCategories?.includes(item.id.toString())
      };
  
      if (item.children && item.children.length > 0) {
        mappedItem.children = mapItems(item.children);
      }
  
      return mappedItem;
    });
  };

  const mapData = (data) => {
    return mapItems(data);
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
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {
        parent.isParentOpen = !parent.isParentOpen;
      }
      return parent;
    }));
  };

  const toggleChildDropdown = (parentId, childId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {
        parent.children = parent.children.map(child => {
          if (child.id === childId) {
            child.isChildOpen = !child.isChildOpen;
          }
          return child;
        });
      }
      return parent;
    }));
  };

  const toggleSubchildDropdown = (parentId, childId, subchildId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {
        parent.children = parent.children.map(child => {
          if (child.id === childId) {
            child.children = child.children.map(subchild => {
              if (subchild.id === subchildId) {
                subchild.isSubchildOpen = !subchild.isSubchildOpen;
              }
              return subchild;
            })
          }
          return child;
        });
      }
      return parent;
    }));
  };

  /* Hendlovanje promena stanja Checkbox-ova */

  const toggleParentCheckbox = (parentId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {
        if (parent.children) {
          const allChildrenChecked = parent.children.every(child => child.isChecked);
            parent.isChecked = !parent.allChildrenChecked;
            parent.children.forEach(child => {
            child.isChecked = !allChildrenChecked;
            if (child.children) {
              child.children.forEach(subchild => {
                subchild.isChecked = !allChildrenChecked
                if (subchild.children) {
                  subchild.children.forEach(grandchild => grandchild.isChecked = !allChildrenChecked);
                }
              })
            }
          })
        } else {
          parent.isChecked = !parent.isChecked;
        }
      }
      return parent;
    }));
  };

  const toggleChildCheckbox = (parentId, childId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {            
        parent.children = parent.children.map(child => {
          if (child.id === childId) {
            if (child.children) {
              const allSubchildrenChecked = child.children.every(subchild => subchild.isChecked);
              child.isChecked = !allSubchildrenChecked;
              child.children.forEach(subchild => {
                subchild.isChecked = !allSubchildrenChecked;
                if (subchild.children) {
                  subchild.children.forEach(grandchild => grandchild.isChecked = !allSubchildrenChecked);
                }
              })
            } else {
              child.isChecked = !child.isChecked;
            }
          }
          return child;
        });
        const allChildrenChecked = parent.children.every(child => child.isChecked);
        parent.isChecked = allChildrenChecked;
      }
      return parent;
    }));
  };

  const toggleSubchildCheckbox = (parentId, childId, subchildId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {       
        parent.children = parent.children.map(child => {
          if (child.id === childId) {            
            child.children = child.children.map(subchild => {
              if (subchild.id === subchildId) {
                if (subchild.children) {
                  const allGrandchildrenChecked = subchild.children.every(grandchild => grandchild.isChecked);
                  subchild.isChecked = !allGrandchildrenChecked;
                  subchild.children.forEach(grandchild => grandchild.isChecked = !allGrandchildrenChecked);
                } else {
                  subchild.isChecked = !subchild.isChecked;
                } 
              }
              return subchild;
            });
            const allSubchildrenChecked = child.children.every(subchild => subchild.isChecked);
            child.isChecked = allSubchildrenChecked;      
          }
          return child;
        });
        const allChildrenChecked = parent.children.every(child => child.isChecked);
        parent.isChecked = allChildrenChecked;
      }
      return parent;
    }));
  };

  const toggleGrandchildCheckbox = (parentId, childId, subchildId, grandchildID) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {       
        parent.children = parent.children.map(child => {
          if (child.id === childId) {            
            child.children = child.children.map(subchild => {
              if (subchild.id === subchildId) {
                subchild.children = subchild.children.map(grandchild => {
                  if (grandchild.id === grandchildID) {
                    grandchild.isChecked = !grandchild.isChecked;
                  }
                  return grandchild;
              });
                const allGrandchildrenChecked = subchild.children.every(grandchild => grandchild.isChecked);
                subchild.isChecked = allGrandchildrenChecked;    
              }
              return subchild;
            });
            const allSubchildrenChecked = child.children.every(subchild => subchild.isChecked);
            child.isChecked = allSubchildrenChecked;      
          }
          return child;
        });
        const allChildrenChecked = parent.children.every(child => child.isChecked);
        parent.isChecked = allChildrenChecked;
      }
      return parent;
    }));
  };

  /* Pakovanje selektovanih vrednosti u niz i zatvaranje filtera */
  
  const applySelection = () => {
    const values = [];

    parents.forEach(parent => {
      const addParentValue =  parent.children ? parent.children.every(child => child.isChecked) : parent.isChecked;

      addParentValue && values.push(parent.value);

      parent.children?.forEach(child => {
        const addChildValue = child.children ? child.children.every(subchild => subchild.isChecked) : child.isChecked;

        addChildValue && values.push(child.value);

        child.children?.forEach(subchild => {
          const addGrandhildValue = subchild.children ? subchild.children.every(grandchild => grandchild.isChecked) : subchild.isChecked;

          addGrandhildValue && values.push(subchild.value);

          subchild.children?.forEach(grandchild => {
            if (grandchild.isChecked) {
              values.push(grandchild.value);
            }
          })
        })  
      })
    });

    onUpdateSelectedCategories(values);
    setIsFilterOpen(false);
  };

  /* Restartovanje stanja svih Checkboxova */

  const clearAll = () => {
    setParents(initialParents.map(parent => {     
      parent.isChecked = false;
      parent.children?.forEach(child => {
        child.isChecked = false;
        child.children?.forEach(subchild => {
          subchild.isChecked = false;
          subchild.children?.forEach(grandchild => {
            grandchild.isChecked = false;
          })
        })
      });
      return parent;
    }));
  };

  /* Zatvaranje Filtera */

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
    <div className="searchFilter categories">
      <Button className="filterButton" onClick={toggleFilter}>
        Categories
      </Button>

      {isFilterOpen && (
        <div className="filterDropdown">
          <div className="filterOverlay" onClick={toggleFilter}></div>
          <div className="filterHeader">
            <div className="filterName">Categories</div>
            <button className="closeFilter" onClick={toggleFilter}><AiOutlineClose /></button>
          </div>
          <div className="checkboxFormWrapper parent"
            key={parents.map(c => c.isChecked).join('-')}
          >
            {parents?.map(parent => (
              <div className="filterCheckboxes" key={parent.id}>
                <div className="checkboxWrapper">
                  {parent.children ? (
                    <div className="filtersChevron" onClick={() => toggleParentDropdown(parent.id)}>
                      {parent.isParentOpen ? <ExpandMore /> : <ChevronRight />}
                    </div>
                  ): <div className="noSublevels"></div>}
                  <FormControlLabel
                    label={parent.label}
                    className="checkboxForm"
                    control={
                      <Checkbox
                        className="filterCheckbox"
                        checked={parent.children ? parent.children.every(child => child.isChecked) : parent.isChecked}
                        indeterminate={parent.children && parent.children.some((child) => child.isChecked) && !parent.children.every((child) => child.isChecked)}
                        onChange={() => toggleParentCheckbox(parent.id)}
                      />
                    }
                  />
                </div>
                {parent.children &&
                  <div className="checkboxFormWrapper child" style={{ display: parent.isParentOpen ? 'flex' : 'none' }}
                    key={parent.children.map(c => c.isChecked).join('-')}
                  >
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
                            label={child.label}
                            control={
                              <Checkbox
                                className="filterCheckbox"
                                checked={child.children ? child.children.every(subchild => subchild.isChecked) : child.isChecked}
                                indeterminate={child.children && child.children.some(subchild => subchild.isChecked) && !child.children.every(subchild => subchild.isChecked)}
                                onChange={() => toggleChildCheckbox(parent.id, child.id)}
                              />
                            }
                          />
                        </div>
                        {child.children &&
                          <div className="checkboxFormWrapper subchild" style={{ display: child.isChildOpen ? 'flex' : 'none' }}
                            key={child.children.map(c => c.isChecked).join('-')}
                          >
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
                                    label={subchild.label}
                                    control={
                                      <Checkbox
                                        className="filterCheckbox"
                                        checked={subchild.children ? subchild.children.every(grandchild => grandchild.isChecked) : subchild.isChecked}
                                        indeterminate={subchild.children && subchild.children.some(grandchild => grandchild.isChecked) && !subchild.children.every(grandchild => grandchild.isChecked)}
                                        onChange={() => toggleSubchildCheckbox(parent.id, child.id, subchild.id)}
                                      />
                                    }
                                  />
                                </div>
                                {subchild.children &&
                                  <div className="checkboxFormWrapper grandchild" style={{ display: subchild.isSubchildOpen ? 'flex' : 'none' }}
                                    key={subchild.children.map(c => c.isChecked).join('-')}
                                  >
                                    {subchild.children.map(grandchild => (
                                      <div className="filterCheckboxes" key={grandchild.id}>
                                        <div className="checkboxWrapper">
                                          <FormControlLabel
                                            className="checkboxForm"
                                            label={grandchild.label}
                                            control={
                                              <Checkbox
                                                className="filterCheckbox"
                                                checked={grandchild.isChecked}
                                                onChange={() => toggleGrandchildCheckbox(parent.id, child.id, subchild.id, grandchild.id)}
                                              />
                                            }
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                }
                              </div>
                            ))}
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                }
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