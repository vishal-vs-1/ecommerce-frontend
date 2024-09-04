import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ShopCategory.css';
import Item from '../Components/Item/Item.tsx';
import { ProductResponse } from '../interfaces/ProductResponse';
import { useLocation } from 'react-router-dom';

interface DiscountedProductsProps {
  percent: number;
  category: string;
}

const DiscountedProducts: React.FC<DiscountedProductsProps> = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const location = useLocation();
  const { percent, category } = location.state || { percent: 0, category: '' };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const c:number = percent; 
        const response = await axios.get<ProductResponse[]>(`http://localhost:8080/products/discount/${c}`, {
          params: { category: category },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [percent, category]);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setShowSortOptions(false);
  };

  useEffect(() => {
    if (sortOrder === 'asc') {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.cost * (1 - a.discount / 100) - b.cost * (1 - b.discount / 100))
      );
    } else if (sortOrder === 'desc') {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => b.cost * (1 - b.discount / 100) - a.cost * (1 - a.discount / 100))
      );
    }
  }, [sortOrder]);

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{products.length}</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          <div onClick={() => setShowSortOptions(!showSortOptions)}>
            Sort by <img src='/path-to-your-assets/dropdown_icon.png' alt="" />
          </div>
          {showSortOptions && (
            <ul className="shopcategory-sort-options">
              <li onClick={() => handleSortChange('default')}>Default</li>
              <li onClick={() => handleSortChange('asc')}>Price: Low to High</li>
              <li onClick={() => handleSortChange('desc')}>Price: High to Low</li>
            </ul>
          )}
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

export default DiscountedProducts;
