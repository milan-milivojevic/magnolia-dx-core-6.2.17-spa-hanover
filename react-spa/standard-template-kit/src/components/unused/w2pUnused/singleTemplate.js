import React, { useState, useEffect } from 'react';
import { idSearch } from '../../../api/searchService'
import Card from '../../search/Card';

function SingleTemplate ({ 
  assetId,
  
  downloadButton,
  emailButton,
  detailsButton,
  copyLinkButton,

  assetTitle,
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
  
  const searchById = async (assetId) => {
    const res = await idSearch(assetId);
    setProducts([]);
    setProducts(res.items);
    console.log("[searchById res.items]");
    console.log(res.items);
    console.log("----------------------");
  }

  console.log("products");
  console.log(products);

  useEffect(() => {
    searchById(assetId);
  }, [assetId]);

  return (
    <div className='mpAssetWrapper'>
      {products?.map(c => <Card fields={c.fields} key={c.fields.id.value} />)}
    </div>
  )

}

export default SingleTemplate;