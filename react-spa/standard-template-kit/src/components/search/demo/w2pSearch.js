import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { templatesSearchService } from '../../api/w2pSearchService';
import Card from '../w2p/helpers/Card';
import DetailsFilter from "../w2p/filters/detailsFilter";
import TemplateTypeFilter from "../w2p/filters/TemplateTypeFilter";
import TemplateStatusFilter from "../w2p/filters/TemplateStatusFilter";
import { getAPIBase } from "../../helpers/AppHelpers";
import { MdOutlineLink } from "react-icons/md";
import styled from "styled-components"
import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8';
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
  const apiBase = "/cmsAuthor";
  // const apiBase = getAPIBase();
  // const isPublic = isPublicInstance();
  // isPublic ? apiBase.replace("cmsAuthor", "cmsPublic") : apiBase;
  
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

  const [selectedDetails, setSelectedDetails] = useState();
  const [selectedTemplateType, setSelectedTemplateType] = useState();
  const [selectedTemlateStatus, setSelectedTemlateStatus] = useState();  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const encryptedData = searchParams.get('data') || null;
    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decrypt(encryptedData);
      console.log(decryptedData);    }


    const urlQuery = decryptedData?.query || searchParams.get('query') || "";
    urlQuery && setQuery(urlQuery);
    const urlSortDirection = decryptedData?.sortDirection || searchParams.get('sortDirection') || "desc";
    urlSortDirection && setSortDirection(urlSortDirection);
    const urlSortType = decryptedData?.sortType || searchParams.get('sortType') || "creationDate";
    urlSortType && setSortType(urlSortType);
    const urlSize = decryptedData?.size || searchParams.get('size') || 25;
    urlSize && setSize(urlSize);
    const urlOffset = decryptedData?.offset || searchParams.get('offset') || 0;
    urlOffset && setOffset(urlOffset);

    const urlSelectedTemplateType = decryptedData?.selectedTemplateType || searchParams.get('selectedTemplateType') || null;
    urlSelectedTemplateType && setSelectedTemplateType(urlSelectedTemplateType);
    const urlDetails = decryptedData?.selectedDetails || searchParams.get('selectedDetails') || null;
    urlDetails && setSelectedDetails(urlDetails);
    const urlTemlateStatus = decryptedData?.selectedTemlateStatus || searchParams.get('selectedTemlateStatus') || null;
    urlTemlateStatus && setSelectedTemlateStatus(urlTemlateStatus);

    templatesSearch(urlQuery, urlSortType, urlSortDirection, urlSize, urlOffset, urlSelectedTemplateType, urlDetails, urlTemlateStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });

  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
      if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
      }

      setOffset(0);
      const currentOffset = 0;
      templatesSearch(query, sortType, sortDirection, size, currentOffset, selectedTemplateType, selectedDetails, selectedTemlateStatus).then((data) => {      
          setProducts([]);
          setProducts(data);      
      });
  }, [selectedTemplateType, selectedDetails, selectedTemlateStatus]);

  const updateSelectedTemplateType = (selectedValues) => {
    setSelectedTemplateType(selectedValues);
  };

  const updateSelectedDetails = (selectedValues) => {
    setSelectedDetails(selectedValues);
  }; 

  const updateSelectedTemlateStatus = (selectedValues) => {
    setSelectedTemlateStatus(selectedValues);
  }; 

  const templatesSearch = async (query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedTemlateStatus) => {
  
    const data = await templatesSearchService(query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedTemlateStatus);

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
    

    templatesSearch(query, sortTypeRaw, sortDirectionRaw, size, currentOffset, selectedTemplateType, selectedDetails, selectedTemlateStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const searchByQuery = async (query) => {

    setOffset(0);
    const currentOffset = 0;
    
    const data = await templatesSearchService(query, sortType, sortDirection, size, currentOffset, selectedTemplateType, selectedDetails, selectedTemlateStatus);

    setProducts([]);
    setProducts(data.rows);
    setMatches(data.results);     
    
    const hasMoreAssets = currentOffset < data.results - 25;
    setHasMore(hasMoreAssets);     
  };

  const fetchMoreTemplates = async (query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedTemlateStatus) => {

    const data = await templatesSearchService(query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedTemlateStatus);

    setProducts((prevProducts) => [...prevProducts, ...data.rows]);
    setMatches(data.results);

    const hasMoreAssets = offset < data.results - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.rows;    
  };      

  const loadMoreTemplates = () => {
    const currentOffset = offset + 25;

    setOffset((prevOffset) => prevOffset + 25);

    fetchMoreTemplates(query, sortType, sortDirection, size, currentOffset, selectedTemplateType, selectedDetails, selectedTemlateStatus);
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


  const encriptionKey = "1e80ccc609380e6ba2e39281ab312faed47c0e0c6b980bce12e1ad417c2a0968"

  function encrypt(paramsObject ) {
      const stringData = JSON.stringify(paramsObject );
      return AES.encrypt(stringData, encriptionKey).toString();
  }

  function decrypt(ciphertext) {
    const bytes = AES.decrypt(ciphertext, encriptionKey);
    return JSON.parse(bytes.toString(EncUtf8));
  }

  const paramObject = {
    query: query,
    sortType: sortType,
    sortDirection: sortDirection,
    offset: 0,
    size: size,
    selectedTemplateType: selectedTemplateType,
    selectedDetails: selectedDetails,
    selectedTemlateStatus: selectedTemlateStatus
  };

  const encryptedParams = encrypt(paramObject); 
  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/W2P-Search?data=${encryptedParams}`;

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
        <div className="flex headerSearch">
          <input
            className="searchInput"
            placeholder="Search Templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={() => searchByQuery(query)}>
            <IoSearchOutline />
          </button>
        </div>
      <div className="searchFilters">
        <TemplateStatusFilter onUpdateSelectedTemlateStatus={updateSelectedTemlateStatus} />
        <TemplateTypeFilter onUpdateSelectedTemplateType={updateSelectedTemplateType} />
        <DetailsFilter onUpdateSelectedDetails={updateSelectedDetails} />
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
              <option value="modificationDate,desc">Last updated first</option>
              <option value="modificationDate,asc">Oldest updated first</option>
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