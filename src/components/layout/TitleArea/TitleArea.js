
import React from 'react';
import {PropTypes} from 'prop-types';
import './TitleArea.css';

export const TitleArea = ({title}) => {
  return (
    <div className="archive-header page-header">
      <div className="container">
        <h1 className="title-area-page-title">
          {title}
        </h1>
      </div>
    </div>
  );
};

TitleArea.propTypes = {
  title: PropTypes.string.isRequired,
};
