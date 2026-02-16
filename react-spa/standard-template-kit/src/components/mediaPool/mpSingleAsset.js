import React, { useState, useEffect } from 'react';
import { idSearch } from '../../api/searchService'
import Card from './helpers/Card';
import { aclCheck } from '../../helpers/ACL';

function MpSingleAsset ({ 
  assetId,
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

  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const [products, setProducts] = useState([]);
  
  const searchById = async (assetId) => {
    const response = await idSearch(assetId);
    setProducts([]);
    setProducts([response]);
  }

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
      searchById(assetId);
    }
  }, [aclValue, assetId]);

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

  if (!products || products.length === 0 || !products[0]) {
    return null;
  }

  return (
    <div className={`mpAssetWrapper ${defaultView}`}>
      {title && (
        <TitleLevel className="title" style={titleStyles}>
          {title}
        </TitleLevel>
      )}
      {products.map((c) => (
        <Card
          fields={c.fields}
          key={c.fields.id.value}
          buttonProps={buttonProps}
        />
      ))}
    </div>
  );
}

export default MpSingleAsset;