import React from 'react';
import '../css.css';
import {events} from "../helpers/AppHelpers";

function RedirectPage ({
}) {

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  const href1 = "https://hanover.brandmakerinc.com/cmsPublic";
  const href2 = "https://hanover.brandmakerinc.com/cmsPublic/Home";
  
  window.history.pushState({}, "", href1);
  window.history.pushState({}, "", href2);
  events.emit("popstate");


  return (
    <>
      {editMode ? (
        <p style={{padding: "50px 25px", fontWeight: "bold", fontSize: "16px"}}>This page is not configurable</p>
      ) : null}
    </>
  );

}

export default RedirectPage;