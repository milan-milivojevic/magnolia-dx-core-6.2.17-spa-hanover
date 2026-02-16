import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { templatesSearchService } from '../../api/w2pSearchService';
import Card from '../w2p/helpers/Card';
import TemplateStatusFilter from "../w2p/filters/TemplateStatusFilter";
import TemplateVdbFilter from "../w2p/filters/TemplateVdbFilter";
import TemplateColorFilter from "../w2p/filters/TemplateColorFilter";
import TemplateFormatFilter from "../w2p/filters/TemplateFormatFilter";
import TemplateOutputFilter from "../w2p/filters/TemplateOutputFilter";
import { getAPIBase } from "../../helpers/AppHelpers";
import { MdOutlineLink } from "react-icons/md";
import styled from "styled-components"
import CryptoJS from 'crypto-js';

const Alert = styled.div`
    position: fixed;
    top: 12%;
    left: 45%;
    background-color: #7ca940;
    color: #fff;
    z-index: 9999999;
    padding: 20px;
`

function W2PSearch ({  
  globalQuery,
  sortOrderTemplates,
  perPage,
  perRow,  
  defaultView, 

  detailsButton,
  favouritesButton,
  createDocumentButton,  
  copyLinkButton,
}) {
  
  // const searchParams = new URLSearchParams(window.location.search);
  // const urlQuery = searchParams.get('q');

  const elementRef = useRef(null);
  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();
  
  const initialSortOrder = sortOrderTemplates ? sortOrderTemplates : "creationDate,desc";
  const splitedSortOrder = initialSortOrder.split(',');
  const initialSortType = splitedSortOrder[0];
  const initialSortDirection = splitedSortOrder[1] === "asc" ? "asc" : "desc";

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [sortType, setSortType] = useState(initialSortType);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);  
  const [matches, setMatches] = useState(0);
  const [view, setView] = useState(defaultView || "grid");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = ("");
  const [size, setSize] = useState(perPage || 25);
  
  const [selectedVdb, setSelectedVdb] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedFormat, setSelectedFormat] = useState();
  const [selectedOutput, setSelectedOutput] = useState();
  const [selectedTemlateStatus, setSelectedTemlateStatus] = useState();  

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);  
    const encryptedData = searchParams.get('data');

    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decryptData(encryptedData);
      searchParams = new URLSearchParams(decryptedData)
    }

    const urlQuery = searchParams.get('query') || "";
    urlQuery && setQuery(urlQuery);
    const urlSortDirection = searchParams.get('sortDirection') || "desc";
    urlSortDirection && setSortDirection(urlSortDirection);
    const urlSortType = searchParams.get('sortType') || "creationDate";
    urlSortType && setSortType(urlSortType);
    const urlSize = searchParams.get('size') || 25;
    urlSize && setSize(urlSize);
    const urlOffset = searchParams.get('offset') || 0;
    urlOffset && setOffset(urlOffset);

    const urlSelectedVdb = searchParams.get('selectedVdb') || null;
    urlSelectedVdb && setSelectedVdb(urlSelectedVdb);
    const urlColor = searchParams.get('selectedColor') || null;
    urlColor && setSelectedColor(urlColor);
    const urlFormat = searchParams.get('selectedFormat') || null;
    urlFormat && setSelectedFormat(urlFormat);
    const urlOutput = searchParams.get('selectedOutput') || null;
    urlOutput && setSelectedOutput(urlOutput);
    const urlTemlateStatus = searchParams.get('selectedTemlateStatus') || null;
    urlTemlateStatus && setSelectedTemlateStatus(urlTemlateStatus);

    templatesSearch(urlQuery, urlSortType, urlSortDirection, urlSize, urlOffset, urlSelectedVdb, urlColor, urlFormat, urlOutput, urlTemlateStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });

  }, []);

  useEffect(() => {
    if (globalQuery !== null && globalQuery !== undefined) {
      setQuery(globalQuery);
      setOffset(0);
      const currentOffset = 0;
      templatesSearch(globalQuery, sortType, sortDirection, size, currentOffset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus).then((data) => {      
        setProducts([]);
        setProducts(data);      
      });
    } else return;
  }, [globalQuery]);

  const isFirstRender = useRef(true);

  useEffect(() => {
      if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
      }

      setOffset(0);
      const currentOffset = 0;
      templatesSearch(query, sortType, sortDirection, size, currentOffset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus).then((data) => {      
          setProducts([]);
          setProducts(data);      
      });
  }, [selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus]);

  const updateSelectedVdb = (selectedValues) => {
    setSelectedVdb(selectedValues);
  };

  const updateSelectedColor = (selectedValues) => {
    setSelectedColor(selectedValues);
  }; 

  const updateSelectedFormat = (selectedValues) => {
    setSelectedFormat(selectedValues);
  }; 
  
  const updateSelectedOutput = (selectedValues) => {
    setSelectedOutput(selectedValues);
  }; 

  const updateSelectedTemlateStatus = (selectedValues) => {
    setSelectedTemlateStatus(selectedValues);
  }; 

  const templatesSearch = async (query, sortType, sortDirection, size, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus) => {
  
    const data = await templatesSearchService(query, sortType, sortDirection, size, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus);

    setProducts(data.rows);
    setMatches(data.results);    

    const hasMoreAssets = offset < data.results - 25;
    setHasMore(hasMoreAssets);     

    return data.rows;
  };  

  const changeSorting = (e) => {

    setSortOrder(e.target.value);

    const splitedSortOrder = e.target.value.split(",");
    const sortTypeRaw = splitedSortOrder[0];
    const sortDirectionRaw = splitedSortOrder[1] === "asc" ? "asc" : "desc";

    setSortType(sortTypeRaw);
    setSortDirection(sortDirectionRaw);
    setOffset(0);
    const currentOffset = 0;
    

    templatesSearch(query, sortTypeRaw, sortDirectionRaw, size, currentOffset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const fetchMoreTemplates = async (query, sortType, sortDirection, size, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus) => {

    const data = await templatesSearchService(query, sortType, sortDirection, size, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus);

    setProducts((prevProducts) => [...prevProducts, ...data.rows]);
    setMatches(data.results);

    const hasMoreAssets = offset < data.results - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.rows;    
  };      

  const loadMoreTemplates = () => {
    const currentOffset = offset + 25;

    setOffset((prevOffset) => prevOffset + 25);

    fetchMoreTemplates(query, sortType, sortDirection, size, currentOffset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus);
  }
  
  const buttonProps = {
    detailsButton,
    favouritesButton,
    createDocumentButton,
    copyLinkButton,
  };

  const toggleGridView = () => {
    setView("grid");
  };
  const toggleListView = () => {
    setView("list");
  }; 

  const encryptionKey = "XkhZG4fW2t2W";

  const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      encryptionKey
    ).toString();

    return encryptedData;
  };

  const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  const params = `query=${query}&sortType=${sortType}&sortDirection=${sortDirection}&offset=0&size=${size}&selectedVdb=${selectedVdb}&selectedColor=${selectedColor}&selectedFormat=${selectedFormat}&selectedOutput=${selectedOutput}&selectedTemlateStatus=${selectedTemlateStatus}`

  const encryptedParams = encryptData(params);
  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/W2P-Search?data=${encodeURIComponent(encryptedParams)}`;
  
  const copyLinkToSearchResult = () => {
    navigator.clipboard.writeText(linkPath)
      .then(() => {
        setShowAlert(true);
        setAlertMessage("Link Copied");
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };
  
  return (
    <div className="mpSearchComponent w2p">
      <div className="staticSearch mpSearch">        
        <div className="searchFilters">
          <TemplateStatusFilter onUpdateSelectedTemlateStatus={updateSelectedTemlateStatus} selectedTemlateStatus={selectedTemlateStatus} />
          <TemplateVdbFilter onUpdateSelectedVdb={updateSelectedVdb} selectedVdb={selectedVdb}/>
          <TemplateColorFilter onUpdateSelectedColor={updateSelectedColor} selectedColor={selectedColor}/>
          <TemplateFormatFilter onUpdateSelectedFormat={updateSelectedFormat} selectedFormat={selectedFormat}/>
          <TemplateOutputFilter onUpdateSelectedOutput={updateSelectedOutput} selectedOutput={selectedOutput}/>
        </div>
      </div>      
      <div className="searchActions">
        <div className="searchResult">
          <div className="matches">{matches} matches</div>
          <a className="copyLinkToResult" onClick={() => copyLinkToSearchResult()}>COPY LINK TO SEARCH RESULTS <MdOutlineLink /></a>
        </div>
        <div className="sortingView">
          <label htmlFor="sort">
            Sort by:
            <select
              name="sort"
              class="sortingOptions"
              onChange={(e) => {
                changeSorting(e);
              }}
            >
              <option value="creationDate,desc">Not selected</option>
              <option value="creationDate,desc">Newest first</option>
              <option value="creationDate,asc">Oldest first</option>
              {/* <option value="modificationDate,desc">Last updated first</option>
              <option value="modificationDate,asc">Oldest updated first</option> */}
              <option value="title,asc">Name (A-Z)</option>
              <option value="title,desc">Name (Z-A)</option>
            </select>
          </label>
          <div className="viewButtons">
            <button className={`gridView ${view}`} onClick={toggleGridView}>
              <BsFillGrid3X3GapFill />
            </button>
            <button className={`listView ${view}`} onClick={toggleListView}>
              <FaThList />
            </button>
          </div>
        </div>
      </div>      
      {products && products.length > 0 ? (
        <>
          <div className={`mpSearchContainer ${view}`} style={{ gridTemplateColumns: `repeat(${perRow ? perRow : 5}, 1fr)` }}>
            {products.map(c => 
              <Card
                templateData={c}
                key={c.id}
                buttonProps={buttonProps}
              />
            )}            
          </div>
          {hasMore && (
            <div className="loadMoreItems" style={{ width: "100%" }} ref={elementRef}>
              <button type="button" onClick={() => loadMoreTemplates()}>
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='mpSearchContainer'>No Results</div>
      )}      
    </div>
  );
}

export default W2PSearch;