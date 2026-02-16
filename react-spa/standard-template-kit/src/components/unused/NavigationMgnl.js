import React from "react";
import {
  events,
  getRouterBasename,
  getAPIBase,
  getLanguages,
  getCurrentLanguage,
  changeLanguage,
} from "../../helpers/AppHelpers";

function renderLanguages() {
  const currentLanguage = getCurrentLanguage();

  return (
    <div className="languages">
      {getLanguages().map((lang) => (
        <span
          key={`lang-${lang}`}
          data-active={currentLanguage === lang}
          onClick={() => changeLanguage(lang)}
        >
          {lang}
        </span>
      ))}
    </div>
  );
}

function Navigation() {
  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchNav() {
      const apiBase = getAPIBase();
      const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
      console.log("NAV URL: ", url);
      const response = await fetch(url);
      console.log("response: ", response);
      const data = await response.json();
      console.log("data: ", data);
      console.log("data[@nodes]: ", data["@nodes"]);
      let lvl1Items = data["@nodes"].map((nodeName) => {
        console.log("data[nodeName]: ", data[nodeName]);
        return data[nodeName];
      });
      console.log("LVL 1", lvl1Items);

      const addChildElements = (item) => {
        console.log("LVL 1 item: ", item);
        const navArrObj = {
          name: item["@name"],
          path: item["@path"],
          id: item["@id"],
          children: [],
        };        
        if (item["@nodes"].length > 0) {
          navArrObj.children.push(getChildren(item));
        }
        return navArrObj;
      };

      const getChildren = (item) => {
        const childrenArr = [];
        item["@nodes"].forEach((childItem) => {
          const child = item[`${childItem}`];
          const childObject = {
            name: child["@name"],
            path: child["@path"],
            id: item["@id"],
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
      lvl1Items.forEach((item) => {
        navArr.push(addChildElements(item));
      });

      console.log("NAV ARRAAAY: ", navArr);

      // const lvl2Items = lvl1Items
      //   .flatMap((nodeName) =>
      //     nodeName["@nodes"].map((childName) => nodeName[childName])
      //   )
      //   .filter((item) => item !== undefined);

      // const lvl3Items = lvl2Items
      //   .flatMap((nodeName) =>
      //     nodeName["@nodes"].map((childName) => nodeName[childName])
      //   )
      //   .filter((item) => item !== undefined);

      // let childItems = items.map((nodeName, i) => {
      //   const child = nodeName['@nodes'];
      //   console.log(child);

      //   let children = child.map((childName) => {
      //     console.log(nodeName[childName]);
      //     return nodeName[childName];
      //   })

      //   console.log(children);
      //   return children[i];
      // });

      // console.log(childItems);
      // let definedChildItems = childItems.filter(item => item !== undefined);
      // console.log(definedChildItems);

      setNavItems([...lvl1Items]);
    }

    if (navItems.length < 1) {
      fetchNav();
    }
  }, [navItems]);

  console.log("navItems: ", navItems);

  return navItems ? (
    <nav className="Navigation">
      {navItems.map((item) => {
        let newHref = (getRouterBasename() + item["@path"].replace(process.env.REACT_APP_MGNL_APP_BASE, "")).replace("//", "/");

        return (
          <a
            key={item["@id"]}
            href={newHref}
            onClick={(e) => {
              e.preventDefault();

              window.history.pushState({}, "", e.currentTarget.href);
              events.emit("popstate");
            }}
          >
            {item.navigationTitle || item.title || item["@name"]}
          </a>
        );
      })}
      {renderLanguages()}
    </nav>
  ) : (
    <div />
  );
}

export default Navigation;
