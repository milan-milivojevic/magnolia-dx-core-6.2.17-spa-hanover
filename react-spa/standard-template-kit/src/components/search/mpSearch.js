import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { querySearch, elasticSearchService } from "../../api/searchService";
import Card from "../mediaPool/helpers/Card";
import CategoriesFilter from "../mediaPool/filters/CategoriesFilter";
import FileInfoFilter from "../mediaPool/filters/FileInfoFilter";
import TagsFilter from "../mediaPool/filters/TagsFilter"; 
import KeywordsFilter from "../mediaPool/filters/KeywordsFilter";
import VdbFilter from "../mediaPool/filters/VdbFilter";
import { getAPIBase } from "../../helpers/AppHelpers";
import { MdOutlineLink } from "react-icons/md";
import Button from '@mui/material/Button';
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
  globalQuery,
  perPage,
  perRow,
  sortOrder,
  defaultView,

  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton,
  shopButton,
  b2bButton,

  resetGlobalQuery
}) {

  const elementRef = useRef(null);
  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();
  
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
  const [alertMessage, setAlertMessage] = useState("");
  const [limit, setLimit] = useState(parseInt(perPage, 10) || 12);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuffixes, setSelectedSuffixes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedVdbs, setSelectedVdbs] = useState([]);  
  const [selectedKeywords, setSelectedKeywords] = useState([]);  

  useEffect(() => {
    
    let searchParams = new URLSearchParams(window.location.search);
    const encryptedData = searchParams.get('data');
    
    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decryptData(encryptedData);
      searchParams = new URLSearchParams(decryptedData)
    }

    const urlQuery =  searchParams.get('query') || "";
    urlQuery && setQuery(urlQuery);
    const urlIsAsc = searchParams.get('isAsc') || isAsc;
    urlIsAsc && setIsAsc(urlIsAsc);
    const urlOffset = searchParams.get('offset') || 0;
    urlOffset && setOffset(urlOffset);
    const urlSortingType = searchParams.get('sortingType') || sortingType;
    urlSortingType && setSortingType(urlSortingType);
    const urlLimit = parseInt(searchParams.get('limit'), 10) || 12;
    urlLimit && setLimit(urlLimit);

    let categoriesArray = [];
    let suffixesArray = [];
    let tagsArray = [];
    let vdbsArray = [];
    let keywordsArray = [];

    const categoriesString = searchParams.get('selectedCategories') || null;
    if (categoriesString) {
      categoriesArray = categoriesString.split(',');
      setSelectedCategories(categoriesArray);
    }
    
    const suffixesString = searchParams.get('selectedSuffixes') || null;
    if (suffixesString) {
      suffixesArray = suffixesString.split(',');
      setSelectedSuffixes(suffixesArray);
    } 
    const tagsString = searchParams.get('selectedTags') || null;
    if (tagsString) {
      tagsArray = tagsString.split(',');
      setSelectedTags(tagsArray);
    }
    const keywordsString = searchParams.get('selectedKeywords') || null;
    if (keywordsString) {
      keywordsArray = keywordsString.split(',');
      setSelectedKeywords(keywordsArray);
    }
    const vdbsString = searchParams.get('selectedVdbs') || null;
    if (vdbsString) {
      vdbsArray = vdbsString.split(',');
      setSelectedVdbs(vdbsArray);
    }

    elasticSearch(urlSortingType, urlIsAsc, urlOffset, urlLimit, urlQuery, categoriesArray, suffixesArray, tagsArray, vdbsArray, keywordsArray).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  }, []);

  useEffect(() => {
    if (globalQuery !== null && globalQuery !== undefined) {
      setQuery(globalQuery);
      setOffset(0);
      const currentOffset = 0;
      elasticSearch(sortingType, isAsc, currentOffset, limit, globalQuery, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords).then((data) => {      
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
    elasticSearch(sortingType, isAsc, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  }, [selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords]);

  const updateSelectedCategories = (selectedValues) => {
    setSelectedCategories(selectedValues);
  };

  const updateSelectedSuffixes = (selectedValues) => {
    setSelectedSuffixes(selectedValues);
  };

  const updateSelectedTags = (selectedValues) => {
    setSelectedTags(selectedValues);
  };

  const updateSelectedVdbs = (selectedValues) => {
    setSelectedVdbs(selectedValues);
  };

  const updateSelectedKeywords = (selectedValues) => {
    setSelectedKeywords(selectedValues);
  };

  const elasticSearch = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords) => {
  
    const data = await elasticSearchService(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords);

    setProducts(data.items);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 12 ? true : false;
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
    

    elasticSearch(sortingTypeRaw, isAscRaw, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const fetchMoreAssets = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords) => {

    const data = await elasticSearchService(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords);

    setProducts((prevProducts) => [...prevProducts, ...data.items]);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 12 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.items;    
  };    

  const loadMoreAssets = () => {
    const currentOffset = offset + 12;

    setOffset((prevOffset) => prevOffset + 12);

    fetchMoreAssets(sortingType, isAsc, currentOffset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords);
  }

  const buttonProps = {
    downloadButton,
    emailButton,
    detailsButton,
    copyLinkButton,
    shopButton,
    b2bButton
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

  const params = `query=${query}&sortingType=${sortingType}&isAsc=${isAsc}&offset=0&limit=${limit}&selectedCategories=${selectedCategories}&selectedSuffixes=${selectedSuffixes}&selectedTags=${selectedTags}&selectedVdbs=${selectedVdbs}&selectedKeywords=${selectedKeywords}`

  const encryptedParams = encryptData(params);
  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/MP-Search?data=${encodeURIComponent(encryptedParams)}`;
  

    const copyLinkToSearchResult = () => {
    navigator.clipboard.writeText(linkPath)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };

  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSuffixes([]);
    setSelectedTags([]);
    setSelectedVdbs([]);
    setSelectedKeywords([]);
    setOffset(0);
    const currentOffset = 0;
    setQuery("");
    resetGlobalQuery?.();
    elasticSearch(sortingType, isAsc, currentOffset, limit, "", [], [], [], [], []);
  };

  return (
    <div className="mpSearchComponent">
      
      <div className="staticSearch mpSearch">
        <div className="searchFilters">
          <KeywordsFilter
            onUpdateSelectedKeywords={updateSelectedKeywords}
            selectedKeywords={selectedKeywords}
            query={query}
            sortingType={sortingType}
            isAsc={isAsc}
            selectedCategories={selectedCategories}
            selectedSuffixes={selectedSuffixes}
            selectedTags={selectedTags}
          />
          <CategoriesFilter
            onUpdateSelectedCategories={updateSelectedCategories}
            selectedCategories={selectedCategories}
            query={query}
            sortingType={sortingType}
            isAsc={isAsc}
            selectedSuffixes={selectedSuffixes}
            selectedTags={selectedTags}
            selectedKeywords={selectedKeywords}
          />
          <TagsFilter
            onUpdateSelectedTags={updateSelectedTags}
            selectedTags={selectedTags}
            query={query}
            sortingType={sortingType}
            isAsc={isAsc}
            selectedCategories={selectedCategories}
            selectedSuffixes={selectedSuffixes}
            selectedKeywords={selectedKeywords}
          />
          <FileInfoFilter
            onUpdateSelectedSuffixes={updateSelectedSuffixes}
            selectedSuffixes={selectedSuffixes}
            query={query}
            sortingType={sortingType}
            isAsc={isAsc}
            selectedCategories={selectedCategories}
            selectedTags={selectedTags}
            selectedKeywords={selectedKeywords}
          />
          {}        
          <div className="resetAllWrapper">
            <Button className="filterButton" onClick={resetAllFilters}>Reset All</Button>
          </div>
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
              value={sort} 
              class="sortingOptions"
              onChange={(e) => {
                changeSorting(e);
              }}
            >
              <option value="uploadDate,false">Newest first</option>
              <option value="uploadDate,true">Oldest first</option>
              <option value="relevance,false">Most relevant first</option>
              <option value="relevance,true">Least relevant first</option>
              <option value="lastUpdatedTime,false">Last updated first</option>
              <option value="lastUpdatedTime,true">Oldest updated first</option>
              <option value="popularity,false">Most downloaded first</option>
              <option value="popularity,true">Least downloaded first</option>
              <option value="title_multi,true">Name (A-Z)</option>
              <option value="title_multi,false">Name (Z-A)</option>              
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
