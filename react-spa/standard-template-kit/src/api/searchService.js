import payload from './mpPayload.json'
import payloadSingleAsset from './mpSingleAssetPayload.json'

const BASE_URL = process.env.REACT_APP_MGNL_HOST_NEW; 

const apiServiceHandler = async (url, options) => {
  try {    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      return { ...data, status: response.status };
    }

    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export const getApiBearerToken = () => apiServiceHandler(`${BASE_URL}/rest/sso/auth/jaas/jwt`);

const paylodID = (assetId) => {
  
  const payloadCopy = { ...payloadSingleAsset };

  payloadCopy.criteria.subs[0].value = '"' + assetId + '"'

  return payloadCopy;
}

export const idSearch = async (assetId) => {

  assetId = assetId.startsWith("M-") ? assetId.substring(2) : assetId;
  assetId = assetId.startsWith("m-") ? assetId.substring(2) : assetId;

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paylodID(assetId)),
  })

  const data = await response;
  
  const matchingItem = data.items.find(item => item.fields.id.value.toString() === assetId);
  
  return matchingItem;
}

export const downloadFileDirect = async (id, selectedOption, download_version, language, licenseId) => {

  const token = await getApiBearerToken();
  
  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.0/assets/downloadLinks`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        asset: { id: id },
        download_scheme: { id: selectedOption },
        download_version: download_version,
        language: language,
        license_confirmation: {
          license: {id: licenseId && licenseId }
        },
      },
    ]),
  })

  const data = await response;
  return data;
};

const updateCustomSearchPayload = (requestPayload, sortingType, isAsc, offset, limit) => {

  const updatedPayload = requestPayload;

  if (sortingType !== null) {
    const sortingObject = sortingType === 'relevance' ? [{ "@type": sortingType, "asc": isAsc }] : [{ "@type": "field", "field": sortingType, "asc": isAsc }];
    updatedPayload.output.sorting = sortingObject;
  }    

  const pagingObject = { "@type": "offset", "offset": offset, "limit": limit };
  requestPayload.output.paging = pagingObject;

  return updatedPayload;
}

export const customSearch = async (requestPayload, sortingType, isAsc, offset, limit) => {

  const updatedPayload = updateCustomSearchPayload(requestPayload, sortingType, isAsc, offset, limit);

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPayload)
  })

  const data = await response;

  return data;
}

const updateSearchPayload = (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords) => {

  const sortingObject = sortingType === 'relevance' ? [{ "@type": sortingType, "asc": isAsc }] : [{ "@type": "field", "field": sortingType, "asc": isAsc }];
  const updatedPayload = { ...payload };

  updatedPayload.output.sorting = sortingObject;
  const pagingObject = { "@type": "offset", "offset": offset, "limit": limit };
  updatedPayload.output.paging = pagingObject;

  updatedPayload.criteria.subs[0].value = '"' + query + '"';

  const categoriesIndex = updatedPayload.criteria.subs.findIndex(
    sub => sub["@type"] === "in" && sub.fields && sub.fields.includes("themes.id")
  );
  
  if (selectedCategories && selectedCategories.length > 0) {
      const newObject = {
        "@type": "in",
        "fields": ["themes.id"],
        "long_value": selectedCategories,
        "any": true
      };
  
      if (categoriesIndex > -1) {
        updatedPayload.criteria.subs[categoriesIndex] = newObject; 
      } else {
        updatedPayload.criteria.subs.push(newObject); 
      }
  } else if (categoriesIndex > -1) { 
      updatedPayload.criteria.subs.splice(categoriesIndex, 1); 
  }

  const suffixesIndex = updatedPayload.criteria.subs.findIndex(
    sub => sub["@type"] === "in" && sub.fields && sub.fields.includes("customAttribute_28.id")
  );

  if (selectedSuffixes && selectedSuffixes.length > 0) {
    const newObject = {
      "@type": "in",
      "fields": ["customAttribute_28.id"],
      "long_value": selectedSuffixes,
      "any": true
    };

    if (suffixesIndex > -1) {
      updatedPayload.criteria.subs[suffixesIndex] = newObject;
    } else {
      updatedPayload.criteria.subs.push(newObject);
    }
  } else if (suffixesIndex > -1) {
    updatedPayload.criteria.subs.splice(suffixesIndex, 1);
  }

  const parentVdbsSub = updatedPayload.criteria.subs.find(sub => sub.subs);

  const vdbsIndex = parentVdbsSub.subs.findIndex(
    sub => sub["@type"] === "in" && sub.fields && sub.fields.includes("vdb.id")
  );

  if (selectedVdbs && selectedVdbs.length > 0) {
    const newObject = {
      "@type": "in",
      "fields": ["vdb.id"],
      "long_value": selectedVdbs,
      "any": true
    };

    if (vdbsIndex > -1) {
      parentVdbsSub.subs[vdbsIndex] = newObject;
    } else {
      parentVdbsSub.subs.push(newObject);
    }    
  } else if (vdbsIndex > -1) {
    parentVdbsSub.subs.splice(vdbsIndex, 1);
  }

  const keywordsIndex = updatedPayload.criteria.subs.findIndex(
    sub => sub["@type"] === "in" && sub.fields && sub.fields.includes("customAttribute_27.id")
  );

  if (selectedKeywords && selectedKeywords.length > 0) {
    const newObject = {
      "@type": "in",
      "fields": ["customAttribute_27.id"],
      "long_value": selectedKeywords,
      "any": true
    };

    if (keywordsIndex > -1) {
      updatedPayload.criteria.subs[keywordsIndex] = newObject;
    } else {
      updatedPayload.criteria.subs.push(newObject);
    }
  } else if (keywordsIndex > -1) { 
    updatedPayload.criteria.subs.splice(keywordsIndex, 1);  
  }

  const tagsIndex = updatedPayload.criteria.subs.findIndex(
    sub => sub["@type"] === "in" && sub.fields && sub.fields.includes("keywords_multi")
  );

  if (selectedTags && selectedTags.length > 0) {
    const newObject = {
      "@type": "in",
      "fields": ["keywords_multi"],
      "text_value": selectedTags,
      "any": true
    };

    if (tagsIndex > -1) {
      updatedPayload.criteria.subs[tagsIndex] = newObject;
    } else {
      updatedPayload.criteria.subs.push(newObject);
    }
  } else if (tagsIndex > -1) { 
    updatedPayload.criteria.subs.splice(tagsIndex, 1);  
  }

  return updatedPayload;
}

export const elasticSearchService = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords) => {
  
  const updatedPayload = updateSearchPayload(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs, selectedKeywords);

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPayload)
  })

  const data = await response;

  return data;
}

export const querySearch = async (sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs) => {

  const updatedPayload = updateSearchPayload(sortingType, isAsc, offset, limit, query, selectedCategories, selectedSuffixes, selectedTags, selectedVdbs);

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPayload),
  })

  const data = await response;
  
  return data;
}

export const assetVersionsService = async (assetId) => {
  
  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.0/versions/assets/${assetId}`, {
    method: 'GET',
  })

  const assetVersions = await response;

  return assetVersions;
};

export const assetVariantsService = async (assetId) => {
  
  const response = apiServiceHandler(`${BASE_URL}/rest/mp/v1.0/assets/masters/${assetId}/variants`, {
    method: 'GET',
  })

  const assetVariants = await response;

  return assetVariants;
};

export const assetRelationsService = async (assetId) => {
  try {
    const relationsArray = await apiServiceHandler(`${BASE_URL}/rest/mp/v1.2/assets/${assetId}/relations`, {
      method: 'GET',
    });
  
    const relationsArrayUniqueIds = relationsArray.relations
      .map(item => item.relatedAssetId)
      .reduce((unique, item) => {
        return unique.includes(item) ? unique : [...unique, item];
      }, []);
   
  
    const payloadArray = relationsArrayUniqueIds.map(assetId => ({ assetId }));

    const token = await getApiBearerToken();

    const response = await apiServiceHandler(`${BASE_URL}/rest/mp/v1.0/assets/load`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({assetVersionIds: payloadArray, expandable: "license, uploadApproval"}),
    });

    const relatedAssets = await response;

    return relatedAssets;

  } catch (error) {
    console.error("Asset Relations Service Error" + error);
    return null;
  }
};

