import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ExpandMore, ChevronRight } from "@mui/icons-material";

export default function CategoriesFilter({onUpdateSelectedCategories}) {

  const [parents, setParents] = useState([]);
  const [initialParents, setInitialParents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
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
  }, []);

  /*Mapiranje Filtera*/
  const mapData = (data) => {
    return data.map(item => {
      let mappedItem = {
        id: item.id,
        label: item.name.EN || item.name.DE,
        value: item.id.toString()
      };
  
      if (item.children && item.children.length > 0) {
        mappedItem.children = mapChildren(item.children);
      }
  
      return mappedItem;
    });
  };
  
  const mapChildren = (children) => {
    return children.map(child => {
      let mappedChild = {
        id: child.id,
        label: child.name.EN || child.name.DE,
        value: child.id.toString()
      };
  
      if (child.children && child.children.length > 0) {
        mappedChild.subchildren = mapSubchildren(child.children);
      }
  
      return mappedChild;
    });
  };
  
  const mapSubchildren = (subchildren) => {
    return subchildren.map(subchild => {
      let mappedSubchild = {
        id: subchild.id,
        label: subchild.name.EN || subchild.name.DE,
        value: subchild.id.toString()
      };
  
      if (subchild.children && subchild.children.length > 0) {
        mappedSubchild.grandchildren = mapGrandchildren(subchild.children);
      }
  
      return mappedSubchild;
    });
  };
  
  const mapGrandchildren = (grandchildren) => {
    return grandchildren.map(grandchild => {
      return {
        id: grandchild.id,
        label: grandchild.name.EN || grandchild.name.DE,
        value: grandchild.id.toString()
      };
    });
  };
  
  /* Otvaranje Filtera i Dropdowna  */

  const toggleFilter = () => {
    if (!isFilterOpen) {
      const tempCheckStates = parents.map(parent => parent.isChecked);
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
            child.subchildren = child.subchildren.map(subchild => {
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
            if (child.subchildren) {
              child.subchildren.forEach(subchild => {
                subchild.isChecked = !allChildrenChecked
                if (subchild.grandchildren) {
                  subchild.grandchildren.forEach(grandchild => grandchild.isChecked = !allChildrenChecked);
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
            if (child.subchildren) {
              const allSubchildrenChecked = child.subchildren.every(subchild => subchild.isChecked);
              child.isChecked = !allSubchildrenChecked;
              child.subchildren.forEach(subchild => {
                subchild.isChecked = !allSubchildrenChecked;
                if (subchild.grandchildren) {
                  subchild.grandchildren.forEach(grandchild => grandchild.isChecked = !allSubchildrenChecked);
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
            child.subchildren = child.subchildren.map(subchild => {
              if (subchild.id === subchildId) {
                if (subchild.grandchildren) {
                  const allGrandchildrenChecked = subchild.grandchildren.every(grandchild => grandchild.isChecked);
                  subchild.isChecked = !allGrandchildrenChecked;
                  subchild.grandchildren.forEach(grandchild => grandchild.isChecked = !allGrandchildrenChecked);
                } else {
                  subchild.isChecked = !subchild.isChecked;
                } 
              }
              return subchild;
            });
            const allSubchildrenChecked = child.subchildren.every(subchild => subchild.isChecked);
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
            child.subchildren = child.subchildren.map(subchild => {
              if (subchild.id === subchildId) {
                subchild.grandchildren = subchild.grandchildren.map(grandchild => {
                  if (grandchild.id === grandchildID) {
                    grandchild.isChecked = !grandchild.isChecked;
                  }
                  return grandchild;
              });
                const allGrandchildrenChecked = subchild.grandchildren.every(grandchild => grandchild.isChecked);
                subchild.isChecked = allGrandchildrenChecked;    
              }
              return subchild;
            });
            const allSubchildrenChecked = child.subchildren.every(subchild => subchild.isChecked);
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
        const addChildValue = child.subchildren ? child.subchildren.every(subchild => subchild.isChecked) : child.isChecked;

        addChildValue && values.push(child.value);

        child.subchildren?.forEach(subchild => {
          const addGrandhildValue = subchild.grandchildren ? subchild.grandchildren.every(grandchild => grandchild.isChecked) : subchild.isChecked;

          addGrandhildValue && values.push(subchild.value);

          subchild.grandchildren?.forEach(grandchild => {
            if (grandchild.isChecked) {
              values.push(grandchild.value);
            }
          })
        })  
      })
    });

    console.log(values);
    setSelectedValues(values);
    onUpdateSelectedCategories(values);
    setIsFilterOpen(false);
  };

  /* Restartovanje stanja svih Checkboxova */

  const clearAll = () => {
    setParents(initialParents.map(parent => {     
      parent.isChecked = false;
      parent.children?.forEach(child => {
        child.isChecked = false;
        child.subchildren?.forEach(subchild => {
          subchild.isChecked = false;
          subchild.grandchildren?.forEach(grandchild => {
            grandchild.isChecked = false;
          })
        })
      });
      return parent;
    }));
    setSelectedValues([]);
    onUpdateSelectedCategories([]);
  };

  /* Zatvaranje Filtera */

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
    <div>
        <Button variant="outlined" onClick={toggleFilter}>
            Categories
        </Button>

        {isFilterOpen && (
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 32 }}
                key={parents?.map(c => c.isChecked).join('-')}
          >
            {parents?.map(parent => (
                <div key={parent.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {parent.children && (
                      <div onClick={() => toggleParentDropdown(parent.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                        {parent.isParentOpen ? <ExpandMore /> : <ChevronRight />}
                      </div>  
                    )}                         
                    <FormControlLabel
                        label={parent.label}
                        control={
                            <Checkbox
                                checked={parent.children ? parent.children.every(child => child.isChecked) : parent.isChecked}
                                indeterminate={parent.children && parent.children.some((child) => child.isChecked) && !parent.children.every((child) => child.isChecked) }
                                onChange={() => toggleParentCheckbox(parent.id)}
                            />
                        }
                    />                        
                  </div>
                  {parent.children &&
                    <Box sx={{ display: parent.isParentOpen ? 'flex' : 'none', flexDirection: 'column', ml: 32 }}
                        key={parent.children.map(c => c.isChecked).join('-')}
                    >   
                      {parent.children.map(child => (
                          <div key={child.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            {child.subchildren && (
                              <div onClick={() => toggleChildDropdown(parent.id, child.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {child.isChildOpen ? <ExpandMore /> : <ChevronRight />}
                              </div>
                            )}  
                              <FormControlLabel
                                  label={child.label}
                                  control={
                                      <Checkbox
                                          checked={child.subchildren ? child.subchildren.every(subchild => subchild.isChecked) : child.isChecked}
                                          indeterminate={child.subchildren && child.subchildren.some(subchild => subchild.isChecked) && !child.subchildren.every(subchild => subchild.isChecked)}
                                          onChange={() => toggleChildCheckbox(parent.id, child.id)}
                                      />
                                  }
                              />
                              {child.subchildren && 
                                <Box sx={{ display: child.isChildOpen  ? 'flex' : 'none', flexDirection: 'column', ml: 32 }}
                                    key={child.subchildren.map(c => c.isChecked).join('-')}
                                >   
                                  {child.subchildren.map(subchild => (
                                    <div key={child.id}>
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                      {subchild.grandchildren && (
                                        <div onClick={() => toggleSubchildDropdown(parent.id, child.id, subchild.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                          {subchild.isSubchildOpen ? <ExpandMore /> : <ChevronRight />}
                                        </div>
                                      )}  
                                        <FormControlLabel
                                          label={subchild.label}
                                          control={
                                              <Checkbox
                                                  checked={subchild.grandchildren ? subchild.grandchildren.every(grandchild => grandchild.isChecked) : subchild.isChecked}
                                                  indeterminate={subchild.grandchildren && subchild.grandchildren.some(grandchild => grandchild.isChecked) && !subchild.grandchildren.every(grandchild => grandchild.isChecked)}
                                                  onChange={() => toggleSubchildCheckbox(parent.id, child.id, subchild.id)}
                                              />
                                          }                                                
                                        />
                                        {subchild.grandchildren && 
                                          <Box sx={{ display: subchild.isSubchildOpen  ? 'flex' : 'none', flexDirection: 'column', ml: 32 }}
                                              key={subchild.grandchildren.map(c => c.isChecked).join('-')}
                                          >   
                                            {subchild.grandchildren.map(grandchild => (
                                                <div key={grandchild.id} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FormControlLabel
                                                      label={grandchild.label}
                                                      control={
                                                          <Checkbox
                                                              checked={grandchild.isChecked}
                                                              onChange={() => toggleGrandchildCheckbox(parent.id, child.id, subchild.id, grandchild.id)}
                                                          />
                                                      }                                                
                                                    />
                                                </div>
                                            ))}
                                          </Box>
                                        }
                                      </div>
                                    </div>
                                  ))}
                                </Box>
                              }
                            </div>  
                          </div>
                      ))}
                    </Box>  
                  } 
                </div>
            ))}

            <div>
                <Button variant="contained" color="primary" onClick={applySelection}>
                    Apply
                </Button>
                <Button variant="outlined" onClick={clearAll}>
                    Clear All
                </Button>
                <Button variant="outlined" onClick={cancel}>
                  Cancel
                </Button>
            </div>
          </Box>
        )}
    </div>
  )
}