import React from "react";
import {PropTypes} from 'prop-types';

export const TabContent = ({id, activeTab, children, customClass}) => {
  return (
   activeTab === id ? <div className={`TabContent ${customClass}`}>
     { children }
   </div> :
   null
  );
};

TabContent.propTypes = {
  id: PropTypes.integer,
  children: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  customClass: PropTypes.string.isRequired,
};
