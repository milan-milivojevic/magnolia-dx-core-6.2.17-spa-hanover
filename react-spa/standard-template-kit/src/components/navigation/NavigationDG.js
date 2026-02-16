import React from "react";
import MenuItem from "./MenuItem";

import { getAPIBase } from "../../helpers/AppHelpers";

function Navigation(props, ref) {

  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {

    async function fetchNav() {
      const apiBase = getAPIBase();
      const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
      const response = await fetch(url);
      const data = await response.json();

      let lvl1Items = data["@nodes"].map((nodeName) => {
        return data[nodeName];
      });
      let lvl1ItemsHome = [data, ...lvl1Items];
      const activelvl1Items= lvl1ItemsHome.filter((item) => item.hide !== ("true" || true));
      
      const addChildElements = (item) => {
        const navArrObj = {
          name: item.title || item["@name"],
          path: item["@path"],
          id: item["@id"],
          hide: item.hide || false
        };        
        if (item["@nodes"].length > 0) {
          navArrObj.children = getChildren(item);
        }
        return navArrObj;
      };

      const getChildren = (item) => {
        const childrenArr = [];
        item["@nodes"].forEach((childItem) => {
          const child = item[`${childItem}`];
          const childObject = {
            name: child.title || child["@name"],
            path: child["@path"],
            id: item["@id"],
            hide: item.hide || false,
            children: [],
          };
          childrenArr.push(childObject);
          if (child["@nodes"].length > 0) {
            childObject.children = getChildren(child);
          }
        });
        return childrenArr;
      };

      let navArr = [];      
      activelvl1Items.forEach((item) => {
        navArr.push(addChildElements(item));
      });

      setNavItems([...navArr]);
    }

    if (navItems.length < 1) {
      fetchNav();
    }
  }, [navItems]);

  return (
    <React.Fragment>
    <nav className="topNav" ref={ref}>        
      <ul className ={`menus col-${navItems?.length}`}> {
          navItems.map((item, index) => {            
            const depthLevel = 0;

            return (
              <MenuItem
                item = {item}
                itemIndex = {index}
                key = {index}
                depthLevel = {depthLevel}
              />
            );
          })
      } 
      </ul>       
    </nav>
    </React.Fragment>
  )
};

export default Navigation;