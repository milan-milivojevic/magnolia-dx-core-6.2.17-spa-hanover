import React, { useEffect, useState } from 'react';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { idSearch, templatesSearchService, newTemplates, recentlyUsedTemplates, favouriteTemplates } from '../../api/w2pSearchService'
import Card from './helpers/Card';
import CryptoJS from 'crypto-js';
import { aclCheck } from '../../helpers/ACL';

function W2PCustomTemplatesSearch ({   
  templateIds, 
  linkToSearchResult, 

  detailsButton,
  favouritesButton,
  createDocumentButton,  
  copyLinkButton,

  templatesSearchType,
  sortOrderTemplates,
  cardsLimit,
  perRow,  
  defaultView, 

  title,
  titleLevel,
  titlePosition,
  titleFontFamily,
  titleColor,
  titleFontSize,
  titlePaddingTop,
  titlePaddingBottom,
  titlePaddingLeft,
  titlePaddingRight,
  navigationId,

  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  const [aclValue, setAclValue] = useState(false);
  
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const initialSortOrder = sortOrderTemplates ? sortOrderTemplates : "creationDate,desc";
  const splitedSortOrder = initialSortOrder.split(',');
  const initialSortType = splitedSortOrder[0];
  const initialSortDirection = splitedSortOrder[1] === "asc" ? "asc" : "desc";

  const [products, setProducts] = useState([]);

  const templatesIdsArray = templateIds?.split(',').map(templateId => templateId.trim());

  const size = cardsLimit ? parseInt(cardsLimit, 10) > 40 ? 40 : parseInt(cardsLimit, 10) : 20;
  const templatesIdsArrayLength = templatesIdsArray ? templatesIdsArray.length : 0;
  const calculatedSize = size - templatesIdsArrayLength;  
  
  const templatesSearch = async () => {

    let url = new URL(linkToSearchResult);
    let searchParams = new URLSearchParams(url.search);  
    const encryptedData = searchParams.get('data');

    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decryptData(encryptedData);
      searchParams = new URLSearchParams(decryptedData)
    }

    const query = searchParams.get('query') || "";
    const sortDirection = searchParams.get('sortDirection') || initialSortDirection;
    const sortType = searchParams.get('sortType') || initialSortType;
    const customSize = searchParams.get('size') || size;
    const templatesIdsArrayLength = templatesIdsArray ? templatesIdsArray.length : 0;
    const calcCustomSize = parseInt(customSize, 10) > 40 ? 40 : parseInt(customSize, 10) - templatesIdsArrayLength;
    const offset = searchParams.get('offset') || 0;

    const selectedVdb = searchParams.get('selectedVdb') || null;
    const selectedColor = searchParams.get('selectedColor') || null;
    const selectedFormat = searchParams.get('selectedFormat') || null;
    const selectedOutput = searchParams.get('selectedOutput') || null;
    const selectedTemlateStatus = searchParams.get('selectedTemlateStatus') || null;

    const data = await templatesSearchService(query, sortType, sortDirection, calcCustomSize, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus);
    setProducts((prevProducts) => prevProducts.concat(data.rows));
  }

  const encryptionKey = "XkhZG4fW2t2W";

  const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  const getFavouriteTemplates = async (size) => {
    const response = await favouriteTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const getRecentlyUsedTemplates = async (size) => {
    const response = await recentlyUsedTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const getNewTemplates = async (size) => {
    const response = await newTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const idsSearch = async () => {
    try {
      const response = await idSearch(templatesIdsArray);
      const flattenedData = response.flat();
      setProducts(flattenedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (editMode === false && basicAclCheck === false) {
      aclCheck(allowedGroups, deniedGroups, hideComponent)
        .then((response) => {
          setAclValue(response); 
        })
        .catch((error) => {
          console.error("Error executing aclCheck:", error);
          setAclValue(false);
        });
    } else setAclValue(true);
  });

  useEffect(() => {
    if (aclValue === true) {
      templateIds && (!templatesSearchType || (templatesSearchType !== "favorites" && templatesSearchType !== "used" && templatesSearchType !== "new")) && idsSearch();
      linkToSearchResult && templatesSearchType && templatesSearchType === "searchLink" && templatesSearch();
      templatesSearchType && templatesSearchType === "favorites" && getFavouriteTemplates(calculatedSize);
      templatesSearchType && templatesSearchType === "used" && getRecentlyUsedTemplates(calculatedSize);
      templatesSearchType && templatesSearchType === "new" && getNewTemplates(calculatedSize);
    }
  }, [aclValue]);

  const buttonProps = {
    detailsButton,
    favouritesButton,
    createDocumentButton,
    copyLinkButton,
  };

  const TitleLevel = titleLevel || "h1";

  const titleStyles = {
    fontFamily: titleFontFamily || null,
    textAlign:  titlePosition || null,
    fontSize: titleFontSize || null,
    color: titleColor || null,
    paddingTop: titlePaddingTop || null,
    paddingRight: titlePaddingRight || null,
    paddingBottom: titlePaddingBottom || null,
    paddingLeft: titlePaddingLeft || null
  }  

  if (editMode === false && aclValue === false && basicAclCheck === false) {
    return null;
  }
  
  return (
    <div className='mpSearchComponent' id={navigationId && navigationId}>
      {title &&
        <TitleLevel className="title" style={titleStyles}>
          {title}
        </TitleLevel>
      }
      {products && products.length > 0 ? (
          <div className={`mpSearchContainer ${defaultView}`} style={{ gridTemplateColumns: `repeat(${perRow ? perRow : 5}, 1fr)` }}>
            {products.map(c => 
              <Card
                templateData={c}
                key={c.id}
                buttonProps={buttonProps}
              />
            )}
          </div>
        ) : (
          <div className='mpSearchContainer'>No Results</div>
      )}      
    </div>
  )

}

export default W2PCustomTemplatesSearch;
