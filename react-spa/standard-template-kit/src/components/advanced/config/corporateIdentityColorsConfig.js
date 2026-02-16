import React, { useRef, useEffect, useState } from 'react';

function CorporateIdentityColorsConfig ({
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
  styleName
}) {

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
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
  };

  const { width } = useContainerDimensions(widthRef);

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const colorNames = [];
	for (let i = 0; i <= 10; i++) {
		colorNames.push(multi[`multi${i}`]?.colorName);
	}
	const activeColorNames = colorNames.filter((item) => {
		return item !== undefined;
	})

  const layout = activeColorNames.length;

  const nameStyles = {
    fontSize: nameFontSize || null,
    fontFamily: nameFontFamily || null,
    color: nameColor || null,
    textAlign: namePosition || null,    
    fontWeight: nameBold || null,
    paddingTop: namePaddingTop || null,
    paddingRight: namePaddingRight || null,
    paddingBottom: namePaddingBottom || null,
    paddingLeft: namePaddingLeft || null
  }

  const componentStyles = {
    width: componentWidth || null,
    margin: componentPosition || null,
    gap: gap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
  }

  const borderRadius = previewStyle === "circle" || previewStyle === "circleName" ? "100%" : "0%";
  const showName = previewStyle === "squareName" || previewStyle === "circleName" ? true : false;
  const isCircle = previewStyle === "circle" || previewStyle === "circleName" ? true : false;

  return (
    <div className='corporateIdentityColorsWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className={`corporateIdentityColors layout${layout}`} style={componentStyles}>
        {activeColorNames.map((colors, i) =>      
          <div className={`corporateIdentityColor color${i}`} ref={widthRef} key={i}>
            <div className="previewColor" 
                 style={{backgroundColor: multi[`multi${i}`]?.previewColor,
                         border: multi[`multi${i}`]?.previewBorder,
                         borderRadius: borderRadius,
                         borderColor: multi[`multi${i}`]?.previewBorderColor,
                         color: multi[`multi${i}`]?.previewFontColor,
                         height: previewHeight || width || null,
                         maxHeight: width || null,
                         maxWidth: isCircle ? previewHeight || null : null,
                         fontSize: previewNameSize || nameFontSize || null
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



export default CorporateIdentityColorsConfig;
