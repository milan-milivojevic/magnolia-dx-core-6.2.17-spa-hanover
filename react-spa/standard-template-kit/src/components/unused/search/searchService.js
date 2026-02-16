import responseDataJson from '../../../api/data.json'
import responseDataJson2 from '../../../api/data2.json'
import responseDataJson3 from '../../../api/data3.json'
import payload from '../../../api/payload.json'

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

  // const data = JSON.parse(res)
  // console.log(data);
  // const data = JSON.stringify(pages[page])

  return res
}