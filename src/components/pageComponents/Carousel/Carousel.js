/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PropTypes} from 'prop-types';
import './Carousel.css';

export const Carousel = ({data}) => {
  const [slideIndex, setSlideIndex] = useState(2);

  const imagesArray = data.images;
  const changeTimer = data.options.roundTime;

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length || n < 1) {
      setSlideIndex(() => 1);
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" carousel-active", "");
    }
    let slidesDotsSlideIndex = slideIndex-1;
    if (n===0) {
      slidesDotsSlideIndex = 0;
    }
    slides[slidesDotsSlideIndex].style.display = "block";
    dots[slidesDotsSlideIndex].className += " carousel-active";
  };

  const previousImage = () => {
    let index = parseInt(slideIndex)-1;
    if (index < 1) {
      index=3;
    }
    setSlideIndex(() => index);
  };

  const nextImage = () => {
    let index = parseInt(slideIndex)+1;
    if (index > 3) {
      index=1;
    }
    setSlideIndex(() => index);
  };

  useEffect(() => {
    showSlides(slideIndex);

    const reference = setTimeout(() => {
      let nextN = parseInt(slideIndex) + 1;
      if (nextN>3) {
        nextN = 1;
      }
      setSlideIndex(() => nextN);
    }, changeTimer*1000);

    return () => {
      clearTimeout(reference);
    };
  }, [slideIndex]);

  const showControlsIn = () => {
    const getArrowsElements = document
        .getElementsByClassName("carousel-container-controller-arrows");
    const getDotElements = document
        .getElementsByClassName("carousel-container-controller");

    for (const element of getArrowsElements) {
      const className = element.className;
      const newClass = `${className} carousel-container-controller_show`;
      element.className = newClass;
    }

    for (const element of getDotElements) {
      const className = element.className;
      const newClass = `${className} carousel-container-controller_show`;
      element.className = newClass;
    }
  };

  const showControlsOut = () => {
    const getElements = document
        .getElementsByClassName("carousel-container-controller-arrows");
    const getDotElements = document
        .getElementsByClassName("carousel-container-controller");

    for (const element of getElements) {
      const className = element.className;
      const newClass = className.split(" ")[0];
      element.className = newClass;
    }

    for (const element of getDotElements) {
      const className = element.className;
      const newClass = className.split(" ")[0];
      element.className = newClass;
    }
  };

  const imageElement = imagesArray.map((element) => {
    return (
      <div
        className="mySlides fade"
        key={element.id}
        onMouseEnter={showControlsIn}
        onMouseLeave={showControlsOut}
      >
        <img src={element.href} alt={`img_${element.id}`} />
        <div className="carousel-container-controller-arrows">
          <a
            className="carousel-container-controler"
            onClick={previousImage}
            href="#"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
          <a
            // eslint-disable-next-line max-len
            className="carousel-container-controler carousel-container-controler-next"
            onClick={nextImage}
            href="#"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </div>
      </div>

    );
  });

  const dotElement = imagesArray.map((element) => {
    return (
      <span
        key={element.id}
        className="dot"
        onMouseEnter={showControlsIn}
        onMouseLeave={showControlsOut}
        onClick={() => setSlideIndex(() => element.id)}>
      </span>
    );
  });

  return (
    <div className="carousel-container">
      {imageElement}
      <div className="carousel-container-controller">
        {dotElement}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.object.isRequired,
};
