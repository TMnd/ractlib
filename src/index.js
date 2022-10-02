import {React} from 'react';
import styles from './styles.module.css';

// eslint-disable-next-line react/prop-types
export const ExampleComponent = ({text}) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};

// https://www.bornfight.com/blog/create-and-publish-your-own-react-library/
