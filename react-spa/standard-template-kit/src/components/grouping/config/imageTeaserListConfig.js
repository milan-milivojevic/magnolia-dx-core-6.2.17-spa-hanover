import React, {useRef} from 'react';
import { EditableArea } from '@magnolia/react-editor';

function ImageTeaserListConfig ({ 
  column1,
  layout,
  columnGap,
  rowGap,
  width,
  position,
  headline,
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  headlineFontSize,
  headlineColor,
  headlineLineHeight,
  headlineLetterSpacing,
  headlinePaddingTop,
  headlinePaddingRight,
  headlinePaddingBottom,
  headlinePaddingLeft,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderColor,
  wrapperBorderRadius,  
  styleName
}) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const HeadlineLevel = headlineLevel || "h1";

  const listComponentStyles = {
    width: width || null,
    margin: position || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    textAlign:  headlinePosition || null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing:  headlineLetterSpacing || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null,
  }

  const listStyles = {
    gridColumnGap: columnGap || null,
    gridRowGap: rowGap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderColor: wrapperBorderColor || null,
    borderRadius: wrapperBorderRadius || null                
  }

  return (
    <div className='imageTeaserListWrapper configComponents'>
      <div className="copyStyleName">      
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>  
      <div className='imageTeaserListComponent' style={listComponentStyles}>
        {headline && <HeadlineLevel className="headline" style={headlineStyles}>{headline || null}</HeadlineLevel>}   
        <ul className={`imageTeaserList`}style={listStyles}>
          {column1 && <EditableArea className={`listComponents imageTeasersArea layout${layout}`} content={column1}/>}
        </ul>
      </div>
    </div>
  );
}

export default ImageTeaserListConfig;