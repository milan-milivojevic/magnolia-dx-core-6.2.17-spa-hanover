import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ExpandMore, ChevronRight } from "@mui/icons-material";

export default function IndeterminateCheckbox() {
  const initialParents = [
    {
      id: 1,
      label: "Parent 1",
      value: "Parent 1",
      children: [
        { id: 11, label: "Child 1.1", value: "Child 1.1" },
        { id: 12, 
          label: "Child 1.2",
          value: "Child 1.2",
          subchildren: [
            { id: 121, 
              label: "Subchild 1.2.1", 
              value: "Subchild 1.2.1",
              grandchildren: [
                { id: 1211, label: "Subchild 1.2.1.1",value: "Subchild 1.2.1.3" },
                { id: 1212, label: "Subchild 1.2.1.2", value: "Subchild 1.2.1.2" }
              ] },
            { id: 122, label: "Subchild 1.2.2", value: "Subchild 1.2.2" }
          ]
        },
        { id: 13,
          label: "Child 1.3",
          value: "Child 1.3",
          subchildren: [
            { id: 131, label: "Subchild 1.3.1",value: "Subchild 1.3.1" },
            { id: 132,
              label: "Subchild 1.3.2",
              value: "Subchild 1.3.2",
              grandchildren: [
                { id: 1321, label: "Subchild 1.3.2.1",value: "Subchild 1.3.2.3" },
                { id: 1322, label: "Subchild 1.3.2.2", value: "Subchild 1.3.2.2" }
              ] 
             }
          ]
        },
        // Add more children for Parent 1
      ],
    },
    {
      id: 2,
      label: "Parent 2",
      value: "Parent 2",
      children: [
        { id: 21, label: "Child 2.1", value: "Child 2.1" },
        { id: 22, 
          label: "Child 2.2",
          value: "Child 2.2",
          subchildren: [
            { id: 221, label: "Subchild 2.2.1",value: "Subchild 2.2.1" },
            { id: 222, label: "Subchild 2.2.2", value: "Subchild 2.2.2" }
          ]
        },
        { id: 23, label: "Child 2.3", value: "Child 2.3" },
      ],
    },
    {
      id: 3,
      label: "Parent 3",
      value: "Parent 3",
    }
    // Add more parents here
  ];

  const [parents, setParents] = React.useState(initialParents);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const toggleFilter = () => {
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

  const toggleParentCheckbox = (parentId) => {
    setParents(prevState => prevState.map(parent => {
      if (parent.id === parentId) {
        if (parent.children) {
          const allChildrenChecked = parent.children.every(child => child.isChecked);
          if (allChildrenChecked) {
            parent.children.forEach(child => {
            child.isChecked = false;
            if (child.subchildren) {
              child.subchildren.forEach(subchild => {
                subchild.isChecked = false
                if (subchild.grandchildren) {
                  subchild.grandchildren.forEach(grandchild => grandchild.isChecked = false);
                }
              })
            }
          })} else {
            parent.children.forEach(child => {
              child.isChecked = true;
              if (child.subchildren) {
                child.subchildren.forEach(subchild => {
                  subchild.isChecked = true
                  if (subchild.grandchildren) {
                    subchild.grandchildren.forEach(grandchild => grandchild.isChecked = true);
                  }
                })
              }
            })
          }
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
              const allSubchildrenChecked = child.subchildren && child.subchildren.every(subchild => subchild.isChecked);
              child.isChecked = !allSubchildrenChecked;            
              child.subchildren.forEach(subchild => subchild.isChecked = !allSubchildrenChecked);
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
  };

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
  };

  const close = () => {
    clearAll();
    setIsFilterOpen(false);
  };


  return (
    <div>
        <Button variant="outlined" onClick={toggleFilter}>
            Filter
        </Button>

        {isFilterOpen && (
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 32 }}
                key={parents.map(c => c.isChecked).join('-')}
          >
            {parents.map(parent => (
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
                <Button variant="outlined" onClick={close}>
                    Close
                </Button>
            </div>
          </Box>
        )}
    </div>
  )
}