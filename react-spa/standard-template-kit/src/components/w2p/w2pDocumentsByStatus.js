import React, { useEffect, useState } from 'react';
import { 
  myDocumentsService, 
  inWorkDocumentsService, 
  finalizedDocumentsService, 
  rejectedDocumentsService, 
  waitingApprovalDocumentsService, 
  archivedDocumentsService  
} from '../../api/w2pSearchService';
import DocumentCard from './helpers/DocumentCard';

function W2PDocumentsByStatus ({  
  documentStatuses,
  sortOrderDocuments,
  perRow,
  defaultView,

  detailsButton,
  editButton,  
  downloadButton,
  emailButton,
  deleteButton,

  title,
  titleLevel,
  titlePosition,
  titleFontFamily,
  titleColor,
  titleFontSize,
  titlePaddingTop,
  titlePaddingBottom,
  titlePaddingLeft,
  titlePaddingRight
}) {
  // Postavljanje inicijalnog sortiranja
  const initialSortOrder = sortOrderDocuments ? sortOrderDocuments : "modificationDate,desc";
  const [sortField, sortDirection] = initialSortOrder.split(',');
  const initialSortType = sortField;
  const initialSortDir = sortDirection === "asc" ? "asc" : "desc";

  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(18); // limit postavljen na 18
  const [hasMore, setHasMore] = useState(true);
  const [matches, setMatches] = useState(0);

  // Funkcija za dohvaćanje dokumenata ovisno o statusu, offsetu i limitu
  const fetchDocuments = async (currentOffset, currentLimit) => {
    let response;
    if (documentStatuses === "my") {
      response = await myDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    } else if (documentStatuses === "in-work") {
      response = await inWorkDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    } else if (documentStatuses === "finalized") {
      response = await finalizedDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    } else if (documentStatuses === "in-approval") {
      response = await waitingApprovalDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    } else if (documentStatuses === "rejected") {
      response = await rejectedDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    } else if (documentStatuses === "archived") {
      response = await archivedDocumentsService(currentOffset, currentLimit, initialSortType, initialSortDir);
    }
    setMatches(response.results);
    return response.rows;
  };

  useEffect(() => {
    const fetchInitialDocuments = async () => {
      const docs = await fetchDocuments(0, limit);
      setProducts(docs);
      setOffset(0);
      if (docs.length < limit) {
        setHasMore(false);
      }
    };
    fetchInitialDocuments();
  }, [documentStatuses, initialSortType, initialSortDir, limit]);

  const loadMore = async () => {
    const newOffset = offset + limit;
    const newDocs = await fetchDocuments(newOffset, limit);
    setProducts(prev => [...prev, ...newDocs]);
    setOffset(newOffset);
    if (newDocs.length < limit) {
      setHasMore(false);
    }
  };

  const buttonProps = {
    detailsButton,
    editButton,
    emailButton,
    downloadButton,
    deleteButton,
  };

  const TitleLevel = titleLevel || "h1";

  const titleStyles = {
    fontFamily: titleFontFamily || null,
    textAlign:  titlePosition || null,
    fontSize: titleFontSize || null,
    color: titleColor || null,
    paddingTop: titlePaddingTop || null,
    paddingRight: null,
    paddingBottom: titlePaddingBottom || null,
    paddingLeft: titlePaddingLeft || null
  };

  return (
    <div className='mpSearchComponent w2p documents'>
      {title &&
        <TitleLevel className="title" style={titleStyles}>
          {title}
        </TitleLevel>
      }
      <div className="docsMatches">
        Matches: {matches}
      </div>
      {products && products.length > 0 ? (
        <>
          <div 
            className={`mpSearchContainer documentsByStatus ${defaultView}`} 
            style={{ gridTemplateColumns: `repeat(${perRow ? perRow : 5}, 1fr)` }}
          >
            {products.map(c => 
              <DocumentCard
                documentData={c}
                key={c.id}
                buttonProps={buttonProps}
              />
            )}
          </div>
          {hasMore && (
            <div className="loadMoreItems" style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
              <button type="button" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='noDocuments'>No Documents</div>
      )}      
    </div>
  );
}

export default W2PDocumentsByStatus;
