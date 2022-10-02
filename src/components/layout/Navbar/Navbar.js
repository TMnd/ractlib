import React from 'react';
import SubDropMenu from './SubDropMenu/SubDropMenu';
import {useNavigate} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import './Navbar.css';

export const Navbar = ({navBarData, title}) => {
  const navigate = useNavigate();
  const [navBarToggle, setNavBarToggle] = React.useState(false);
  const [subDropMenuToggle, setSubDropMenuToggle] = React.useState([]);
  const [subMenu] = React.useState(navBarData);

  React.useEffect(() => {
    /**
     * Check if windows width is small to trigger mobile configs
     *
     * @author: moi
     * @param {null} null returs nothing.
     */
    function watchWidth() {
      const isSmallDisplay = (window.innerWidth<=768);
      if (!isSmallDisplay && navBarToggle) {
        resetSubDropDownMenuSate();
        mobileResmoveSelectedOption();
        setNavBarToggle(() => false);
      };
    };

    window.addEventListener("resize", watchWidth);

    return () => {
      window.removeEventListener("resize", watchWidth);
    };
  }, [navBarToggle]);

  React.useEffect(() => {
    for (const [index, element] of subMenu.entries()) {
      if (element.subMenu) {
        setSubDropMenuToggle(() => {
          return [
            {
              parentId: index,
              subMenu: element.subMenu,
              isClicked: false,
            },
          ];
        });
      }
    }
  }, []);

  /**
   * Reset the dropdown menu state
   *
   * @author: moi
   * @param {prevSubDropMenuToggleState} prevSubDropMenuToggleState
   * returns nothingthe new state
   */
  function resetSubDropDownMenuSate() {
    setSubDropMenuToggle((prevSubDropMenuToggleState) => {
      for (const menuElement of prevSubDropMenuToggleState) {
        menuElement.isClicked = false;
      }

      return [
        ...prevSubDropMenuToggleState,
      ];
    });
  };

  /**
   * Get sub menu based on the parent element menu.
   *
   * @author: moi
   * @param {number} id menu element id
   * @return {subDropMenuToggle} the sub menu under parent menu element.
   */
  function getSubMenuData(id) {
    for (let i=0; i<subDropMenuToggle.length; i++) {
      if (subDropMenuToggle[i].parentId === id) {
        return subDropMenuToggle[i];
      }
    }
  }

  const toogleNavBar = (() => {
    const isToggleActive = document.querySelector('#navbar-toggle');
    const getDisplayValue = getComputedStyle(isToggleActive).display;
    if (getDisplayValue !== "none") {
      setNavBarToggle((prevState) => !prevState);
    }
    resetSubDropDownMenuSate();
    mobileResmoveSelectedOption();
  });

  /**
   * Reset the dropdown menu state
   *
   * @author: moi
   * @param {number} id menu element id
   */
  function mobileResmoveSelectedOption() {
    const elements = document.getElementsByClassName("navbar-links-selected");

    if (elements.length > 0) {
      const getFirstClass = elements[0].className.split(" ")[0];
      elements[0].className = getFirstClass;
    }
  }

  /**
   * Show sub menu
   *
   * @author: moi
   * @param {number} domElement domelement
   */
  function subMenuToggle(domElement) {
    const isSelected = (domElement.target.className === "navbar-link");
    if (window.innerWidth<=768) {
      setSubDropMenuToggle((prevSubDropMenuToggleState) => {
        for (const menuElement of prevSubDropMenuToggleState) {
          if (menuElement.parentId === parseInt(domElement.target.id)) {
            menuElement.isClicked = isSelected;
          } else {
            menuElement.isClicked = false;
          }
        }

        return [
          ...prevSubDropMenuToggleState,
        ];
      });

      if (isSelected) {
        mobileResmoveSelectedOption(domElement);
        const currentClass = domElement.target.className;
        const splitCurrentClass = currentClass.split(" ");
        const isOpened = (splitCurrentClass.length === 1);
        if (isOpened) {
          const newClass = `${currentClass}  navbar-links-selected`;
          domElement.target.className = newClass;
          return;
        }

        domElement.target.className = splitCurrentClass[0];

        return;
      }

      domElement.target.className = "navbar-link";
    }
  }

  const menu = subMenu.map((element, index) => {
    return <span key={`menuParent-${index}`} className="navbar-item">
      <a
        onClick={element.subMenu ? subMenuToggle : navigate(`/${element.href}`)}
        id={index}
        className="navbar-link"
      >
        {element.name}
      </a>
      {element.subMenu &&
                        <SubDropMenu
                          data={getSubMenuData(index)}
                          toogleFunction={toogleNavBar}
                        />
      }
    </span>;
  });

  return (
    <header className="navbar navbar-fixed-top">
      <nav className="navbar-container container">
        <div className="navbar-title">
          <a href="/">{title}</a>
        </div>
        <button
          type="button"
          id="navbar-toggle"
          aria-controls="navbar-menu"
          aria-label="Toggle menu"
          aria-expanded={navBarToggle}
          onClick={toogleNavBar}
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div
          id="navbar-menu"
          className="navbar-links-container"
          aria-labelledby="navbar-toggle"
        >
          <div className="navbar-links">
            {menu}
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  navBarData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
