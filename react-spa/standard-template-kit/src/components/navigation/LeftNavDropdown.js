import LeftNavMenuItem from "./LeftNavMenuItem";

function LeftNavDropdown({submenus,itemIndex,dropdown,depthLevel}) {

  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return ( 
    <ul className = {`dropdown ${dropdownClass} level-${depthLevel} ${dropdown ? "show" : ""}`}>
      {
        submenus.map((submenu, index) => {
          return (
            <LeftNavMenuItem
              item = {submenu}
              key = {index}
              itemIndex = {`${itemIndex} ${index}`}
              depthLevel = {depthLevel}
            />
          );
        })
      } 
    </ul>
  )
}

export default LeftNavDropdown;