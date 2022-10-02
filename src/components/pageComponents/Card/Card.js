import React from 'react';
import {PropTypes} from 'prop-types';
import './Card.css';

export const Card = ({imageRef, title, description, func}) => {
  const imageRefPath = `${process.env.PUBLIC_URL}/imageIcons/${imageRef}`;

  return (
    <div
      className={func ? "card" : "card--noHover"}
      onClick={func}
    >
      {imageRef ?
        <img className="card--image" src={imageRefPath} alt="Card Icon" /> :
        ""}

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

Card.propTypes = {
  imageRef: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  func: PropTypes.func,
};
