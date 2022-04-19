import * as React from "react";
import Tree from '../../components/Tree/Tree';
import Catalog from '../../components/Catalog/Catalog';
import dataTree from '../../utils/static/tree.static.json';
import catalogItems from '../../utils/static/catalog.static.json';
import './TreeExample.styles.css';

const TreeExample = () => {
    return ( 
        <div className="float-container">      
            <h1>React Tree Example</h1>  
            <div className="float-child tree">                
                <Tree heading="Tree" tree={dataTree}/>
            </div>            
            <div className="float-child catalog">                
                <Catalog heading="Draggable Catalog Items" items={catalogItems}/>
            </div>
        </div>
    );
};

export default TreeExample;