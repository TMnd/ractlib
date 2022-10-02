/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import axios from 'axios';
import './Gallery.css';
import {PropTypes} from 'prop-types';
import GalleryImage from './GalleryImage/GalleryImage';

export const Gallery = ({initTotalOfElements, context, productType, initNElements, requestUrl}) => {
  const [dataToShow, setDataToShow] = useState([]);
  const [dataCache, setDataCache] = useState([]);
  const [paginationOption, setPaginationOption] = useState(1);
  const [selectOptionValue, setSelectOptionValue] = useState(12);
  const [totalNElements, setTotalElements] = useState(initTotalOfElements);
  const [isPageReady, setPageReady] = useState(false);

  let doors = "";
  if (dataToShow !== undefined && dataToShow.length!==0) {
    doors = dataToShow.map((element) => {
      return <GalleryImage
        key={element.productCode}
        productCode={element.productCode}
        productThumbnail={element.productThumbnail}
        context={context}
      />;
    });
  }

  useEffect(() => {
    if (isPageReady) {
      const cancelToken = axios.CancelToken.source();
      getProducts(cancelToken);
      return () => {
        cancelToken.cancel();
      };
    }

    setPageReady(true);
  }, [productType]);

  useEffect(() => {
    setDataToShow([]);
    if (dataCache.length===0) {
      setDataCache(initNElements);
      setDataToShow(initNElements[paginationOption-1]);
      return () => { };
    }

    const cancelToken = axios.CancelToken.source();
    getProducts(cancelToken);
    return () => {
      cancelToken.cancel();
    };
  }, [selectOptionValue]);

  const getProducts = (cancelToken) => {
    axios.get(requestUrl,
        {
          params: {
            nElements: selectOptionValue,
          },
          cancelToken: cancelToken.token,
        },
    )
        .then((response) => {
          const data = response.data;
          setDataCache(data.nElements);
          setDataToShow(data.nElements[paginationOption-1]);
          setTotalElements(data.totalOfElements);
        })
        .catch((error) => {
          console.error(error);
          if (axios.isCancel(error)) {
            console.log("cancelled");
          } else {
            // todo: handle error
          }
        });
  };

  const selectPage = (element) => {
    const selectPage = element.target;
    const alreadySelectedPage = document.getElementsByClassName("selected")[0];
    alreadySelectedPage.className="";
    selectPage.className="selected";
    const newPage=selectPage.innerText;
    setPaginationOption(newPage);
    setDataToShow(dataCache[newPage-1]);
  };

  const selectChangeEvent = (option) => {
    const selectedValue = option.target.value;
    setSelectOptionValue(selectedValue);

    const alreadySelectedPage = document.getElementsByClassName("selected")[0];
    alreadySelectedPage.className="";

    const selectFirstPage = document.querySelectorAll(".gallery--body--pagination div")[0];
    selectFirstPage.className="selected";
    setPaginationOption(1);
  };

  const pagination = (totalElements, selectOptionValue) => {
    const elements = [];
    const nPages = totalElements/selectOptionValue;
    for (let i=0; i < nPages; i++) {
      elements.push(
          <div className={(i === 0) ? "selected" : ""}
            key={i}
            onClick={selectPage}
          >
            {i+1}
          </div>,
      );
    }
    return elements;
  };

  return (
    <div className='gallery--body'>
      <div className='gallery--body--controller'>
        <select id="selectDoorThreshold" onChange={selectChangeEvent}>
          <option defaultValue value="12">12</option>
          <option value="30">30</option>
          <option value="60">60</option>
          <option value="1000">Todos</option>
        </select>
      </div>
      <div id="gallery--body" className='gallery--body--gallery'>
        {doors}
      </div>
      <div className="gallery--body--pagination">
        {pagination(totalNElements, selectOptionValue)}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  initTotalOfElements: PropTypes.integer,
  context: PropTypes.string.isRequired,
  productType: PropTypes.string.isRequired,
  initNElements: PropTypes.integer,
  requestUrl: PropTypes.string.isRequired,
};
