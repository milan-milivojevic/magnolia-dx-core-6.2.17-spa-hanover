import React, { useRef, useEffect, useState } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';

function CorporateIdentityColors ({
  multi,
  nameFontSize,
  nameFontFamily,
  nameColor,
  nameBold,
  namePosition,
  namePaddingTop,
  namePaddingRight,
  namePaddingBottom,
  namePaddingLeft,
  previewStyle,
  previewHeight,
  previewNameSize,  
  gap,
  componentWidth,
  componentPosition,
  wrapperPaddingTop,
  wrapperPaddingRight,
  wrapperPaddingBottom,
  wrapperPaddingLeft,  
  styleName,
  noStyles
}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
      fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/corporateIdentityColorsComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
          let result = data.find(item => item.styleName === styleName);
          if (!result && noStyles === (false || "false")) {
          result = data[0];
          } else if (noStyles !== (false || "false")) {
          result = null;
          } 
          setConfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);

  const widthRef = useRef(null);

  const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
    useEffect(() => {
      const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
      })  

      const handleResize = () => {
        setDimensions(getDimensions())
      }

      if (myRef.current) {
        setDimensions(getDimensions())
      }      
  
      window.addEventListener("resize", handleResize)

      const myInterval = setInterval(handleResize, 500);
  
      return () => {
        window.removeEventListener("resize", handleResize);
        setTimeout(function(){
          clearInterval(myInterval);
        }, 5000);
        
      }     

    }, [myRef])
  
    return dimensions;
  };

  const { width } = useContainerDimensions(widthRef);

  const colorNames = [];
	for (let i = 0; i <= 10; i++) {
		colorNames.push(multi[`multi${i}`]?.colorName);
	}
	const activeColorNames = colorNames.filter((item) => {
		return item !== undefined;
	})

  const layout = activeColorNames.length;

  const nameStyles = {
    fontSize: nameFontSize || configProps?.nameFontSize || null,
    fontFamily: nameFontFamily || configProps?.nameFontFamily || null,
    color: nameColor || configProps?.nameColor || null,
    textAlign: namePosition || configProps?.namePosition || null,    
    fontWeight: nameBold || configProps?.nameBold || null,
    paddingTop: namePaddingTop || configProps?.namePaddingTop || null,
    paddingRight: namePaddingRight || configProps?.namePaddingRight || null,
    paddingBottom: namePaddingBottom || configProps?.namePaddingBottom || null,
    paddingLeft: namePaddingLeft || configProps?.namePaddingLeft || null
  }

  const componentStyles = {
    width: componentWidth || configProps?.componentWidth || null,
    margin: componentPosition || configProps?.componentPosition || null,
    gap: gap || configProps?.gap || null,
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,
  }

  const previewStyleProps = previewStyle || configProps?.previewStyle || null;

  const borderRadius = previewStyleProps === "circle" || previewStyleProps === "circleName" ? "100%" : "0%";
  const showName = previewStyleProps === "squareName" || previewStyleProps === "circleName" ? true : false;
  const isCircle = previewStyleProps === "circle" || previewStyleProps === "circleName" ? true : false;

  return (
    <div className='corporateIdentityColorsWrapper configComponents'>
      <div className={`corporateIdentityColors layout${layout}`} style={componentStyles}>
        {activeColorNames.map((colors, i) =>      
          <div className={`corporateIdentityColor color${i}`} ref={widthRef} key={i}>
            <div className="previewColor" 
                 style={{backgroundColor: multi[`multi${i}`]?.previewColor,
                         border: multi[`multi${i}`]?.previewBorder,
                         borderRadius: borderRadius,
                         borderColor: multi[`multi${i}`]?.previewBorderColor,
                         color: multi[`multi${i}`]?.previewFontColor,
                         height: previewHeight || configProps?.previewHeight || width ||  null,
                         maxHeight: width || null,
                         maxWidth: isCircle ? previewHeight || configProps?.previewHeight || null : null,
                         fontSize: previewNameSize || nameFontSize || configProps?.previewNameSize || configProps?.nameFontSize || null
                       }}>
              {showName ? multi[`multi${i}`]?.colorName : null}
            </div>
            <div className="colorName" style={nameStyles}>{multi[`multi${i}`]?.colorName}</div>
            <div className={`colorModes`} 
                 dangerouslySetInnerHTML={{ __html:multi[`multi${i}`]?.colorModes || null }}  
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}



export default CorporateIdentityColors;
