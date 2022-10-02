import React from "react";
import {PropTypes} from 'prop-types';

export const TabNavItem = ({id, title, activeTab, setActiveTab}) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li onClick={handleClick} className={activeTab === id ? "tabs-active" : ""}>
      { title }
    </li>
  );
};

TabNavItem.propTypes = {
  id: PropTypes.integer,
  title: PropTypes.string.isRequired,
  activeTab: PropTypes.integer,
  setActiveTab: PropTypes.function,
};

