import { React } from 'react';

var Card = function Card(_ref) {
  var imageRef = _ref.imageRef,
      title = _ref.title,
      description = _ref.description,
      func = _ref.func;
  return /*#__PURE__*/React.createElement(Card, {
    imageRef: imageRef,
    title: title,
    description: description,
    func: func
  });
};
var Carousel = function Carousel(_ref2) {
  var carouselData = _ref2.carouselData;
  return /*#__PURE__*/React.createElement(Carousel, {
    carouselData: carouselData
  });
};
var FieldSet = function FieldSet(_ref3) {
  var title = _ref3.title,
      value = _ref3.value,
      customClass = _ref3.customClass;
  return /*#__PURE__*/React.createElement(FieldSet, {
    title: title,
    value: value,
    customClass: customClass
  });
};
var Gallery = function Gallery(_ref4) {
  var initTotalOfElements = _ref4.initTotalOfElements,
      context = _ref4.context,
      productType = _ref4.productType,
      initNElements = _ref4.initNElements,
      requestUrl = _ref4.requestUrl;
  return /*#__PURE__*/React.createElement(Gallery, {
    initTotalOfElements: initTotalOfElements,
    context: context,
    productType: productType,
    initNElements: initNElements,
    requestUrl: requestUrl
  });
};
var ImageSlideShow = function ImageSlideShow(_ref5) {
  var gallery = _ref5.gallery;
  return /*#__PURE__*/React.createElement(ImageSlideShow, {
    gallery: gallery
  });
};
var MapGoogle = function MapGoogle(_ref6) {
  return /*#__PURE__*/React.createElement(MapGoogle, {
    data: gallery,
    apiKey: gallery
  });
};
var ProductViewer = function ProductViewer(_ref7) {
  var parentCallback = _ref7.parentCallback;
  return /*#__PURE__*/React.createElement(ProductViewer, {
    parentCallback: parentCallback
  });
};
var Tabs = function Tabs(_ref8) {
  var extraInformation = _ref8.extraInformation;
  return /*#__PURE__*/React.createElement(Tabs, {
    extraInformation: extraInformation
  });
};
var Footer = function Footer(_ref9) {
  var data = _ref9.data;
  return /*#__PURE__*/React.createElement(Tabs, {
    data: data
  });
};
var Navbar = function Navbar(_ref10) {
  var navBarData = _ref10.navBarData,
      title = _ref10.title;
  return /*#__PURE__*/React.createElement(Navbar, {
    navBarData: navBarData,
    title: title
  });
};
var TitleArea = function TitleArea(_ref11) {
  var title = _ref11.title;
  return /*#__PURE__*/React.createElement(Navbar, {
    title: title
  });
};

export { Card, Carousel, FieldSet, Footer, Gallery, ImageSlideShow, MapGoogle, Navbar, ProductViewer, Tabs, TitleArea };
//# sourceMappingURL=index.modern.js.map
