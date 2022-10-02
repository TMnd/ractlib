import React from "react";
import {PropTypes} from 'prop-types';
import './fieldSet.css';

export const FieldSet = ({title, value, customClass}) => {
  return (
    <div className="FieldSet--body">
      <div className="FieldSet--title">
        <h3>{title}</h3>
      </div>
      <div className={`FieldSet--value ${customClass}`}>
        {value}
      </div>
    </div>
  );
};

FieldSet.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
