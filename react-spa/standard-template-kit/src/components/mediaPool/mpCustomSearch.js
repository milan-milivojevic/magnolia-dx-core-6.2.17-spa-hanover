import React, { useState, useEffect } from 'react';
import "../../styles/mediaPool/slick-theme.css"
import "../../styles/mediaPool/slick.css"
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { elasticSearchService, idSearch } from '../../api/searchService'
import Card from './helpers/Card';
import CryptoJS from 'crypto-js';
import { aclCheck } from '../../helpers/ACL';

function MpCustomSearch ({ 
  assetIds, 
  linkToSearchResult, 
  
  cardsLimit,
  perRow,
  sortOrder,
  defaultView, 

  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton,
  shopButton,
  b2bButton,

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

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const initialSortOrder = sortOrder ? sortOrder : "uploadDate,false";
  const splitedSortOrder = initialSortOrder.split(",");
  const initialSortingType = splitedSortOrder[0];
  const initialIsAsc = splitedSortOrder[1] === "false" ? false : true;

  const [products, setProducts] = useState([]);

  // const assetIdsArray = [];

  // for (const key in assetsIds) {
  //   if (key.startsWith('assetsIds')) {
  //     assetIdsArray.push(assetsIds[key].assetId);
  //   }
  // }  

  const assetIdsArray = assetIds?.split(',').map(assetId => assetId.trim());

  const elasticSearch = async () => {

    let url = new URL(linkToSearchResult);
    let searchParams = new URLSearchParams(url.search);  
    const encryptedData = searchParams.get('data');

    let decryptedData = undefined;
    if (encryptedData) {
      decryptedData = decryptData(encryptedData);
      searchParams = new URLSearchParams(decryptedData)
    }


    const query =  searchParams.get('query') || "";
    const isAsc = searchParams.get('isAsc') || initialIsAsc;
    const offset = searchParams.get('offset') || 0;
    const sortingType = searchParams.get('sortingType') || initialSortingType;
    const limit = cardsLimit || searchParams.get('limit') || 25;
    const assetIdsArrayLength = assetIdsArray ? assetIdsArray.length : 0;
    const calculatedLimit = parseInt(limit, 10) > 60 ? 60 : parseInt(limit, 10) - assetIdsArrayLength;
    console.log("calculatedLimit");
    console.log(calculatedLimit);

    let selectedCategories = [];
    let selectedSuffixes = [];
    let selectedTags = [];
    let selectedVdbs = [];

    const categoriesString = searchParams.get('selectedCategories') || null;
    if (categoriesString) {
      selectedCategories = categoriesString.split(',');
    }
    const suffixesString = searchParams.get('selectedSuffixes') || null;
    if (suffixesString) {
      selectedSuffixes = suffixesString.split(',');
    } 
    const tagsString = searchParams.get('selectedTags') || null;
    if (tagsString) {
      selectedTags = tagsString.split(',');
    }
    const vdbsString = searchParams.get('selectedVdbs') || null;
    if (vdbsString) {
      selectedVdbs = vdbsString.split(',');
    }

    const data = await elasticSearchService(sortingType, isAsc, offset, calculatedLimit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs);
    setProducts((prevProducts) => prevProducts.concat(data.items));
  }

  const encryptionKey = "XkhZG4fW2t2W";

  const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };  

  const idsSearch = async () => {
    try {
      const assetsData = await Promise.all(assetIdsArray.map(async (assetId) => {
        const response = await idSearch(assetId);
        return response;
      }));
      const flattenedAssets = assetsData.flat();
      setProducts(flattenedAssets);
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
          console.error("Greška prilikom izvršavanja aclCheck:", error);
          setAclValue(false);
        });
    } else setAclValue(true);
  });

  useEffect(() => {
    if (aclValue === true) {
      assetIds && idsSearch();
      linkToSearchResult && elasticSearch();
    }
  }, [aclValue]);

  const buttonProps = {
    downloadButton,
    emailButton,
    detailsButton,
    copyLinkButton,
    shopButton,
    b2bButton,
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
          <div className={`mpSearchContainer ${defaultView || "grid"}`} style={{ gridTemplateColumns: `repeat(${perRow ? perRow : 5}, 1fr)` }}>
            {products.map(c => 
              <Card
                fields={c.fields}
                key={c.fields.id.value}
                buttonProps={buttonProps}
              />
            )}
          </div>
        ) : (
          <div className='mpSearchContainer'>No Results</div>
      )}
    </div>    
  );
}

export default MpCustomSearch;
