import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "../../styles/mediaPool/slick-theme.css"
import "../../styles/mediaPool/slick.css"
import { elasticSearchService, idSearch } from '../../api/searchService'
import Card from './helpers/Card';
import CryptoJS from 'crypto-js';
import { aclCheck } from '../../helpers/ACL';

function MpCarousel ({ 
  assetIds, 
  linkToSearchResult, 
  sortOrder,
  cardsLimit,

  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton,
  shopButton,
  b2bButton,

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

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const initialSortOrder = sortOrder ? sortOrder : "uploadDate,false";
  const splitedSortOrder = initialSortOrder.split(",");
  const initialSortingType = splitedSortOrder[0];
  const initialIsAsc = splitedSortOrder[1] === "false" ? false : true;

  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);

  const assetIdsArray = assetIds?.split(',').map(assetId => assetId.trim());

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
      const flattenedData = assetsData.flat();
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
    b2bButton
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
      {products && products.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {products.map(c => 
              <Card
                fields={c.fields}
                key={c.fields.id.value}
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

export default MpCarousel;
