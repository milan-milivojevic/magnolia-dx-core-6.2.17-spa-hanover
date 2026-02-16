import responseDataJson from './data.json'
import responseDataJson2 from './data2.json'
import responseDataJson3 from './data3.json'
import payload from './payload.json'
import { formatFields } from '../helpers/utils'
import payloadInputAutocomplete from './payloadInputAutocomplete.json'

const setBasicSorting = (sortingType = 'uploadDate', isAsc = false, offset = 0) => {
  const sortingObject = sortingType === 'relevance' ? [{ "@type": sortingType, "asc": isAsc }] : [{ "@type": "field", "field": sortingType, "asc": isAsc }]
  const payloadSort = payload

  payloadSort.output.sorting = sortingObject
  payloadSort.output.paging = {...payloadSort.output.paging, offset }

  return payloadSort
}

const pages = [
  responseDataJson, responseDataJson2, responseDataJson3
]

// const BASE_URL = "https://proquest.brandmakerinc.com/rest/mp/v1.1/search"
const BASE_URL = process.env.REACT_APP_MGNL_HOST_NEW; 

const apiServiceHandler = async (url, options) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Something went wrong!")
    }

    const data = await response.json()

    return data

  } catch (error) {
    console.error(error)
  }
}

export const getApiBearerToken = () => apiServiceHandler(`${BASE_URL}/rest/sso/auth/jaas/jwt`)

export const postSearchToken = async (page, sortingType, isAsc, offset) => {
  
  // modify payload for sorting purposes
  const payloadSorting = setBasicSorting(sortingType, isAsc, offset)
  
  console.log(payloadSorting);
  const token = await getApiBearerToken();

  const res = apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const resJson = await res;

  // const flatItems = resJson.items.map(({ fields }) => formatFields(fields))
  // console.log("flatItems");
  // console.log(flatItems);
  // // get image for each item
  // const updatedItems = resJson.items.map(async (item) => {
    
  //   const src = await getImageById(item.fields.id.value)
  //   console.log(src);
  //   const updatedItem = {...item, src}
  //   return updatedItem
  // })
  // console.log(updatedItems);

  return resJson
}

export const getImageById = async (id) => {
  const token = await getApiBearerToken();
  const res = apiServiceHandler(`${BASE_URL}/rest/mp/previews/middle/asset/${id}/version/0?generateWatermark=false`, {
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
  })
  return res;
}

const payloadInpAutocomplete = (query) => {
  
  const payloadCopy = payloadInputAutocomplete
  payloadCopy.criteria.subs[0].value = '"' + query + '"'
  console.log(payloadCopy.criteria.subs);
  return payloadCopy
}

export const searchAutocomplete = async (query) => {
  const token = await getApiBearerToken();
  const res = await apiServiceHandler(`${BASE_URL}/rest/mp/v1.1/search`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payloadInpAutocomplete(query)),
  })
  let suggestions = []
  res.aggregations.suggest?.subGroups?.forEach(({ group }) => {
    suggestions.push(group)
  })
  return res
}