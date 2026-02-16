import React from "react";
import { EditableArea } from "@magnolia/react-editor";
import "../../css.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function MainPage(props) {
  const { 
    title,
    pagesConfigComponent,
    headerConfigComponent,
    topNavConfigComponent,
    leftNavConfigComponent,
    navLevelsConfigComponent, 
    headlinesConfigComponent,
    paragraphsConfigComponent
  } = props;

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className="configComponentsPage">
        <h1 className="titles">Pages Configuration Component</h1>
        <div> {pagesConfigComponent && <EditableArea content={pagesConfigComponent} />}</div>
        <h1 className="titles">Header Configuration Component</h1>
        <div> {headerConfigComponent && <EditableArea content={headerConfigComponent} />}</div>
        <h1 className="titles">Top Navigation Configuration Component</h1>
        <div> {topNavConfigComponent && <EditableArea content={topNavConfigComponent} />}</div>
        <h1 className="titles">Left Navigation Configuration Component</h1>
        <div> {leftNavConfigComponent && <EditableArea content={leftNavConfigComponent} />}</div>
        <h1 className="titles">Navigation Levels Configuration Component</h1>
        <div> {navLevelsConfigComponent && <EditableArea content={navLevelsConfigComponent} />}</div>
        <h1 className="titles">Headlines Configuration Component</h1>
        <div> {headlinesConfigComponent && <EditableArea content={headlinesConfigComponent} />}</div>
        <h1 className="titles">Paragraphs Configuration Component</h1>
        <div> {paragraphsConfigComponent && <EditableArea content={paragraphsConfigComponent} />}</div>      
      </div>
    </HelmetProvider>
  );
}

export default MainPage;
