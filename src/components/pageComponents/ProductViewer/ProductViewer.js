/* eslint-disable max-len */
import {React, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {useSearchParams, Link} from "react-router-dom";
import ImageSlideShow from '../ImageSlideShow/ImageSlideShow';
import {PropTypes} from 'prop-types';
import './productViewer.css';
import Tabs from '../Tabs/Tabs';
import GalleryImage from '../Gallery/GalleryImage/GalleryImage';

export const ProductViewer = ({parentCallback}) => {
  const [searchParams] = useSearchParams();
  const [productGallery, setProductGallery] = useState();
  // const [relatedProducts, setRelatedProducts] = useState();
  const [isPageReady, setPageStatus] = useState(false);
  const productID = searchParams.get('productID');

  // Apesar de poder usar o useState, este caso será tudo
  // "calculado" antes do render.
  // por isso para variar eu vou usar o useRef.
  const productDetails = useRef();
  const relatedProduct = useRef();
  let details;
  let specifications;
  let avaiableOptions;
  let extraInformation;
  let relatedProduts;

  const getInitialData = (cancelToken) => {
    const requestUrl = `http://localhost:4000/api/v0/getDoor?productID=${productID}`;
    axios.get(requestUrl,
        {cancelToken: cancelToken.token})
        .then((response) => {
          const data = response.data;
          setProductGallery(data.gallery);
          setPageStatus(true);
          // setRelatedProducts(data.relatedProduct);

          productDetails.current=data.productDetails;
          relatedProduct.current=data.relatedProduct;

          updateProductTitle(`${productID}`);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const updateProductTitle = (newTitle) => {
    parentCallback(newTitle);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    getInitialData(cancelToken);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  if (isPageReady &&
        (productDetails !== undefined ||
            productDetails !== undefined )) {
    details = (productDetails.current).details.map((element, index) => {
      return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <li key={index}>{element}</li>
      );
    });

    specifications = (productDetails.current).specifications;

    avaiableOptions = (productDetails.current)
        .avaiableOptions.map((element, index) => {
          return (
            <li key={index}>{element}</li>
          );
        });

    extraInformation = (productDetails.current).extraInformation;

    specifications = (productDetails.current).specifications;

    console.log(relatedProduct.current);

    relatedProduts = (relatedProduct.current).map((element, index) => {
      return <GalleryImage
        key={element.productCode}
        productCode={element.productCode}
        productThumbnail={element.productThumbnail}
        context={"porta"}
      />;
    });
  }

  return (
    <section className="container">
      {isPageReady &&
                <div className='product--viewer--section'>
                  <div id="subGallery">
                    <ImageSlideShow
                      gallery={productGallery}
                    />
                  </div>
                  <div id="productInformation" className='productInformation'>
                    <div>
                      <b>Categoria: </b>
                      <Link
                        to="/portas?type=Lisas"
                        className='product--viewer--section--category--link'
                      >
                            Portas Lisas
                      </Link>
                    </div>
                    <div>
                      <h3>Detalhes</h3>
                      <ul>{details}</ul>
                    </div>
                    <div>
                      <h3>Especificações</h3>
                      {specifications.isDoorLookCompatible ?
                                <div className='product--viewer--section--specification'>
                                  <img className="product--viewer--section--specification-icon"
                                    src={`${process.env.PUBLIC_URL}/imageIcons/doorLock_ok.svg`}
                                    alt="Service Icon"></img>
                                  <span>Abertura de caixa para fechadura</span>
                                </div> :
                                <img className="product--viewer--section--specification-icon"
                                  src={`${process.env.PUBLIC_URL}/imageIcons/doorLock_nok.svg`}
                                  alt="Service Icon"></img>
                      }
                      {specifications.size &&
                                <div className='product--viewer--section--specification'>
                                  <img className="product--viewer--section--specification-icon"
                                    src={`${process.env.PUBLIC_URL}/imageIcons/ruller.svg`}
                                    alt="Service Icon"></img>
                                  <span>{`(H)${specifications.size.heigth}x(W)${specifications.size.width}x(D)${specifications.size.depth}`}</span>
                                </div>
                      }

                    </div>
                    <div>
                      <h3>Opções</h3>
                      <ul>{avaiableOptions}</ul>
                    </div>
                  </div>
                  <div id="productExtaInformation">
                    <Tabs
                      extraInformation={extraInformation}
                    />
                  </div>
                  <div id="anotherProducts">
                    <h3>Produtos Relacionados</h3>
                    <div>
                      {relatedProduts}
                    </div>
                  </div>
                </div>
      }
    </section>
  );
};

ProductViewer.propTypes = {
  parentCallback: PropTypes.function,
};
