import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { querySearch, elasticSearchService } from "../../api/searchService";
import Card from "../mediaPool/helpers/Card";
import CategoriesFilter from "../mediaPool/filters/CategoriesFilter";
import FileInfoFilter from "../mediaPool/filters/FileInfoFilter";
import KeywordsFilter from "../mediaPool/filters/KeywordsFilter";
import VdbFilter from "../mediaPool/filters/VdbFilter";
import { getAPIBase } from "../../helpers/AppHelpers";
import { MdOutlineLink } from "react-icons/md";
import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8';
import CryptoJS from 'crypto-js';


import styled from "styled-components"

const Alert = styled.div`
    position: fixed;
    top: 12%;
    left: 45%;
    background-color: #7ca940;
    color: #fff;
    z-index: 9999999;
    padding: 20px;
`

function MpSearch ({
  perPage,
  perRow,
  sortOrder,
  defaultView,

  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton,
}) {

  const elementRef = useRef(null);
  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = "/cmsAuthor";
  // const apiBase = getAPIBase();
  // const isPublic = isPublicInstance();
  // isPublic ? apiBase.replace("cmsAuthor", "cmsPublic") : apiBase;
  
  const initialSortOrder = sortOrder ? sortOrder : "uploadDate,false";
  const splitedSortOrder = initialSortOrder.split(",");
  const initialSortingType = splitedSortOrder[0];
  const initialIsAsc = splitedSortOrder[1] === "false" ? false : true;

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(initialSortOrder);
  const [sortingType, setSortingType] = useState(initialSortingType);
  const [isAsc, setIsAsc] = useState(initialIsAsc);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);  
  const [matches, setMatches] = useState(0);
  const [view, setView] = useState(defaultView || "grid");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = ("");
  const [limit, setLimit] = useState(perPage || 25);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuffixes, setSelectedSuffixes] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedVdbs, setSelectedVdbs] = useState([]);  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);


    const encryptedData = decodeURIComponent(searchParams.get('data')) || null;
    console.log(encryptedData);
    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decrypt(encryptedData);
      console.log(decryptedData);
    }

    const urlQuery = decryptedData?.query || searchParams.get('query') || "";
    urlQuery && setQuery(urlQuery);
    const urlIsAsc = decryptedData?.isAsc || searchParams.get('isAsc') || false;
    urlIsAsc && setIsAsc(urlIsAsc);
    const urlOffset = decryptedData?.offset || searchParams.get('offset') || 0;
    urlOffset && setOffset(urlOffset);
    const urlSortingType = decryptedData?.sortingType || searchParams.get('sortingType') || "uploadDate";
    urlSortingType && setSortingType(urlSortingType);
    const urlLimit = decryptedData?.limit || searchParams.get('limit') || 25;
    urlLimit && setLimit(urlLimit);

    let categoriesArray = [];
    let suffixesArray = [];
    let keywordsArray = [];
    let vdbsArray = [];

    const categoriesString = decryptedData?.selectedCategories || searchParams.get('selectedCategories') || null;
    if (categoriesString) {
      categoriesArray = categoriesString.split(',');
      setSelectedCategories(categoriesArray);
    }
    const suffixesString = decryptedData?.selectedSuffixes || searchParams.get('selectedSuffixes') || null;
    if (suffixesString) {
      suffixesArray = suffixesString.split(',');
      setSelectedSuffixes(suffixesArray);
    } 
    const keywordsString = decryptedData?.selectedKeywords || searchParams.get('selectedKeywords') || null;
    if (keywordsString) {
      keywordsArray = keywordsString.split(',');
      setSelectedKeywords(keywordsArray);
    }
    const vdbsString = decryptedData?.selectedVdbs || searchParams.get('selectedVdbs') || null;
    if (vdbsString) {
      vdbsArray = vdbsString.split(',');
      setSelectedVdbs(vdbsArray);
    }

    elasticSearch(urlSortingType, urlIsAsc, urlOffset, urlLimit, urlQuery, categoriesArray, suffixesArray, keywordsArray, vdbsArray).then((data) => {      
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
    elasticSearch(sortingType, isAsc, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  }, [selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs]);

  // Function to update selectedCategories state
  const updateSelectedCategories = (selectedValues) => {
    setSelectedCategories(selectedValues);
  };

  const updateSelectedSuffixes = (selectedValues) => {
    setSelectedSuffixes(selectedValues);
  };

  const updateSelectedKeywords = (selectedValues) => {
    setSelectedKeywords(selectedValues);
  };

  const updateSelectedVdbs = (selectedValues) => {
    setSelectedVdbs(selectedValues);
  };

  const elasticSearch = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs) => {
  
    const data = await elasticSearchService(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);

    setProducts(data.items);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.items;
  };  
  
  const changeSorting = (e) => {

    setSort(e.target.value);

    const splitedSortOrder = e.target.value.split(",");
    const sortingTypeRaw = splitedSortOrder[0];
    const isAscRaw = splitedSortOrder[1] === "false" ? false : true;

    setSortingType(sortingTypeRaw);
    setIsAsc(isAscRaw);
    setOffset(0);
    const currentOffset = 0;
    

    elasticSearch(sortingTypeRaw, isAscRaw, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const searchByQuery = async (query) => {

    setOffset(0);
    const currentOffset = 0;

    const data = await querySearch(sortingType, isAsc, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);

    setProducts([]);
    setProducts(data.items);
    setMatches(data.totalHits);     
    
    const hasMoreAssets = currentOffset < data.totalHits - 25;
    setHasMore(hasMoreAssets);     
  };

  const fetchMoreAssets = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs) => {

    const data = await elasticSearchService(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);

    setProducts((prevProducts) => [...prevProducts, ...data.items]);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.items;    
  };    


  const loadMoreAssets = () => {
    const currentOffset = offset + 25;

    setOffset((prevOffset) => prevOffset + 25);

    fetchMoreAssets(sortingType, isAsc, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);
  }

  const buttonProps = {
    downloadButton,
    emailButton,
    detailsButton,
    copyLinkButton,
  };

  const toggleGridView = () => {
    setView("grid");
  };
  const toggleListView = () => {
    setView("list");
  };  

  const encriptionKey = "732f2f591fb773ac65438158a1ef5d430ceb6e8dc3f32c9527fe959f5be029d3"

  function encrypt(paramsObject) {
      const stringData = JSON.stringify(paramsObject);
      return AES.encrypt(stringData, encriptionKey).toString();
  }

  function decrypt(ciphertext) {
    const bytes = AES.decrypt(ciphertext, encriptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const paramsObject = {
    query: query,
    sortingType: sortingType,
    isAsc: isAsc,
    offset: 0,
    limit: limit,
    selectedCategories: selectedCategories,
    selectedSuffixes: selectedSuffixes,
    selectedKeywords: selectedKeywords,
    selectedVdbs: selectedVdbs
  };

  const encryptedParams = encrypt(paramsObject); 
  const encodedEncryptedParams = encodeURIComponent(encryptedParams);
  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/MP-Search?data=${encodedEncryptedParams}`;


    const copyLinkToSearchResult = () => {
    navigator.clipboard.writeText(linkPath)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };

  return (
    <div className="mpSearchComponent">
      <div className="staticSearch mpSearch">
        <div className="flex headerSearch">
          <input
            className="searchInput"
            placeholder="Search Assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={() => searchByQuery(query)}>
            <IoSearchOutline />
          </button>
        </div>
      <div className="searchFilters">
        <CategoriesFilter onUpdateSelectedCategories={updateSelectedCategories} />
        <FileInfoFilter onUpdateSelectedSuffixes={updateSelectedSuffixes} />
        <VdbFilter onUpdateSelectedVdbs={updateSelectedVdbs} />
        <KeywordsFilter onUpdateSelectedKeywords={updateSelectedKeywords} />
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
              <option value="uploadDate,false">Not selected</option>
              <option value="relevance,false">Most relevant first</option>
              <option value="relevance,true">Least relevant first</option>
              <option value="lastUpdatedTime,false">Last updated first</option>
              <option value="lastUpdatedTime,true">Oldest updated first</option>
              <option value="popularity,false">Most downloaded first</option>
              <option value="popularity,true">Least downloaded first</option>
              <option value="title_multi,true">Name (A-Z)</option>
              <option value="title_multi,false">Name (Z-A)</option>
              <option value="uploadDate,false">Newest first</option>
              <option value="uploadDate,true">Oldest first</option>
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
                fields={c.fields}
                key={c.fields.id.value}
                buttonProps={buttonProps}
              />
            )}            
          </div>
          {hasMore && (
            <div className="loadMoreItems" style={{ width: "100%" }} ref={elementRef}>
              <button type="button" onClick={() => loadMoreAssets()}>
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

export default MpSearch;
