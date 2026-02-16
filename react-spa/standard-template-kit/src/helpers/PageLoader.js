import React from 'react';
import config from '../magnolia.config';
import { getAPIBase, getLanguages, removeCurrentLanguage, getCurrentLanguage, getVersion } from './AppHelpers';

import { EditablePage, EditorContextHelper } from '@magnolia/react-editor';

class PageLoader extends React.Component {
  state = {};

  getPagePath = () => {
    const languages = getLanguages();
    const nodeName = process.env.REACT_APP_MGNL_APP_BASE;
    const currentLanguage = getCurrentLanguage();
    let path = nodeName + this.props.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '');

    if (currentLanguage !== languages[0]) {
      path = removeCurrentLanguage(path, currentLanguage);
      path += '?lang=' + currentLanguage;
    }

    return path;
  };

  loadPage = async () => {
    // Bail out if already loaded content.
    if (this.state.pathname === this.props.pathname) return;

    const apiBase = getAPIBase();

    const pagePath = this.getPagePath();
    // console.log('pagePath:' + pagePath);
    const config = {
      headers: {},
    };

    const isPersonalizationPage = sessionStorage.getItem(`personalized_${this.props.pathname.replace(/\//g, '_')}`);

    const params = new URLSearchParams(window.location.search);

    const version = getVersion(window.location.href);

    if (version) {
      params.append('version', version);
    }

    if (params.get('mgnlPreviewAsVisitor') !== 'true' && EditorContextHelper.inIframe()) {
      params.append('variants', 'all');
    }

    const queryString = params.toString();

    const ageHeader = sessionStorage.getItem('mgnlAgeHeader');
    if (isPersonalizationPage && ageHeader && !EditorContextHelper.inIframe()) {
      config.headers['X-Mgnl-Age'] = ageHeader;
    }

    let fullContentPath = `${apiBase}${process.env.REACT_APP_MGNL_API_PAGES}${pagePath}`;

    if (queryString) {
      if (fullContentPath.includes('?')) {
        fullContentPath += '&';
      } else {
        fullContentPath += '?';
      }

      fullContentPath += queryString;
    }

    const pageResponse = await fetch(fullContentPath, config);
    const pageJson = await pageResponse.json();
    // console.log('page content: ', pageJson);

    // const templateId = pageJson['mgnl:template'];
    // console.log('templateId:', templateId);

    let templateJson = {};

    if (window.location.search.includes('mgnlPreview')) {
      const templateResponse = await fetch(apiBase + process.env.REACT_APP_MGNL_API_TEMPLATES + pagePath);
      templateJson = await templateResponse.json();
      // console.log('definition:', templateJson);
    }

    this.setState({
      init: true,
      content: pageJson,
      templateAnnotations: templateJson,
      pathname: this.props.pathname,
    });
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    if (this.state.init) {
      // console.log('config:', config);
      //const isDevMode = process.env.NODE_ENV === 'development';
      //console.log("n:" + process.env.NODE_ENV)

      return (
        <EditablePage
          templateAnnotations={this.state.templateAnnotations || {}}
          content={this.state.content}
          config={config}
        ></EditablePage>
      );
    } else {
      return <p></p>;
    }
  }
}

export default PageLoader;
