import { React, useState } from "react";
import { EditableArea } from "@magnolia/react-editor";

function Tab ({
  accordionComponents,
  title,
  accordionListProps
}) {

  const list = [...accordionListProps];
  console.log(list);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  return (
    <div className="accordionWrapper"
      style={{ paddingBottom: list[0].horizontalGap !== null ? list[0].horizontalGap : null }}
    >
      <div className="accordion">
        <div className="item">
          <h3 className="title" onClick={() => toggle()}
            style={{
              paddingTop: list[0].accordionPaddingTop !== null ? list[0].accordionPaddingTop : null,
              paddingRight: list[0].accordionPaddingRight !== null ? list[0].accordionPaddingRight : null,
              paddingBottom: list[0].accordionPaddingBottom !== null ? list[0].accordionPaddingBottom : null,
              paddingLeft: list[0].accordionPaddingLeft !== null ? list[0].accordionPaddingLeft : null,
              borderWidth: list[0].accordionBorderWidth !== null ? list[0].accordionBorderWidth : null,
              borderStyle: list[0].accordionBorderStyle !== null ? list[0].accordionBorderStyle : null,
              borderColor: list[0].accordionBorderColor !== null ? list[0].accordionBorderColor : null,
              borderRadius: list[0].accordionBorderRadius !== null ? list[0].accordionBorderRadius : null,
              fontSize: list[0].titleFontSize !== null ? list[0].titleFontSize : null,
              lineHeight: list[0].titleLineHeight !== null ? list[0].titleLineHeight : null,
              color: list[0].titleColor !== null ? list[0].titleColor : null,
              backgroundColor: list[0].accordionDefaultBackColor !== null ? list[0].accordionDefaultBackColor : null
            }}>
            {title} {open ?
              <span className="arrowUp" style={{ color: list[0].chevronColor !== null ? list[0].chevronColor : null }}>🢕</span> :
              <span className="arrowDown" style={{ color: list[0].chevronColor !== null ? list[0].chevronColor : null }}>🢗</span>
            }
          </h3>
          <div className={open ? 'content show' : 'content hide'}
            style={{ paddingTop: list[0].horizontalGap !== null ? list[0].horizontalGap : null }}
          >
            {accordionComponents !== undefined ? <EditableArea className='accordionArea' content={accordionComponents} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tab;
