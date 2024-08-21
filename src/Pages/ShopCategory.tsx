import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ShopCategory.css';
import Item from '../Components/Item/Item.tsx';
import { ProductResponse } from '../interfaces/ProductResponse';

interface ShopCategoryProps {
  category: string;
  banner: string;
}

const ShopCategory: React.FC<ShopCategoryProps> = (props) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse[]>('http://localhost:8080/products', {
          params: { category: props.category },
        });
        console.log(JSON.stringify(response.data))
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [props.category]);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{products.length}</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src='/path-to-your-assets/dropdown_icon.png' alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
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
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
