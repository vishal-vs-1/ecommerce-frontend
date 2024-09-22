import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item.tsx'
import { ProductResponse } from '../../interfaces/ProductResponse.ts'
import axios from 'axios'

const NewCollections = () => {

  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse[]>('http://localhost:8080/products/nc');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
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

export default NewCollections
