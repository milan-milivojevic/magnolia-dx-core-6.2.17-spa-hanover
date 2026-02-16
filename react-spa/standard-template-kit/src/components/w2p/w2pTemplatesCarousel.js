import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "../../styles/mediaPool/slick-theme.css"
import "../../styles/mediaPool/slick.css"
import { idSearch, templatesSearchService, newTemplates, recentlyUsedTemplates, favouriteTemplates } from '../../api/w2pSearchService'
import Card from './helpers/Card';
import CryptoJS from 'crypto-js';
import { aclCheck } from '../../helpers/ACL';
import ClipLoader from "react-spinners/ClipLoader";

function W2PTemplatesCarousel({ 
  templateIds, 
  linkToSearchResult, 

  templatesSearchType,
  sortOrderTemplates,
  cardsLimit,

  detailsButton,
  favouritesButton,
  createDocumentButton,  
  copyLinkButton,

  slidesToShow, 
  slidesToScroll, 
  showDots, 
  loop,
  autoplay,

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
  

  const initialSortOrder = sortOrderTemplates || null;
  const splitedSortOrder = initialSortOrder ? initialSortOrder.split(',') : [];
  const initialSortType = splitedSortOrder[0] || null;
  const initialSortDirection = splitedSortOrder[1] === "asc" ? "asc" : (splitedSortOrder[1] ? "desc" : null);

  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const settings = {
    
    slidesToShow: parseInt(slidesToShow, 10) || 5,
    slidesToScroll: parseInt(slidesToShow, 10) || 5,
    speed: 500,
    autoplay: autoplay === "false" ? false : true,
    infinite: loop === "false" ? false : true,
    dots: showDots === "false" ? false : true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    onInit: () => {
        resetTransform();
    },
  };

  const resetTransform = () => {
    var interval = setInterval(() => {
      const slickList = sliderRef.current.innerSlider.list;
      if (slickList) {
        const slickTrack = slickList.querySelector('.slick-track');
        if (slickTrack) {
          slickTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        }
      }
    }, 500);
    setTimeout(function( ) { clearInterval( interval ); }, 3000);
  };
  
  const templatesIdsArray = templateIds?.split(',').map(templateId => templateId.trim());

  const size = cardsLimit ? parseInt(cardsLimit, 10) > 40 ? 40 : parseInt(cardsLimit, 10) : null;
  const templatesIdsArrayLength = templatesIdsArray ? templatesIdsArray.length : 0;
  const calculatedSize = size ? size - templatesIdsArrayLength : 20 - templatesIdsArrayLength;  

  const templatesSearch = async () => {
    try {
      setIsLoading(true);
      let url = new URL(linkToSearchResult);
      let searchParams = new URLSearchParams(url.search);  
      const encryptedData = searchParams.get('data');

      let decryptedData = undefined;
      if (encryptedData) {
        decryptedData = decryptData(encryptedData);
        searchParams = new URLSearchParams(decryptedData)
      }

      const query = searchParams.get('query') || "";
      const sortDirection = initialSortDirection || searchParams.get('sortDirection') || "desc";
      const sortType = initialSortType || searchParams.get('sortType') || "creationDate";
      const customSize = size || searchParams.get('size') || 20;
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
      setError(null);
    } catch (err) {
      console.error('Error fetching templates:', err);
      setError('Your session on the system has expired. Please login again.');
    } finally {
      setIsLoading(false);
    }
  }

  const encryptionKey = "XkhZG4fW2t2W";

  const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  const getFavouriteTemplates = async () => {
    const response = await favouriteTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const getRecentlyUsedTemplates = async () => {
    const response = await recentlyUsedTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const getNewTemplates = async () => {
    const response = await newTemplates(size);
    setProducts([]);
    setProducts(response.rows);
  }

  const idsSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);

  
      const response = await idSearch(
        templatesIdsArray,
        initialSortType || "creationDate",
        initialSortDirection || "desc",
        size || templatesIdsArrayLength
      );
      const flattenedData = response.rows.flat();
      setProducts(flattenedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Your session on the system has expired. Please login again.");
    } finally {
      setIsLoading(false);
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
    <div className='mpCarouselWrapper' id={navigationId && navigationId}>
      {title &&
        <TitleLevel className="title" style={titleStyles}>
          {title}
        </TitleLevel>
      }
      {isLoading ? (
        <ClipLoader
          color="#7091a7"
          size={35}
          speedMultiplier={0.75}
        />
      ) : error ? (
        <div className="errorMessage">{error}</div>
      ) : products && products.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
          {products.map(c => 
            <Card
              templateData={c}
              key={c.id}
              buttonProps={buttonProps}
            />
          )}
        </Slider>
      ) : (
        <div className='noResults'>No Results</div>
      )}
    </div>
  );
}

export default W2PTemplatesCarousel;
