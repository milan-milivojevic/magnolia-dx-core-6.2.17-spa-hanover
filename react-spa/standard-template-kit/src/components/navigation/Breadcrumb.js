import React, { useState, useEffect } from 'react';
import { CgChevronRight } from "react-icons/cg";
import { getAPIBase } from '../../helpers/AppHelpers';

const Breadcrumb = ({title}) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

  const pathParts = path.split('/').filter(part => part !== 'cmsAuthor' &&  part !== 'cmsPublic' &&  part !== 'en' && part !== 'de' && part !== '');

  const breadcrumbs = pathParts.map((part, index) => {
    const linkPath = `/${pathParts.slice(0, index + 1).join('/')}`;

    if (index === pathParts.length - 1) {
      return <span className="lastItem" key={part}>{title}</span>;
    }

    return (
      <React.Fragment key={part}>
        <a href={`${apiBase}${linkPath}`}>{part}</a>
        <CgChevronRight />
      </React.Fragment>
    );
  });

  return <div className="breadcrumb">{breadcrumbs}</div>;
};

export default Breadcrumb;
