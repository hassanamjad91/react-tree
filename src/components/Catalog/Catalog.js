import * as React from "react";
import './Catalog.styles.css';
import itemTypes from '../../utils/constants/itemTypes.constant';

const Catalog = (props) => {
    const {heading, items} = props;

    const onDragStart = (e, item) => {             
        e.dataTransfer.setData(itemTypes.Catalog, JSON.stringify(item));
    };

    return (
        <div className="catalog-container">
            <h2>{heading}</h2>
            <ul className="list">
                {
                    items.map((item, i) => (
                        <li 
                            key={item.label + i} 
                            draggable="true" 
                            data-item={{...item}}
                            onDragStart={(e) => onDragStart(e, item)}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Catalog;