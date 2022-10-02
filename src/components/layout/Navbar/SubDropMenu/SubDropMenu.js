import React from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import './SubDropMenu.css';

export const SubDropMenu = ({data, toogleFunction}) => {
  if (typeof data !== 'undefined') {
    const subMenu = data.subMenu.map((element) => {
      return <Link
        key={element.name}
        className="navbar-link"
        to={element.href}
        onClick={toogleFunction}
      >
        {element.name}
      </Link>;
    });

    return (
      <div
        className={data.isClicked ? "navbar-sub-menu-show" : "navbar-sub-menu"}
      >
        {subMenu}
      </div>
    );
  }

  return;
};

SubDropMenu.propTypes = {
  data: PropTypes.object.isRequired,
  toogleFunction: PropTypes.function,
};
