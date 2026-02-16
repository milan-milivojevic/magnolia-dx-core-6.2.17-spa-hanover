import React, { useEffect, useRef, useState } from "react";
import "../../css.css";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { querySearch, elasticSearchService } from "../../api/searchService";
import Card from "../mediaPool/helpers/Card";
import CategoriesFilter from "../mediaPool/filters/CategoriesFilter";
import FileInfoFilter from "../mediaPool/filters/FileInfoFilter";
import KeywordsFilter from "../mediaPool/filters/KeywordsFilter";
import VdbFilter from "../mediaPool/filters/VdbFilter";

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
  
  const initialSortOrder = sortOrder ? sortOrder : ["uploadDate", "false"];
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuffixes, setSelectedSuffixes] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedVdbs, setSelectedVdbs] = useState([]);

  useEffect(() => {
    setOffset(0);
    const currentOffset = 0;
    elasticSearch(sortingType, isAsc, currentOffset, query);
    console.log("useEffect");
  }, []);   

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

  const toggleGridView = () => {
    console.log("gridView");
  };
  const toggleListView = () => {
    console.log("listView");
  };  

  const elasticSearch = async (sortingType, isAsc, offset, query) => {
    
    const data = await elasticSearchService(sortingType, isAsc, offset, query);

    console.log("elasticSearch");

    setProducts(data.items);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.items;
  };    

  useEffect(() => {
    setOffset(0);
    const currentOffset = 0;      

    elasticSearch(sortingType, isAsc, currentOffset, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  }, [selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs]);  

  const changeSorting = (e) => {

    console.log("changeSorting");
    setSort(e.target.value);

    const splitedSortOrder = e.target.value.split(",");
    const sortingTypeRaw = splitedSortOrder[0];
    const isAscRaw = splitedSortOrder[1] === "false" ? false : true;

    setSortingType(sortingTypeRaw);
    setIsAsc(isAscRaw);
    setOffset(0);
    const currentOffset = 0;
    

    elasticSearch(sortingTypeRaw, isAscRaw, currentOffset, query).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const searchByQuery = async (query) => {

    setOffset(0);
    const currentOffset = 0;
    
    console.log("searchByQuery");

    const data = await querySearch(sortingType, isAsc, currentOffset, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);

    setProducts([]);
    setProducts(data.items);
    setMatches(data.totalHits);     
    
    const hasMoreAssets = currentOffset < data.totalHits - 25;
    setHasMore(hasMoreAssets);     
  };

  const fetchMoreAssets = async (sortingType, isAsc, offset, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs) => {

    const data = await elasticSearchService(sortingType, isAsc, offset, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);

    setProducts((prevProducts) => [...prevProducts, ...data.items]);
    setMatches(data.totalHits);

    const hasMoreAssets = offset < data.totalHits - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    console.log("fetchMoreAssets");

    return data.items;    
  };    


  const loadMoreAssets = () => {
    const currentOffset = offset + 25;
    console.log(currentOffset);
    setOffset((prevOffset) => prevOffset + 25);

    fetchMoreAssets(sortingType, isAsc, currentOffset, query, selectedCategories, selectedSuffixes, selectedKeywords, selectedVdbs);
    console.log("loadMoreAssets");
  }

  // const handleIntersection = (entries) => {

  //   const firstEntry = entries[0];

  //   if (firstEntry.isIntersecting && hasMore) {
      
  //     const currentOffset = offset + 25;
  //     console.log(currentOffset);
  //     setOffset((prevOffset) => prevOffset + 25);

  //     elasticSearch(sortingType, isAsc, currentOffset, query).then((data) => {      
  //       setProducts((prevProducts) => [...prevProducts, ...data]);
  //     });
  //   }
  // };
  
  // useEffect(() => {
  
  //   const observer = new IntersectionObserver(handleIntersection);
  //   if (observer && elementRef.current) {
  //     observer.observe(elementRef.current);
  //   }
  
  //   return () => {
  //     if (observer && elementRef.current) {
  //       observer.unobserve(elementRef.current);
  //     }
  //   };
  // }, [products]);


  console.log("[mpSearch products]");
  console.log(products)
  console.log("----------------------");

  const buttonProps = {
    downloadButton,
    emailButton,
    detailsButton,
    copyLinkButton,
  };

  return (
    <div className="mpSearchComponent">
      <div className="staticSearch mpSearch">
        <div className="flex headerSearch">
          <input
            className="searchInput"
            placeholder="Search..."
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
        <div className="matches">{matches} matches</div>
        <div className="sortingView">
          <label htmlFor="sort">
            Sort by:
            <select
              name="sort"
              class="sortingOptions"
              onChange={(e) => {
                changeSorting(e);
                console.log(e);
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
            <button className="gridView active" onClick={toggleGridView}>
              <BsFillGrid3X3GapFill />
            </button>
            <button className="listView" onClick={toggleListView}>
              <FaThList />
            </button>
          </div>
        </div>
      </div>      
        {products && products.length > 0 ? (
          <>
          <div className="mpSearchContainer">
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
