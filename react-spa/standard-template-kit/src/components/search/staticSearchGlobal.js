import React, { useState, useEffect } from 'react';
import { getAPIBase } from "../../helpers/AppHelpers";
import { IoSearchOutline } from 'react-icons/io5';
import '../../css.css';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';

function StaticSearch ({globalQuery}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_SEARCH;

  const [descriptionsArr, setDescriptionsArr] = useState([]);
  const [headlinesArr, setHeadlinesArr] = useState([]);
  const [titlesArr, setTitlesArr] = useState([]);
  const [query, setQuery] = useState("");  
  const [tempQuery, setTempQuery] = useState("");
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    console.log(globalQuery);
    if (globalQuery !== null && globalQuery !== undefined)  {
      setQuery(globalQuery);
      setTempQuery(globalQuery);
      fetchData(globalQuery);
    }
  }, [globalQuery]);

  const fetchData = (searchQuery) => {

    setDescriptionsArr([]);
    setHeadlinesArr([]);
    setTitlesArr([]);

    const lowercasedQuery = encodeURIComponent(searchQuery.toLowerCase());
    
    fetch(`${apiBase}${restPath}?description%5Blike%5D=%25${lowercasedQuery}%25`)
      .then(response => response.json())
      .then(data => {
        setDescriptionsArr(data.results || []);
      })
      .catch(() => setDescriptionsArr([]));
    
    fetch(`${apiBase}${restPath}?headline%5Blike%5D=%25${lowercasedQuery}%25`)
      .then(response => response.json())
      .then(data => {
        setHeadlinesArr(data.results || []);
      })
      .catch(() => setHeadlinesArr([]));

    fetch(`${apiBase}${restPath}?title%5Blike%5D=%25${lowercasedQuery}%25`)
      .then(response => response.json())
      .then(data => {
        setTitlesArr(data.results || []);
      })
      .catch(() => setTitlesArr([])); 
  };
  
  const fetchArr = [...descriptionsArr, ...headlinesArr, ...titlesArr];

  const dataArr = fetchArr.filter((item, index, array) => {
    return index === array.findIndex((current) => {
      return current["@id"] === item["@id"];
    });
  });    
  console.log("dataArr");
  (dataArr && dataArr.length>0) && console.log(dataArr);

  function highlightText(htmlString, searchTerm) {
    if (!htmlString || !searchTerm) {
      return htmlString;
    }
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    function highlightTextNode(node) {
      if (node.nodeType === 3) { // TEXT_NODE
        const matches = [...node.textContent.matchAll(new RegExp(`(${searchTerm})`, 'gi'))];
        if (matches.length > 0) {
          const spanWrapper = document.createElement('span');
          let lastIdx = 0;
          matches.forEach(match => {
            spanWrapper.append(document.createTextNode(node.textContent.substring(lastIdx, match.index)));
            const mark = document.createElement('mark');
            mark.textContent = match[0];
            spanWrapper.append(mark);
            lastIdx = match.index + match[0].length;
          });
          spanWrapper.append(document.createTextNode(node.textContent.substring(lastIdx)));
          node.replaceWith(spanWrapper);
        }
      } else {
        node.childNodes.forEach(highlightTextNode);
      }
    }
  
    doc.body.childNodes.forEach(highlightTextNode);
  
    return doc.body.innerHTML;
  }
  

  const orderedData = dataArr.map(orderData);
  console.log("orderedData");
  console.log(orderedData);

  function orderData(data) {
    const mainSectionIndex = data["@path"].indexOf("/mainSection");
    const bannerSectionIndex = data["@path"].indexOf("/bannerSection");
    
    if (mainSectionIndex !== -1) {
        const shortenedPath = data["@path"].substring(0, mainSectionIndex);
        const pathParts = shortenedPath.split("/"); 
        const lastPage = pathParts[pathParts.length - 1];
        var subPage = null;
        if (data.navigationId) {
          subPage = data.navigationId;
        }
        const page = subPage ? subPage : lastPage.replace(/[-_]/g, " ");
        const path = subPage ? `${shortenedPath}#${subPage}` : shortenedPath;
        const orderedData = {
            "id": data["@id"],
            "path": path,
            "page": page,
            "description": highlightText(data.description, query),
            "title": highlightText(data.headline || data.title, query)
        };
        return orderedData;
    } else if (bannerSectionIndex !== -1) {
        const shortenedPath = data["@path"].substring(0, bannerSectionIndex);
        const pathParts = shortenedPath.split("/"); 
        const lastPage = pathParts[pathParts.length - 1];
        const orderedData = {
            "id": data["@id"],
            "path": shortenedPath,
            "page": lastPage.replace(/[-_]/g, " "),
            "description": highlightText(data.description, query),
            "title": highlightText(data.headline || data.title, query)
        };
        return orderedData;
    } else {
      const pathParts = data["@path"].split("/"); 
      const lastPage = pathParts[pathParts.length - 1];
      var path = data["@path"];
      if (data.componentId) {
        let lastSlashIndex = data["@path"].lastIndexOf('/');
        path = data["@path"].substring(0, lastSlashIndex) + '#' + data["@path"].substring(lastSlashIndex + 1);
      }
      const orderedData = {
          "id": data["@id"],
          "page": lastPage.replace(/[-_]/g, " "),
          "path": path,
          "description": highlightText(data.description, query),
          "title": highlightText(data.headline || data.title, query)
      };
        return orderedData;
    }
  }

  const filteredData = orderedData.filter(url => !url.path.includes("/Config-Pages/") && !url.path.includes("/Components-Library/"));
  console.log("filteredData");
  console.log(filteredData);


  const resultArr = [];

  filteredData.forEach((obj) => {
    const existingObj = resultArr.find((item) => item.path === obj.path);

    if (existingObj) {
      const descriptionKey = `description${existingObj.count + 1}`;
      const titleKey = `title${existingObj.count + 1}`;
      existingObj[descriptionKey] = obj.description;
      existingObj[titleKey] = obj.title;
      existingObj.count++;
    } else {
      const newObj = {
        id: obj.id,
        page: obj.page,
        path: obj.path,
        [`description1`]: obj.description,
        [`title1`]: obj.title,
        count: 1
      };
      resultArr.push(newObj);
    }
  });

  const Modal = ({ show, children }) => {
    if (!show) {
      return null;
    }

    return (
      <div className='searchModal'>
        {children}
      </div>
    );
  };

  return (
    <div className='flexColumn staticSearch'>
      {(resultArr && resultArr.length>0) && resultArr.map((item) => (
        <ul className='list' key={item.id}>
          <li className='page'>
            <a href={`${apiBase}${item.path}`}>{item.page}<ArrowsIcon/></a>              
          </li> 
          {Array.from({ length: item.count }, (_, i) => (
            <React.Fragment key={i}>
              <li className='title'>
                <h3 dangerouslySetInnerHTML={{ __html: item[`title${i + 1}`] || item[`headline${i + 1}`] || null }}></h3>
              </li> 
              <li className='description' dangerouslySetInnerHTML={{ __html:item[`description${i+1}`] || null }}>
              </li>
            </React.Fragment>
          ))}               
        </ul>
      ))}        
    </div>
  );
}

export default StaticSearch;