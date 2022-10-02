import React from 'react';
import {PropTypes} from 'prop-types';
import './Footer.css';

export const Footer = ({data}) => {
  const currentYear = new Date().getFullYear();

  const mailTo = `mailto:joaoamaral1989@gmail.com`;

  return (
    <footer className='footer-body'>
      <div>&copy; {currentYear} {data.title}</div>
      <div><a href={mailTo}>João Luis Amaral</a></div>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.object.isRequired,
};
