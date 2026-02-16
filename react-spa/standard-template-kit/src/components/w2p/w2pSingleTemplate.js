import React, { useState, useEffect } from 'react';
import { idSearch } from '../../api/w2pSearchService'
import Card from './helpers/Card';

function W2PSingleTemplate ({ 
  templateId,
  defaultView,
  
  detailsButton,
  favouritesButton,
  createDocumentButton,
  copyLinkButton,

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

  const [products, setProducts] = useState([]);
  
  const searchById = async (templateId) => {
    const response = await idSearch(templateId);
    setProducts([]);
    setProducts(response.rows);
  }

  useEffect(() => {
    searchById([templateId]);
  }, [templateId]);

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

  return (
    <div className={`mpAssetWrapper w2p ${defaultView}`}>
      {title &&
        <TitleLevel className="title" style={titleStyles}>
          {title}
        </TitleLevel>
      }
      {products && products.length > 0 ? (
          products.map(c => 
            <Card
              templateData={c}
              key={c.id}
              buttonProps={buttonProps}
            />
          )
        ) : (
          <div className='noResults'>No Results</div>
      )}
    </div>
  )

}

export default W2PSingleTemplate;