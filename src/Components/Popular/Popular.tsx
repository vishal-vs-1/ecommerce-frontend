import React, { useEffect, useState } from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item.tsx'
import { ProductResponse } from '../../interfaces/ProductResponse.ts'
import axios from 'axios'

const Popular = () => {
  
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse[]>('http://localhost:8080/products/popular');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.map((item) => (
          <Item 
            key={item.productId}
            id={item.productId}
            name={item.productName}
            image={item.imageUrl}
            new_price={item.cost * (1 - item.discount / 100)}
            old_price={item.cost}
          />
        ))}
      </div>
    </div>
  )
}

export default Popular
