/* eslint-disable max-len */
import {React} from 'react';

// eslint-disable-next-line react/prop-types
export const Card = ({imageRef, title, description, func}) => {
  return (
    <Card
      imageRef={imageRef}
      title={title}
      description={description}
      func={func}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const Carousel = ({carouselData}) => {
  return (
    <Carousel
      carouselData={carouselData}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const FieldSet = ({title, value, customClass}) => {
  return (
    <FieldSet
      title={title}
      value={value}
      customClass={customClass}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const Gallery = ({initTotalOfElements, context, productType, initNElements, requestUrl}) => {
  return (
    <Gallery
      initTotalOfElements={initTotalOfElements}
      context={context}
      productType={productType}
      initNElements={initNElements}
      requestUrl={requestUrl}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const ImageSlideShow = ({gallery}) => {
  return (
    <ImageSlideShow
      gallery={gallery}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const MapGoogle = ({data, apiKey}) => {
  return (
    <MapGoogle
      data={gallery}
      apiKey={gallery}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const ProductViewer = ({parentCallback}) => {
  return (
    <ProductViewer
      parentCallback={parentCallback}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const Tabs = ({extraInformation}) => {
  return (
    <Tabs
      extraInformation={extraInformation}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const Footer = ({data}) => {
  return (
    <Tabs
      data={data}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const Navbar = ({navBarData, title}) => {
  return (
    <Navbar
      navBarData={navBarData}
      title={title}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const TitleArea = ({title}) => {
  return (
    <Navbar
      title={title}
    />
  );
};
