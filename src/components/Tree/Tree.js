import React, { useState } from "react";
import itemTypes from '../../utils/constants/itemTypes.constant';
import { addNode, deleteNode, shiftNode, toggleNode, onDrop, onDragOver } from './Tree.helpers';
import './Tree.styles.css';

const Tree = (props) => {
    const { heading, tree} = props;
    const [treeState, setTreeState] = useState({...tree});
    
    return (
        <div className="tree-component">
            <h2>{heading}</h2>
            <ul className="tree">
                <Node node={tree} tree={tree} path={undefined} updateTree={setTreeState} />
            </ul>
        </div>
    );
};

const Node = (props) => {
    const { node, path, tree, updateTree } = props;
    
    return ( 
        <li>
            {
                node.children && node.children.length > 0 && 
                <button 
                    type="button" 
                    className={node.collapsed ? "btn-collapsed" : "btn-contract"} 
                    title={node.collapsed ? "close" : "collapse"}
                    onClick={() => toggleNode(tree, path, node.collapsed, updateTree)}>
                    {node.collapsed ? '-' : '+'}
                </button>
            }
            <span className="label" title="Node label">{node.label}</span>            
            { 
                path !== undefined && 
                <>
                    <button className="btn-del" type="button" onClick={() => deleteNode(tree, path, updateTree)}>Delete</button>
                    <button className="btn-add" type="button" onClick={() => addNode(tree, path, false, 'New node', node, updateTree)}>+ Sibling</button>
                    <button className="btn-add" type="button" onClick={() => addNode(tree, path, true, 'New node',  node, updateTree)}>+ Child</button>
                    <button className="btn-up-down" type="button" onClick={() => shiftNode(tree, path, true, updateTree)}>⯅</button>
                    <button className="btn-up-down" type="button" onClick={() => shiftNode(tree, path, false, updateTree)}>⯆</button>

                    <span className="drop-target" onDrop={(e) => onDrop(e, tree, path, false, itemTypes.Catalog, node, updateTree)} onDragOver={onDragOver}>Drop sibling</span>
                    <span className="drop-target" onDrop={(e) => onDrop(e, tree, path, true, itemTypes.Catalog, node, updateTree)} onDragOver={onDragOver}>Drop child</span>
                </>               
            }                                    
            {
                node.children && node.children.length > 0 && node.collapsed &&
                <ul>
                    {
                        node.children.map((n, i) => { 
                            const nodePath = path === undefined ? i.toString() : [path, i].join('.');                         
                            return (
                                <Node key={nodePath} node={n} tree={tree} path={nodePath} updateTree={updateTree} /> 
                            );
                        })
                    }
                </ul>
            }
        </li>
    );
};

export default Tree;