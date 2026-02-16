import React, { useState, useEffect } from 'react';
import '../css.css';
import { events, getRouterBasename, getAPIBase } from "../helpers/AppHelpers";

function findNodeById(node, targetId) {
  if (!node || typeof node !== 'object') return null;

  if (node['@id'] === targetId) {
    return node;
  }

  if (node['@nodes'] && Array.isArray(node['@nodes'])) {
    for (const childName of node['@nodes']) {
      const found = findNodeById(node[childName], targetId);
      if (found) return found;
    }
  }
  return null;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function RedirectPage ({
  linkType,
  page,
  external,
}) {
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const apiBase = getAPIBase();
  
  const [path, setPath] = useState("");

  if (linkType === "external" && external) {
    setPath(external);
    window.open(external, "_blank");
    window.history.pushState({}, "", getRouterBasename());
    events.emit("popstate");
  }

  useEffect(() => {
    (async () => {
      if (linkType === "page") {
        let finalPath = page;
        setPath(page);
        if (isUuid(page)) {
          try {
            const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
            const response = await fetch(url);
            const data = await response.json();

            const foundNode = findNodeById(data, page);
            if (foundNode && foundNode['@path']) {
              finalPath = foundNode['@path']; 
              setPath(foundNode['@path']);
            }
          } catch (err) {
            console.error("Greška prilikom dohvata navigacije:", err);
          }
        }

        const computedHref = (getRouterBasename() + finalPath)
          .replace("//", "/")
          .replace("Home/Home", "Home");

        if (!editMode) {
          window.history.pushState({}, "", computedHref);
          events.emit("popstate");
        }  
      }
    })();

  }, [editMode, linkType, page, external, apiBase]);

  if (editMode) {
    return (
      <div class="contentPage">
        <p style={{padding: "50px 0px", fontSize: "16px"}}>This is a redirect template. On public instances or in preview this page will be redirected to: <b>{`${path}`}</b></p>
      </div>
    );
  }

  return null;
}

export default RedirectPage;
