import React, { useEffect, useRef, useState } from 'react';
import '../../css.css';
import { IoSearchOutline } from 'react-icons/io5';
import { postSearchToken, searchAutocomplete } from '../../api/searchService'
import Card from './Card';
import styled from "styled-components";
import CustomModal from './CustomModal';
import { async } from '@magnolia/react-editor/build/mgnl-react-editor';

const AutocompleteStyle = styled.select`
  width: 290px;
  margin: 0 auto;
  border: 1px solid gray;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1800px;
  margin: 0 auto;
`

const flexFilter = (arr, criteria) => {
  if (criteria.length > 0 ) {
    const res = arr.filter(item => criteria.some(key => item.fields.keywords.items.includes(key)))
    console.log(res);
    return res
  }

  return arr
}

function MpSearch ({ 
  filter,
  perPage,
  sorting,
  defaultView, 
  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton
}) {
  
  const searchParams = new URLSearchParams(window.location.search);
  // const urlQuery = searchParams.get('q');
  const [query, setQuery] = useState("");
  
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState([]);
  const elementRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);

  useEffect(() => {
    const delayDebounceFn = async () => {
      console.log(query)
      const res = await searchAutocomplete(query)
      console.log("res")
      console.log(res)
      setAutocompleteList(res.aggregations.suggest.subGroups);
    }
    delayDebounceFn()
  }, [query])

  const onIntersection = (entries) => {
    
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore) {
      console.log(" [ SENDING REQUEST ] ");
      fetchMoreItems()
    }
  }
  
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  async function fetchMoreItems() {
    setOffset(prev => prev + 25)
    console.log('[offset in fetchMore]', offset);
    const data = await fetchAssets(page, sort[0], sort[1], offset)

    if (data.length == 0) {
      setHasMore(false)
    } else {
      // const res = await flexFilter(data, categories);

      setProducts(prevProducts => [...prevProducts, ...data]);
      setPage(prevPage => prevPage+1)
    }
  }

  useEffect(() => {
    fetchAssets(page, sort[0], sort[1], 0).then(res => {
      setProducts([]);
      setProducts(res);
      // reset offset
      setOffset(0)
    })
  }, [sort]);
  

  const fetchAssets = async (page, sortingType, isAsc, offset) => {
    const res = await postSearchToken(page, sortingType, isAsc, offset);
    console.log(res);
    // const res = JSON.parse(postSearchToken(page, sortingType, isAsc, offset))
    return res.items;
  };

  return (
    <div className='mpSearchComponent'>
      {/* <Filters handleFilters={handleFilters} /> */}
      {/* <p style={{ textAlign: 'center' }}>{JSON.stringify(categories)}</p> */}
      <div style={{ margin: '0 auto', width: '100%' }}>
        <label htmlFor="sort">Sort by: 
          <select name="sort" id="sort" onChange={(e) => {
            const selectedSort = e.target.value.split(',')
            setSort([selectedSort[0], !!selectedSort[1]])
          }}>
            <option value='Not selected'>Not selected</option>
            <option value='relevance,false'>Most relevant first</option>
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
        <span>{sort}</span>
      </div>
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
            onClick={() => fetchAssets(0)}
          ><IoSearchOutline/></button>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
        </div>
        {query && (
          <AutocompleteStyle>
            {autocompleteList?.map((keyword, i) => (
              <option key={i} value={keyword.group}>
                {keyword.group}
              </option>
            ))}
          </AutocompleteStyle>
        )}
      </div>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container>
        {products?.map(c => <Card fields={c} key={c.id} />)}
        {hasMore && <div style={{ width: '100%'}} ref={elementRef}>Load More items...</div>}
      </Container>
    </div>
  )

}

export default MpSearch;