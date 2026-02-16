import MenuItem from "./MenuItem";

function Dropdown({submenus,dropdown,depthLevel}) {

  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return ( 
    <ul className = {`dropdown ${dropdownClass} level-${depthLevel} ${dropdown ? "show" : ""}`}>
      {
        submenus.map((submenu, index) => {
          return (
            <MenuItem
              item = {submenu}
              key = {index}
              depthLevel = {depthLevel}
            />
          );
        })
      } 
    </ul>
  )
}

export default Dropdown;