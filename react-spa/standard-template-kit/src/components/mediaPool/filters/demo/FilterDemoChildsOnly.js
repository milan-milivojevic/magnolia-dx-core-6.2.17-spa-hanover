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
      children: [
        { id: 1, label: "Child 1", value: "value 1" }, // Dodato `value`
        { id: 2, label: "Child 2", value: "value 2" },
        { id: 3, label: "Child 3", value: "value 3" },
        // Add more children for Parent 1
      ],
    },
    {
      id: 2,
      label: "Parent 2",
      children: [
        { id: 4, label: "Child 4", value: "value 4" },
        { id: 5, label: "Child 5", value: "value 5" },
        // Add more children for Parent 2
      ],
    },
    // Add more parents here
  ];

  const [parents, setParents] = React.useState(initialParents);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleParent = (parentId) => {

    console.log("toggleParent parentId")
    console.log(parentId)

    setParents((prevState) => {

      console.log("toggleParent prevState")
      console.log(prevState)
      
      return prevState.map((parent) => {

        console.log("toggleParent parent")
        console.log(parent)

        if (parent.id === parentId) {

          console.log("toggleParent parent.isParentOpen")
          console.log(parent.isParentOpen)

          parent.isParentOpen = !parent.isParentOpen;
        }       

        return parent;
      });
    });
  };

  const toggleParentCheckbox = (parentId) => {

    console.log("toggleParentCheckbox parentId");
    console.log(parentId);

    setParents((prevState) => {

      console.log("toggleParentCheckbox prevState")
      console.log(prevState)

      return prevState.map((parent) => {

        console.log("toggleParentCheckbox parent")
        console.log(parent)

        if (parent.id === parentId) {
          
          const allChildrenChecked = parent.children.every((child) => child.isChecked);

          console.log("toggleParentCheckbox allChildrenChecked")
          console.log(allChildrenChecked)

          parent.children = parent.children.map((child) => {

            console.log("toggleParentCheckbox child1")
            console.log(child)

            child.isChecked = !allChildrenChecked;

            console.log("toggleParentCheckbox child2")
            console.log(child)

            return child;
          });
        }
        return parent;
      });
    });
  };
  

  const toggleChildCheckbox = (parentId, childId) => {

    console.log("toggleChildCheckbox parentId");
    console.log(parentId);
    console.log("toggleChildCheckbox childId");
    console.log(childId);


    setParents((prevState) => {

      console.log("toggleChildCheckbox prevState");
      console.log(prevState);

      return prevState.map((parent) => {        
        
        console.log("toggleChildCheckbox parent");
        console.log(parent);

        if (parent.id === parentId) {

          parent.children = parent.children.map((child) => {

            console.log("toggleChildCheckbox child1");
            console.log(child);

            if (child.id === childId) {
              child.isChecked = !child.isChecked;
            }

            console.log("toggleChildCheckbox child2")
            console.log(child)

            return child;
          });
        }

        return parent;
      });
    });
  };  


  const applySelection = () => {
    const values = [];
    parents.forEach(parent => {
      parent.children.forEach(child => {
        if (child.isChecked) {
          values.push(child.value);
        }
      });
    });
    setSelectedValues(values);
    console.log(values);
  };

  const clearAll = () => {
    setParents(parents => {
      return parents.map(parent => {
        parent.children = parent.children.map(child => {
          child.isChecked = false;
          return child;
        });
        return parent;
      });
    });
    setSelectedValues([]); // Resetuj selektovane vrednosti
  };

  const close = () => {
    clearAll();
    setIsFilterOpen(false);
  };

  return (
    <div>
      <div>
        <div onClick={toggleFilter} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {isFilterOpen ? <ExpandMore /> : <ChevronRight />} {/* Chevron icon */}
          <span>Filter</span>
        </div>
        {isFilterOpen && (
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 32 }}>
            {parents.map((parent) => (
              <div key={parent.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div onClick={() => toggleParent(parent.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                    {parent.isParentOpen ? <ExpandMore /> : <ChevronRight />} {/* Chevron icon */}
                  </div>
                  <FormControlLabel
                    label={parent.label}
                    control={
                      <Checkbox
                        checked={parent.children.every((child) => child.isChecked)}
                        indeterminate={
                          parent.children.some((child) => child.isChecked) &&
                          !parent.children.every((child) => child.isChecked)
                        }
                        onChange={() => toggleParentCheckbox(parent.id)}
                      />
                    }
                  />
                </div>
                <Box 
                  sx={{ 
                    display: parent.isParentOpen ? 'flex' : 'none', 
                    flexDirection: 'column', 
                    ml: 32 
                  }}
                  key={parent.children.map(c => c.isChecked).join('-')} // Dodajte ovu liniju
                >
                  {parent.children.map((child) => (
                    <FormControlLabel
                      key={child.id}
                      label={child.label}
                      control={
                        <Checkbox
                          checked={child.isChecked}
                          onChange={() => toggleChildCheckbox(parent.id, child.id)}
                        />
                      }
                    />
                  ))}
                </Box>
              </div>
            ))}
          </Box>
        )}
      </div>
      {isFilterOpen && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={applySelection}>Apply</Button>
          <Button variant="outlined" color="primary" onClick={clearAll}>Clear All</Button>
          <Button variant="outlined" onClick={close}>Close</Button>
        </Box>
      )}
    </div>
  );
}