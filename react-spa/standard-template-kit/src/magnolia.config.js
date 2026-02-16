import HomePage from "./pages/home";
import ContentPage from "./pages/content";
import LeftHandNavigationPage from "./pages/leftHandNavigation";
import RedirectPage from "./pages/redirect";
import LandingPage from "./pages/landingPage";

import MainPage from "./pages/config/main";
import BasicComponentsConfiguration from "./pages/config/basicComponents";
import AdvancedComponentsConfiguration from "./pages/config/advancedComponents";
import LayoutComponentsConfiguration from "./pages/config/layoutComponents";
import GroupingComponentsConfiguration from "./pages/config/groupingComponents";
import TeaserComponentsConfiguration from "./pages/config/teaserComponents";

import StaticContentSearchPage from "./pages/search/staticContent";
import MPSearchPage from "./pages/search/mpSearch";
import W2PSearchPage from "./pages/search/w2pSearch";
import GlobalSearchPage from "./pages/search/globalSearch";

import GlobalSearch from "./components/search/globalSearch";

import MPSearch from "./components/search/mpSearch";
import MpCustomSearch from "./components/mediaPool/mpCustomSearch";
import MpSingleAsset from "./components/mediaPool/mpSingleAsset";
import MPAssetsList from "./components/mediaPool/mpAssetsList";
import MpCarousel from "./components/mediaPool/mpCarousel";

import W2PSingleTemplate from "./components/w2p/w2pSingleTemplate";
import W2PTemplatesList from "./components/w2p/w2pTemplatesList";
import W2PTemplatesCarousel from "./components/w2p/w2pTemplatesCarousel";
import W2PCustomTemplatesSearch from "./components/w2p/w2pCustomTemplatesSearch";
import W2PDocumentsByStatus from "./components/w2p/w2pDocumentsByStatus";
import W2PDocumentsSearch from "./components/search/w2pDocumentsSearch";
import W2PSearch from "./components/search/w2pSearch";


import PagesConfig from "./components/mainConfig/pagesConfig";
import HeaderConfig from "./components/mainConfig/headerConfig";
import TopNavConfig from "./components/mainConfig/topNavConfig";
import LeftNavConfig from "./components/mainConfig/leftNavConfig";
import NavLevelsConfig from "./components/mainConfig/navLevelsConfig";
import HeadlinesConfig from "./components/mainConfig/headlinesConfig";
import ParagraphsConfig from "./components/mainConfig/paragraphsConfig";

import Audio from "./components/basic/audio";
import Divider from "./components/basic/divider";
import Html from "./components/basic/html";
import iFrame from "./components/basic/iframe";
import Image from "./components/basic/image";
import ImageTest from "./components/basic/imageTest";
import Link from "./components/basic/link";
import SeparationBlock from "./components/basic/separationBlock";
import Spacer from "./components/basic/spacer";
import Text from './components/basic/text';
import Video from "./components/basic/video";
import Youtube from "./components/basic/youtube";

import AudioConfig from "./components/basic/config/audioConfig";
import DividerConfig from "./components/basic/config/dividerConfig";
import IframeConfig from "./components/basic/config/iframeConfig";
import ImageConfig from "./components/basic/config/imageConfig";
import LinkConfig from "./components/basic/config/linkConfig";
import SeparationBlockConfig from "./components/basic/config/separationBlockConfig";
import SpacerConfig from "./components/basic/config/spacerConfig";
import TextConfig from "./components/basic/config/textConfig";
import VideoConfig from "./components/basic/config/videoConfig";
import YoutubeConfig from "./components/basic/config/youtubeConfig";

import AccordionConfig from "./components/advanced/config/accordionConfig";
import BorderTeaserConfig from "./components/advanced/config/borderTeaserConfig";
import CardTeaserConfig from "./components/advanced/config/cardTeaserConfig";
import CarouselConfig from "./components/advanced/config/carouselConfig";
import CarouselDividedConfig from "./components/advanced/config/carouselDividedConfig";
import CarouselTeaserConfig from "./components/advanced/config/carouselTeaserConfig";
import CorporateFontsConfig from "./components/advanced/config/corporateFontsConfig";
import CorporateIconsConfig from "./components/advanced/config/corporateIconsConfig";
import CorporateIdentityColorsConfig from "./components/advanced/config/corporateIdentityColorsConfig";
import FooterNavigationConfig from "./components/advanced/config/footerNavigationConfig";
import GlobalLayoutComponentConfig from "./components/advanced/config/globalLayoutComponentConfig";
import SpecialLayoutComponentConfig from "./components/advanced/config/specialLayoutComponentConfig";
import ImageTeaserConfig from "./components/advanced/config/imageTeaserConfig";
import TextLinkConfig from "./components/advanced/config/textLinkConfig";

import Accordion from "./components/advanced/accordion";
import BorderTeaser from "./components/advanced/borderTeaser";
import CardTeaser from "./components/advanced/cardTeaser";
import Carousel from "./components/advanced/carousel";
import CarouselDivided from "./components/advanced/carouselDivided";
import CarouselTeaser from "./components/advanced/carouselTeaser";
import CorporateFonts from "./components/advanced/corporateFonts";
import CorporateIcons from "./components/advanced/corporateIcons";
import CorporateIdentityColors from "./components/advanced/corporateIdentityColors";
import FooterNavigation from "./components/advanced/footerNavigation";
import GlobalLayoutComponent from "./components/advanced/globalLayoutComponent";
import SpecialLayoutComponent from "./components/advanced/specialLayoutComponent";
import ImageTeaser from "./components/advanced/imageTeaser";

import TextLink from "./components/advanced/textLink";

import AccordionListConfig from "./components/grouping/config/accordionListConfig";
import BorderTeaserListConfig from "./components/grouping/config/borderTeaserListConfig";
import CardTeaserListConfig from "./components/grouping/config/cardTeaserListConfig";
import ImageGalleryConfig from "./components/grouping/config/imageGalleryConfig";
import ImageTeaserListConfig from "./components/grouping/config/imageTeaserListConfig";
import LinkListConfig from "./components/grouping/config/linkListConfig";
import TabsConfig from "./components/grouping/config/tabsConfig";
import TextLinkListConfig from "./components/grouping/config/textLinkListConfig";

import AccordionList from "./components/grouping/accordionList";
import BorderTeaserList from "./components/grouping/borderTeaserList";
import CardTeaserList from "./components/grouping/cardTeaserList";
import ImageGallery from "./components/grouping/imageGallery";
import ImageTeaserList from "./components/grouping/imageTeaserList";
import LinkList from "./components/grouping/linkList";
import Tabs from "./components/grouping/tabs";
import TextLinkList from "./components/grouping/textLinkList";

import BannerSection from "./components/sections/bannerSection";
import FooterSection from "./components/sections/footerSection";
import InnerSection from "./components/sections/innerSection";
import MainSection from "./components/sections/mainSection";


const config = {
    'componentMappings':{
        "standard-template-kit:pages/config/main": MainPage,
        "standard-template-kit:pages/home": HomePage,
        "standard-template-kit:pages/content": ContentPage,
        "standard-template-kit:pages/leftHandNavigation": LeftHandNavigationPage,
        "standard-template-kit:pages/redirect": RedirectPage,
        "standard-template-kit:pages/landingPage": LandingPage,
        "standard-template-kit:pages/config/basicComponents": BasicComponentsConfiguration,
        "standard-template-kit:pages/config/advancedComponents": AdvancedComponentsConfiguration,
        "standard-template-kit:pages/config/layoutComponents": LayoutComponentsConfiguration,
        "standard-template-kit:pages/config/groupingComponents": GroupingComponentsConfiguration,
        "standard-template-kit:pages/config/teaserComponents": TeaserComponentsConfiguration,

        "standard-template-kit:pages/search/staticContent": StaticContentSearchPage,
        "standard-template-kit:pages/search/mpSearch": MPSearchPage,
        "standard-template-kit:pages/search/w2pSearch": W2PSearchPage,
        "standard-template-kit:pages/search/globalSearch": GlobalSearchPage,

        "standard-template-kit:components/search/globalSearch": GlobalSearch,

        "standard-template-kit:components/search/mpSearch": MPSearch,
        "standard-template-kit:components/mediaPool/mpCustomSearch": MpCustomSearch,
        "standard-template-kit:components/mediaPool/mpSingleAsset": MpSingleAsset,
        "standard-template-kit:components/mediaPool/mpAssetsList": MPAssetsList,
        "standard-template-kit:components/mediaPool/mpCarousel": MpCarousel,

        "standard-template-kit:components/w2p/w2pSingleTemplate": W2PSingleTemplate,
        "standard-template-kit:components/w2p/w2pTemplatesList": W2PTemplatesList,
        "standard-template-kit:components/w2p/w2pTemplatesCarousel": W2PTemplatesCarousel,
        "standard-template-kit:components/w2p/w2pCustomTemplatesSearch": W2PCustomTemplatesSearch,
        "standard-template-kit:components/w2p/w2pDocumentsByStatus": W2PDocumentsByStatus,
        "standard-template-kit:components/search/w2pDocumentsSearch": W2PDocumentsSearch,
        "standard-template-kit:components/search/w2pTemplatesSearch": W2PSearch,


        "standard-template-kit:components/mainConfig/pagesConfig": PagesConfig,
        "standard-template-kit:components/mainConfig/headerConfig": HeaderConfig,
        "standard-template-kit:components/mainConfig/topNavConfig": TopNavConfig,
        "standard-template-kit:components/mainConfig/leftNavConfig": LeftNavConfig,
        "standard-template-kit:components/mainConfig/navLevelsConfig": NavLevelsConfig,
        "standard-template-kit:components/mainConfig/headlinesConfig": HeadlinesConfig,
        "standard-template-kit:components/mainConfig/paragraphsConfig": ParagraphsConfig,

        "standard-template-kit:components/basic/config/audioConfig": AudioConfig,
        "standard-template-kit:components/basic/config/dividerConfig": DividerConfig,
        "standard-template-kit:components/basic/config/iframeConfig": IframeConfig,
        "standard-template-kit:components/basic/config/imageConfig": ImageConfig,
        "standard-template-kit:components/basic/config/linkConfig": LinkConfig,
        "standard-template-kit:components/basic/config/separationBlockConfig": SeparationBlockConfig,
        "standard-template-kit:components/basic/config/spacerConfig": SpacerConfig,
        "standard-template-kit:components/basic/config/textConfig": TextConfig,
        "standard-template-kit:components/basic/config/videoConfig": VideoConfig,
        "standard-template-kit:components/basic/config/youtubeConfig": YoutubeConfig,        
        
        "standard-template-kit:components/advanced/config/accordionConfig": AccordionConfig,
        "standard-template-kit:components/advanced/config/borderTeaserConfig": BorderTeaserConfig,
        "standard-template-kit:components/advanced/config/cardTeaserConfig": CardTeaserConfig,
        "standard-template-kit:components/advanced/config/carouselConfig": CarouselConfig,
        "standard-template-kit:components/advanced/config/carouselDividedConfig": CarouselDividedConfig,
        "standard-template-kit:components/advanced/config/carouselTeaserConfig": CarouselTeaserConfig,
        "standard-template-kit:components/advanced/config/corporateFontsConfig": CorporateFontsConfig,
        "standard-template-kit:components/advanced/config/corporateIconsConfig": CorporateIconsConfig,
        "standard-template-kit:components/advanced/config/corporateIdentityColorsConfig": CorporateIdentityColorsConfig,
        "standard-template-kit:components/advanced/config/footerNavigationConfig": FooterNavigationConfig,
        "standard-template-kit:components/advanced/config/globalLayoutComponentConfig": GlobalLayoutComponentConfig,
        "standard-template-kit:components/advanced/config/specialLayoutComponentConfig": SpecialLayoutComponentConfig,
        "standard-template-kit:components/advanced/config/imageTeaserConfig": ImageTeaserConfig,
        "standard-template-kit:components/advanced/config/textLinkConfig": TextLinkConfig,

        "standard-template-kit:components/grouping/config/accordionListConfig": AccordionListConfig,
        "standard-template-kit:components/grouping/config/borderTeaserListConfig": BorderTeaserListConfig,
        "standard-template-kit:components/grouping/config/cardTeaserListConfig": CardTeaserListConfig,
        "standard-template-kit:components/grouping/config/imageGalleryConfig": ImageGalleryConfig,
        "standard-template-kit:components/grouping/config/imageTeaserListConfig": ImageTeaserListConfig,
        "standard-template-kit:components/grouping/config/linkListConfig": LinkListConfig,
        "standard-template-kit:components/grouping/config/tabsConfig": TabsConfig,
        "standard-template-kit:components/grouping/config/textLinkListConfig": TextLinkListConfig,
        
        "standard-template-kit:components/advanced/accordion": Accordion,
        "standard-template-kit:components/grouping/accordionList": AccordionList,
        "standard-template-kit:components/basic/audio": Audio,
        "standard-template-kit:components/sections/bannerSection": BannerSection,
        "standard-template-kit:components/advanced/borderTeaser": BorderTeaser,
        "standard-template-kit:components/grouping/borderTeaserList": BorderTeaserList,
        "standard-template-kit:components/advanced/cardTeaser": CardTeaser,
        "standard-template-kit:components/grouping/cardTeaserList": CardTeaserList,
        "standard-template-kit:components/advanced/carousel": Carousel,
        "standard-template-kit:components/advanced/carouselDivided": CarouselDivided,
        "standard-template-kit:components/advanced/carouselTeaser": CarouselTeaser,
        "standard-template-kit:components/advanced/corporateFonts": CorporateFonts,
        "standard-template-kit:components/advanced/corporateIcons": CorporateIcons,
        "standard-template-kit:components/advanced/corporateIdentityColors": CorporateIdentityColors,
        "standard-template-kit:components/basic/divider": Divider,
        "standard-template-kit:components/advanced/footerNavigation": FooterNavigation,
        "standard-template-kit:components/sections/footerSection": FooterSection,
        "standard-template-kit:components/advanced/globalLayoutComponent": GlobalLayoutComponent,
        "standard-template-kit:components/advanced/specialLayoutComponent": SpecialLayoutComponent,
        "standard-template-kit:components/basic/html": Html,
        "standard-template-kit:components/basic/iframe": iFrame,
        "standard-template-kit:components/basic/image": Image,
        "standard-template-kit:components/basic/imageTest": ImageTest,
        "standard-template-kit:components/grouping/imageGallery": ImageGallery,
        "standard-template-kit:components/advanced/imageTeaser": ImageTeaser,
        "standard-template-kit:components/grouping/imageTeaserList": ImageTeaserList,
        "standard-template-kit:components/sections/innerSection": InnerSection,
        "standard-template-kit:components/basic/link": Link,
        "standard-template-kit:components/grouping/linkList": LinkList,
        "standard-template-kit:components/sections/mainSection": MainSection,
        "standard-template-kit:components/basic/separationBlock": SeparationBlock,
        "standard-template-kit:components/basic/spacer": Spacer,
        "standard-template-kit:components/grouping/tabs": Tabs,
        "standard-template-kit:components/basic/text": Text,
        "standard-template-kit:components/advanced/textLink": TextLink,
        "standard-template-kit:components/grouping/textLinkList": TextLinkList,
        "standard-template-kit:components/basic/youtube": Youtube,
        "standard-template-kit:components/basic/video": Video
    }
};

export default config;
