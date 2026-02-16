import React, { useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';
import '../../css.css';

function StaticContentSearchComponent (props) {
  const { propsQuery } = props;

  const [query, setQuery] = useState(propsQuery || "");  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_SEARCH;

  const [descriptionsArr, setDescriptionsArr] = useState([]);
  const [headlinesArr, setHeadlinesArr] = useState([]);
  const [titlesArr, setTitlesArr] = useState([]);

  const handleClick = () => {

    setDescriptionsArr([]);
    setHeadlinesArr([]);
    setTitlesArr([]);

    fetch(`${apiBase}${restPath}?description[like]=%25${query}%25`)
      .then(response => response.json())
      .then(data => {
        (data.results && data.results.length>0) &&
        setDescriptionsArr(data.results);
      });
    
    fetch(`${apiBase}${restPath}?headline[like]=%25${query}%25`)
      .then(response => response.json())
      .then(data => {
        (data.results && data.results.length>0) &&
        setHeadlinesArr(data.results);
      });

    fetch(`${apiBase}${restPath}?title[like]=%25${query}%25`)
    .then(response => response.json())
    .then(data => {
      (data.results && data.results.length>0) &&
      setTitlesArr(data.results);
    });
  };  

  const array = [...descriptionsArr, ...headlinesArr, ...titlesArr];
  console.log(array);

  const dataArr = array.filter((item, index, array) => {
    return index === array.findIndex((current) => {
      return current["@id"] === item["@id"];
    });
  });
  console.log(dataArr);
  
  (dataArr && dataArr.length>0) && console.log(dataArr);

  function shortenUrl(url) {
    console.log(url);
    const mainSectionIndex = url["@path"].indexOf("/mainSection");
    const bannerSectionIndex = url["@path"].indexOf("/bannerSection");
    
    if (mainSectionIndex !== -1) {
        const shortenedUrl = url["@path"].substring(0, mainSectionIndex);
        const urlParts = shortenedUrl.split("/"); 
        const lastPage = urlParts[urlParts.length - 1];
        const newUrl = {
            "id": url["@id"],
            "path": shortenedUrl,
            "page": lastPage.replace(/[-_]/g, " "),
            "description": url.description || null,
            "title": url.headline || url.title || null
        };
        return newUrl;
    } else if (bannerSectionIndex !== -1) {
        const shortenedUrl = url["@path"].substring(0, bannerSectionIndex);
        const urlParts = shortenedUrl.split("/"); 
        const lastPage = urlParts[urlParts.length - 1];
        const newUrl = {
            "id": url["@id"],
            "path": shortenedUrl,
            "page": lastPage.replace(/[-_]/g, " "),
            "description": url.description || null,
            "title": url.headline || url.title || null
        };
        return newUrl;
    } else {
      const urlParts = url["@path"].split("/"); 
      const lastPage = urlParts[urlParts.length - 1];
      const newUrl = {
          "id": url["@id"],
          "page": lastPage.replace(/[-_]/g, " "),
          "path": url["@path"],
          "description": url.description || null,
          "title": url.headline || url.title || null
      };
        return newUrl;
    }
  }
  
  // Korišćenje metode map za primenu funkcije shortenUrl na svaki URL u nizu
  const shortenedUrls = dataArr.map(shortenUrl);
  console.log(shortenedUrls);
  const filteredUrls = shortenedUrls.filter(url => !url.path.includes("/Config-Pages/") && !url.path.includes("/Components-Library/"));
    // Ispis skraćenih URL-ova
  console.log(filteredUrls);


  const resultArr = [];

  filteredUrls.forEach((obj) => {
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

  console.log(resultArr);
  // }

  return (
      <div className='flexColumn staticSearch'>
        <input 
          className='searchInput'
          placeholder='Search...' 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          style={{width: "30px", height:"30px"}}
          type='button'
          onClick={handleClick}
        ></button>
        {(resultArr && resultArr.length>0) && resultArr.map((item) => (
          <ul className='list' key={item.id}>
            <li>
              <a href={item.path}>{item.page}</a>
            </li> 
            {Array.from({ length: item.count }, (_, i) => (
              <React.Fragment key={i}>
                <li>
                  Title: {item[`title${i+1}`] || item.headline || null}
                </li> 
                <li dangerouslySetInnerHTML={{ __html:item[`description${i+1}`] || null }} >
                </li>
              </React.Fragment>
            ))}               
          </ul>
        ))}
      </div>
  );
}

export default StaticContentSearchComponent;