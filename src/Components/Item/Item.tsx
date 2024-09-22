import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';


interface ItemProps {
  id: number;
  name: string;
  image: string;
  new_price: number;
  old_price: number;
}

const Item: React.FC<ItemProps> = (props) => {

  

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={ require('../Assets/' + props.image)} alt="error" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price.toFixed(2)}
        </div>
        <div className="item-price-old">
          ${props.old_price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default Item;
