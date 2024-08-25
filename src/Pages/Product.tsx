import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum.jsx';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.tsx';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts.tsx';
import { ProductResponse } from '../interfaces/ProductResponse.ts';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductResponse | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox description={product.description}/>
      <RelatedProducts />
    </div>
  );
}

export default Product;