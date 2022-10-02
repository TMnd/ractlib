import React from 'react';
import {PropTypes} from 'prop-types';
import './ImageSlideShow.css';

export const ImageSlideShow = ({gallery}) => {
  const [productMainThumbnail, setProductMainThumbnail] = React.useState("");
  const [
    productViewListThumbnails,
    setProductViewListThumbnails,
  ] = React.useState([]);

  let data ="";
  let viewList = [];

  React.useEffect(() => {
    if (typeof gallery !== 'undefined') {
      data = gallery.mainThumbnail;
      setProductMainThumbnail(data);

      let productListViews = [];
      productListViews.push(data);
      productListViews = productListViews.concat(gallery.altThumbnails);
      setProductViewListThumbnails(productListViews);
    }
  }, [gallery]);

  const chooseImage = (selectedImage) => {
    const newMainThumbnailURL = selectedImage.target.src;
    setProductMainThumbnail(newMainThumbnailURL);
  };

  if (productViewListThumbnails.length > 0) {
    viewList = productViewListThumbnails.map((element, index) => {
      return <div
        key={index}
        onClick={chooseImage}
      >
        <img src={element} alt={`Main image-${index}`} />
      </div>;
    });
  };

  return (
    <section className="image--slideshow--section">
      <div id="mainThumbnail">
        <img src={productMainThumbnail} alt={"Main image"} />
      </div>
      {productViewListThumbnails.length > 1 &&
                <div className='image--slideshow--section--view--list'>
                  {viewList}
                </div>
      }
    </section>
  );
};

ImageSlideShow.propTypes = {
  gallery: PropTypes.object.isRequired,
};
