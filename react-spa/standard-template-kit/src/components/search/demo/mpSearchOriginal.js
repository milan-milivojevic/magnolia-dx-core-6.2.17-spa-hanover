import React, { useEffect, useRef, useState } from "react";
import "../../css.css";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { idSearch, elasticSearchService } from "../../../api/searchService";
import Card from "../../mediaPool/helpers/Card";
import CategoriesFilter from "../../mediaPool/filters/demo/CategoriesFilter";

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
  // const searchParams = new URLSearchParams(window.location.search);
  // const urlQuery = searchParams.get('q');
  const elementRef = useRef(null);

  const [query, setQuery] = useState(null);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("uploadDate, false");
  const [sortingType, setSortingType] = useState("uploadDate");
  const [isAsc, setIsAsc] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [matches, setMatches] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState([]); // State in the parent component

  // Function to update selectedCategories state
  const updateSelectedCategories = (newSelectedCategories) => {
    setSelectedCategories(newSelectedCategories);
  };
  useEffect(() => {
    console.log("Search selectedCategories");
    console.log(selectedCategories);
  }, [selectedCategories]);

  const toggleGridView = () => {
    console.log("gridView");
  };
  const toggleListView = () => {
    console.log("listView");
  };

  const elasticSearch = async (sortingType, isAsc, offset, query) => {
    const data = await elasticSearchService(sortingType, isAsc, offset, query);
    console.log("[mpSearch elasticSearch data]");
    console.log(data);
    console.log("----------------------");
    console.log("[mpSearch elasticSearch data.items]");
    console.log(data.items);
    console.log("[mpSearch elasticSearch data.totalHits]");
    console.log(data.totalHits);
    console.log("----------------------");
    // const res = JSON.parse(postSearchToken(page, sortingType, isAsc, offset))
    setMatches(data.totalHits);
    return data.items;
  };

  async function fetchMoreItems() {
    if (!query) {
      setOffset((prev) => prev + 25);
    }
    console.log("[mpSearch fetchMoreItems offset]");
    console.log(offset);
    console.log("----------------------");
    const data = await elasticSearch(sortingType, isAsc, offset, query);

    console.log("[mpSearch useEffect fetchMoreItems products]");
    console.log(products);
    console.log("----------------------");

    if (data && data.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...data]);
    }
  }

  const onIntersection = (entries) => {
    console.log("[mpSearch onIntersection entries]");
    console.log(entries);
    console.log("----------------------");

    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      console.log("[mpSearch onIntersection firstEntry.isIntersecting]");
      console.log(firstEntry.isIntersecting);
      console.log("----------------------");
      console.log("[mpSearch onIntersection hasMore]");
      console.log(hasMore);
      console.log("----------------------");
      fetchMoreItems();
    }
  };

  useEffect(() => {
    console.log("[mpSearch useEffect products]");
    console.log(products);
    console.log("----------------------");

    const observer = new IntersectionObserver(onIntersection);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const changeSorting = (e) => {
    setSort(e.target.value);
    console.log("e.target.value");
    console.log(e.target.value);
    console.log("-----------++-----------");
    console.log("sort");
    console.log(sort);
    console.log("-----------++-----------");

    const splitedSortOrder = e.target.value.split(",");
    const sortingTypeRaw = splitedSortOrder[0];
    const isAscRaw = splitedSortOrder[1] === "false" ? false : true;

    setSortingType(sortingTypeRaw);
    setIsAsc(isAscRaw);

    elasticSearch(sortingTypeRaw, isAscRaw, 0).then((data) => {
      setProducts([]);
      setProducts(data);
      // reset offset
      setOffset(0);
    });
  };

  const querySearch = async (query) => {
    console.log(query);
    const data = await idSearch(query);
    console.log("[mpSearch querySearch data]");
    console.log(data);
    console.log("----------------------");
    setProducts([]);
    setProducts(data.items);
    console.log("products");
    console.log(products);
    console.log("----------------------");
    setMatches(data.totalHits);
  };

  console.log("matches");
  console.log(matches);

  const buttonProps = {
    downloadButton,
    emailButton,
    detailsButton,
    copyLinkButton,
  };

  return (
    <div className="mpSearchComponent">
      {/* <Filters handleFilters={handleFilters} /> */}
      {/* <p style={{ textAlign: 'center' }}>{JSON.stringify(categories)}</p> */}
      <div className="flexColumn staticSearch">
        <div className="flex headerSearch">
          <input
            className="searchInput"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={() => querySearch(query)}>
            <IoSearchOutline />
          </button>
        </div>
      </div>
      <CategoriesFilter onUpdateSelectedCategories={updateSelectedCategories} />
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
              <option value="Not selected">Not selected</option>
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
      
        {products ? (
          <div className="mpSearchContainer">
            {products?.map(c => 
              <Card
                fields={c.fields}
                key={c.fields.id.value}
                buttonProps={buttonProps}
              />
            )}
            {hasMore && (
              <div style={{ width: "100%" }} ref={elementRef}>
                Load More items...
              </div>
            )}
          </div>
        ) : (
          <div className='mpSearchContainer'>No Results</div>
        )}
    </div>
  );
}

export default MpSearch;
