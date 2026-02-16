import payload from './w2pPayload.json'
import payloadSingleTemplate from './w2pPayloadSingleTemplate.json'
import all from './templateStatusPayloads/all.json'
import allActive from './templateStatusPayloads/allActive.json'
import allInProgress from './templateStatusPayloads/allInProgress.json'
import archived from './templateStatusPayloads/archived.json'
import finalized from './templateStatusPayloads/finalized.json'
import grantedApprovals from './templateStatusPayloads/grantedApprovals.json'
import inApproval from './templateStatusPayloads/inApproval.json'
import invalid from './templateStatusPayloads/invalid.json'
import inWork from './templateStatusPayloads/inWork.json'
import rejectedApprovals from './templateStatusPayloads/rejectedApprovals.json'
import myDocuments from './documentStatusPayloads/myDocuments.json'
import inWorkDocuments from './documentStatusPayloads/inWorkDocuments.json'
import finalizedDocuments from './documentStatusPayloads/finalizedDocuments.json'
import inApprovalDocuments from './documentStatusPayloads/inApprovalDocuments.json'
import rejectedDocuments from './documentStatusPayloads/rejectedDocuments.json'
import archivedDocuments from './documentStatusPayloads/archivedDocuments.json'
import invalidDocuments from './documentStatusPayloads/invalidDocuments.json'

const BASE_URL = process.env.REACT_APP_MGNL_HOST_NEW; 

const apiServiceHandler = async (url, options) => {
  try {    
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
  }
}

export const getApiBearerToken = () => apiServiceHandler(`${BASE_URL}/rest/sso/auth/jaas/jwt`);

const payloadIds = (templateId) => {

  const payloadCopy = payloadSingleTemplate;
  
  payloadCopy.ids = templateId;

  return payloadCopy;
}

export const idSearch = async (templateId) => {

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/_search?sort=creationDate&sort-direction=desc&size=21&from=0`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payloadIds(templateId)),
  })

  const data = await response;
  
  return data;
}

const templatesSearchPayload = (query, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus) => {
  let payloadCopy;

  switch (selectedTemlateStatus) {
    case "all":
      payloadCopy = { ...all };
      break;
    case "all-active":
      payloadCopy = { ...allActive };
      break;
    case "all-in-progress":
      payloadCopy = { ...allInProgress };
      break;
    case "archived":
      payloadCopy = { ...archived };
      break;
    case "finalized":
      payloadCopy = { ...finalized };
      break;
    case "granted-approvals":
      payloadCopy = { ...grantedApprovals };
      break;
    case "in-approval":
      payloadCopy = { ...inApproval };
      break;
    case "invalid":
      payloadCopy = { ...invalid };
      break;
    case "in-work":
      payloadCopy = { ...inWork };
      break;
    case "rejected-approvals":
      payloadCopy = { ...rejectedApprovals };
      break;
    default:
      payloadCopy = { ...payload };
  }

  payloadCopy.searchText = query;

  payloadCopy.propertySelections = {};

  if (selectedVdb && selectedVdb !== "undefined") {
    payloadCopy.databaseId = selectedVdb;
  }

  if (selectedColor && selectedColor !== "undefined") {
    console.log("selectedColor");
    console.log(selectedColor);
    payloadCopy.color = selectedColor;
  }

  if (selectedFormat && selectedFormat !== "undefined") {
    console.log("selectedFormat");
    console.log(selectedFormat);
    payloadCopy.format = selectedFormat;
  }

  if (selectedOutput && selectedOutput !== "undefined") {
    payloadCopy.printMethod = selectedOutput;
  }

  return payloadCopy;
}

export const templatesSearchService = async (query, sortType, sortDirection, size, offset, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus) => {

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/_search?sort=${sortType}&sort-direction=${sortDirection}&size=${size}&from=${offset}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(templatesSearchPayload(query, selectedVdb, selectedColor, selectedFormat, selectedOutput, selectedTemlateStatus)),
  })

  const data = await response;
  
  return data;
}

const documentsSearchPayload = (query, selectedTemplateType, selectedDetails, selectedDocumentStatus) => {
  let payloadCopy;

  switch (selectedDocumentStatus) {
    case "my":
      payloadCopy = { ...myDocuments };
      break;
    case "in-work":
      payloadCopy = { ...inWorkDocuments };
      break;
    case "finalized":
      payloadCopy = { ...finalizedDocuments };
      break;
    case "in-approval":
      payloadCopy = { ...inApprovalDocuments };
      break;
    case "rejected":
      payloadCopy = { ...rejectedDocuments };
      break;
    case "archived":
      payloadCopy = { ...archivedDocuments };
      break;
    case "invalid":
      payloadCopy = { ...invalidDocuments };
      break;
    default:
      payloadCopy = { ...myDocuments };
  }

  payloadCopy.searchText = query;

  payloadCopy.propertySelections = {};

  if (selectedTemplateType) {
    payloadCopy.propertySelections["CUSTOM_PROPERTY(TEMPLATE_TYPE)"] = selectedTemplateType;
  }

  if (selectedDetails) {
    payloadCopy.propertySelections["CUSTOM_PROPERTY(DETAILS)"] = selectedDetails;
  }

  return payloadCopy;
}

export const documentsSearchService = async (query, sortType, sortDirection, size, offset, selectedTemplateType, selectedDetails, selectedDocumentStatus) => {

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/_search?sort=${sortType}&sort-direction=${sortDirection}&size=${size}&from=${offset}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(documentsSearchPayload(query, selectedTemplateType, selectedDetails, selectedDocumentStatus)),
  })

  const data = await response;
  
  return data;
}

export const payloadSearch = async (payload, sortType, sortDirection, from, size) => {

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/_search?sort=${sortType}&sort-direction=${sortDirection}&size=${size}&from=${from}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  })

  const data = await response;
  
  return data;
}

export const favouriteTemplates = async (size) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/v2/templates/favorites?sort=title&sort-direction=asc&size=${size || 20}&from=0`, {
    method: 'GET',
  })

  const favourites = await response;

  return favourites;
};

export const recentlyUsedTemplates = async (size) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/recently-used?size=${size || 20}&from=0`, {
    method: 'GET',
  })

  const recentlyUsed = await response;

  return recentlyUsed;
};

export const newTemplates = async (size) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/newest?sort=creationDate&sort-direction=desc&size=${size || 20}&from=0`, {
    method: 'GET',
  })

  const newest = await response;

  return newest;
};

export const myDocumentsService = async (offset, limit, sortType, sortDirection) => {

  const token = await getApiBearerToken();

  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/_search?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(myDocuments),
  })

  const myDocuments = await response;
  
  return myDocuments;
}

export const inWorkDocumentsService = async (offset, limit, sortType, sortDirection) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/in-work/my?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}`, {
    method: 'GET',
  })

  const inWork = await response;

  return inWork;
};

export const finalizedDocumentsService = async (offset, limit, sortType, sortDirection) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/finalized/my?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}&showArchived=false`, {
    method: 'GET',
  })

  const finalized = await response;

  return finalized;
};

export const rejectedDocumentsService = async (offset, limit, sortType, sortDirection) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/rejected/my?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}`, {
    method: 'GET',
  })

  const rejected = await response;

  return rejected;
};

export const waitingApprovalDocumentsService = async (offset, limit, sortType, sortDirection) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/waiting-approval/my?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}`, {
    method: 'GET',
  })

  const waitingApproval = await response;

  return waitingApproval;
};

export const archivedDocumentsService = async (offset, limit, sortType, sortDirection) => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/instances/finalized/my?from=${offset}&size=${limit}&sort=${sortType}&sort-direction=${sortDirection}&showArchived=true`, {
    method: 'GET',
  })

  const archived = await response;

  return archived;
};

export const findInstanceId = async (templateId) => {

  const token = await getApiBearerToken();
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/templates/${templateId}/instances`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        "editTemplateLayouts": true,
        "instanceAppCode": 1
      }
    ),
  })

  const instanceId = await response;

  return instanceId;
};

export const findFavourites = async () => {
  
  const response = apiServiceHandler(`${BASE_URL}/wp/rest/v2/templates/favorites?sort=title&sort-direction=asc&size=50&from=0`, {
    method: 'GET',
  })

  const favourites = await response;

  return favourites;
};

export const addToFavourites = async (templateId) => {
  
  apiServiceHandler(`${BASE_URL}/wp/rest/v2/templates/favorites/T-${templateId}`, {
    method: 'POST',
  })
};

export const deleteFromFavourites = async (templateId) => {
  
  apiServiceHandler(`${BASE_URL}/wp/rest/v2/templates/favorites/T-${templateId}`, {
    method: 'DELETE',
  })
};

