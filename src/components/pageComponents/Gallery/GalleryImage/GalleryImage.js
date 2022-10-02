/* eslint-disable max-len */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import './GalleryImage.css';

export const GalleryImage = ({productThumbnail, productCode, context}) => {
  const navigate = useNavigate();

  const mouseInHover = (element) => {
    const viewerElement = element.target.previousSibling;
    viewerElement.style.visibility="visible";
  };

  const mouseOutHover = (element) => {
    const viewerElement = element.target.previousSibling;
    viewerElement.style.visibility="hidden";
  };

  return (
    <div
      className='gallery--element--body roll-out'
      onClick={() => navigate(`/${context}?productID=${productCode}`)}
    >
      <img className="gallery--element--viewer viewer-hidden" src="/imageIcons/viewer.svg" alt="Viewer icon" />
      <img className="gallery--element--image"
        src={productThumbnail}
        alt="Gallery element"
        onMouseEnter={mouseInHover}
        onMouseLeave={mouseOutHover}
      />
      <h2>{productCode}</h2>
    </div>
  );
};

GalleryImage.propTypes = {
  productThumbnail: PropTypes.string.isRequired,
  productCode: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
};
