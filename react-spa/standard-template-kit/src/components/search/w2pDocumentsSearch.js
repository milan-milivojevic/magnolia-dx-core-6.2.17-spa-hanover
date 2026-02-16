import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { documentsSearchService } from '../../api/w2pSearchService';
import DocumentCard from '../w2p/helpers/DocumentCard';
import DocumentDetailsFilter from "../w2p/filters/DocumentDetailsFilter";
import DocumentTemplateTypeFilter from "../w2p/filters/DocumentTemplateTypeFilter";
import DocumentStatusFilter from "../w2p/filters/DocumentStatusFilter";

function W2PDocumentsSearch ({   
  sortOrderDocuments,
  perPage,
  perRow,  
  defaultView, 

  detailsButton,
  editButton,  
  downloadButton,
  emailButton,
  deleteButton,
}) {

  const elementRef = useRef(null);
  
  const initialSortOrder = sortOrderDocuments ? sortOrderDocuments : "creationDate,desc";
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
  const [size, setSize] = useState(perPage ? (Number(perPage) + 6) : 29);


  const [selectedDetails, setSelectedDetails] = useState();
  const [selectedTemplateType, setSelectedTemplateType] = useState();
  const [selectedDocumentStatus, setSelectedDocumentStatus] = useState("in-work");  

  useEffect(() => {   

    documentsSearch(query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });

  }, []);

  const updateSelectedTemplateType = (selectedValues) => {
    setSelectedTemplateType(selectedValues);
  };

  const updateSelectedDetails = (selectedValues) => {
    setSelectedDetails(selectedValues);
  }; 

  const updateSelectedDocumentStatus = (selectedValues) => {
    setSelectedDocumentStatus(selectedValues);
  }; 

  const documentsSearch = async (query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus) => {
  
    const data = await documentsSearchService(query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus);

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
    

    documentsSearch(query, sortTypeRaw, sortDirectionRaw, size, currentOffset, selectedTemplateType, selectedDetails, selectedDocumentStatus).then((data) => {      
      setProducts([]);
      setProducts(data);      
    });
  };

  const searchByQuery = async (query) => {

    setOffset(0);
    const currentOffset = 0;
    
    const data = await documentsSearchService(query, sortType, sortDirection, size, currentOffset, selectedTemplateType, selectedDetails, selectedDocumentStatus);

    setProducts([]);
    setProducts(data.rows);
    setMatches(data.results);     
    
    const hasMoreAssets = currentOffset < data.results - 25;
    setHasMore(hasMoreAssets);     
  };

  const fetchMoreDocuments = async (query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus) => {

    const data = await documentsSearchService(query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus);

    setProducts((prevProducts) => [...prevProducts, ...data.rows]);
    setMatches(data.results);

    const hasMoreAssets = offset < data.results - 25 ? true : false;
    setHasMore(hasMoreAssets); 

    return data.rows;    
  };      

  const loadMoreDocuments = () => {
    const currentOffset = offset + 25;

    setOffset((prevOffset) => prevOffset + 25);

    fetchMoreDocuments(query, sortType, sortDirection, size, currentOffset, selectedTemplateType, selectedDetails, selectedDocumentStatus);
  }
  
  const buttonProps = {
    detailsButton,
    editButton,
    downloadButton,
    emailButton,
    deleteButton
  };

  const toggleGridView = () => {
    setView("grid");
  };
  const toggleListView = () => {
    setView("list");
  }; 
  
  return (
    <div className="mpSearchComponent w2p documents">
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
        <DocumentStatusFilter onUpdateSelectedDocumentStatus={updateSelectedDocumentStatus} selectedDocumentStatus={selectedDocumentStatus} />
        <DocumentTemplateTypeFilter onUpdateSelectedTemplateType={updateSelectedTemplateType} selectedTemplateType={selectedTemplateType}/>
        <DocumentDetailsFilter onUpdateSelectedDetails={updateSelectedDetails} selectedDetails={selectedDetails}/>
      </div>
      </div>      
      <div className="searchActions">
        <div className="searchResult">
          <div className="matches">{matches} matches</div>
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
              <DocumentCard
                documentData={c}
                key={c.id}
                buttonProps={buttonProps}
              />
            )}            
          </div>
          {hasMore && (
            <div className="loadMoreItems" style={{ width: "100%" }} ref={elementRef}>
              <button type="button" onClick={() => loadMoreDocuments()}>
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

export default W2PDocumentsSearch;