import React, { useEffect, useRef, useState } from 'react';
import '../../css.css';
import { IoSearchOutline } from 'react-icons/io5';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { idSearch, elasticSearchService } from '../../../api/searchService'
import Card from '../../search/Card';


function DocumentsSearch ({   
  perPage,
  perRow,
  sortOrder,
  defaultView, 

  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton
}) {
  
  // const searchParams = new URLSearchParams(window.location.search);
  // const urlQuery = searchParams.get('q');
  const elementRef = useRef(null);

  const [query, setQuery] = useState("");  
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("uploadDate, false");
  const [sortingType, setSortingType] = useState("uploadDate");
  const [isAsc, setIsAsc] = useState("false");

  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [matches, setMatches] = useState(0);
  
    
  const toggleGridView = () => {
    console.log("gridView")
  }
  const toggleListView = () => {
    console.log("listView")
  }
  
  useEffect(() => {

    console.log(sort);
    console.log("sort");
    const splitedSortOrder = sort.split(',');
    setSortingType(splitedSortOrder[0])
    setIsAsc(splitedSortOrder[1] === "false" ? false : true)
  }, [sort]);

  const elasticSearch = async (sortingType, isAsc, offset) => {
    const data = await elasticSearchService(sortingType, isAsc, offset);
    console.log("[mpSearch elasticSearch data]");
    console.log(data);
    console.log("----------------------");
    console.log("[mpSearch elasticSearch data.items]");
    console.log(data.items);
    console.log(data.totalHits);
    console.log("----------------------");
    // const res = JSON.parse(postSearchToken(page, sortingType, isAsc, offset))
    setMatches(data.totalHits);
    return data.items;
  };

  /* On sort change */
  useEffect(() => {
    elasticSearch(sortingType, isAsc, 0).then(data => {
      setProducts([]);
      setProducts(data);
      // reset offset
      setOffset(0);
      setMatches(data.totalHits);
    })
  }, [sort]);

  // async function fetchMoreItems() {
  //   setOffset(prev => prev + 25)
  //   console.log('[mpSearch fetchMoreItems offset]');
  //   console.log(offset);
  //   console.log("----------------------");
  //   const data = await elasticSearch(sortingType, isAsc, offset);

  //   console.log("[mpSearch useEffect fetchMoreItems products]");
  //   console.log(products);
  //   console.log("----------------------");

  //   if (data && data.length === 0) {
  //     setHasMore(false);
  //   } else {
  //     setProducts(prevProducts => [...prevProducts, ...data]);
  //   }

  //   setMatches(data.totalHits);
  // }  

  // useEffect(() => {

  //   console.log("[mpSearch useEffect products]");
  //   console.log(products)
  //   console.log("----------------------");

  //   const observer = new IntersectionObserver(onIntersection);

  //   if (observer && elementRef.current) {
  //     observer.observe(elementRef.current)
  //   }

  //   return () => {
  //     if (observer) {
  //       observer.disconnect()
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [products]);  

  // const onIntersection = (entries) => {
    
  //   console.log("[mpSearch onIntersection entries]");
  //   console.log(entries);
  //   console.log("----------------------");

  //   const firstEntry = entries[0];

  //   if (firstEntry.isIntersecting && hasMore) {
  //     console.log("[mpSearch onIntersection firstEntry.isIntersecting]");
  //     console.log(firstEntry.isIntersecting);
  //     console.log("----------------------");
  //     console.log("[mpSearch onIntersection hasMore]");
  //     console.log(hasMore);
  //     console.log("----------------------");
  //     fetchMoreItems();
  //   }
  // }
  
  const querySearch = async (query) => {
    console.log(query)
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
  }

  console.log(matches);
  
  return (
    <div className='mpSearchComponent'>
      {/* <Filters handleFilters={handleFilters} /> */}
      {/* <p style={{ textAlign: 'center' }}>{JSON.stringify(categories)}</p> */}      
      <div className='flexColumn staticSearch'>
        <div className='flex headerSearch'>
          <input 
            className='searchInput'
            placeholder='Search...' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type='button'
            onClick={() => querySearch(query)}
          ><IoSearchOutline/></button>
        </div>
      </div>
      <div className="searchActions">
        <div className='matches'>{matches} matches</div>
        <div className='sortingView'>
          <label htmlFor="sort">Sort by: 
            <select name="sort" class="sortingOptions" onChange={(e) => {setSort(e.target.value)}}>
              <option value='Not selected'>Not selected</option>
              <option value='relevance,true'>Most relevant first</option>
              <option value="relevance,false">Least relevant first</option>
              <option value="lastUpdatedTime,true">Last updated first</option>
              <option value="lastUpdatedTime,false">Oldest updated first</option>
              <option value="popularity,true">Most downloaded first</option>
              <option value="popularity,false">Least downloaded first</option>
              <option value="title_multi,false">Name (A-Z)</option>
              <option value="title_multi,true">Name (Z-A)</option>
              <option value="uploadDate,true">Newest first</option>
              <option value="uploadDate,false">Oldest first</option>
            </select>
          </label>
          <div className='viewButtons'>
            <button className='gridView active' onClick={toggleGridView}><BsFillGrid3X3GapFill/></button>
            <button className='listView' onClick={toggleListView}><FaThList/></button>
          </div>
        </div>
      </div>
      <div className='mpSearchContainer'>
        {products?.map(c => <Card fields={c.fields} key={c.fields.id.value} />)}
        {hasMore && <div style={{ width: '100%'}} ref={elementRef}>Load More items...</div>}
      </div>
    </div>
  )

}

export default DocumentsSearch;