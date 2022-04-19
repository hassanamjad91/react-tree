import nodeTemplate from '../../utils/static/node.static.json';

const getNodeMetaData = (tree, nodePath) => {    
    /**
     * Path contains the full location of the node.
     * Path of a root node is always 'undefined' because its static.
     * Depth of a root node is always '0' because its static.
     * If the 'parentNodePath' property is 'undefined', it means..
     * 'root' node is the immediate parent.
     */
    if(nodePath !== undefined) {                    
        const nodePathSplit = nodePath.split('.');
        const nodeIndex = parseInt(nodePathSplit[nodePathSplit.length - 1]);
        const nodeDepth = nodePathSplit.length;
        nodePathSplit.pop();
        const parentNodePath = nodeDepth === 1 ? undefined : nodePathSplit.join('.');
        return { 
            nodeDepth: nodeDepth, 
            nodeIndex: nodeIndex,
            parentNodePath: parentNodePath
        };
    } 
    else {
        return {             
            nodeDepth: 0,
            parentNodePath: undefined       
        };
    }    
};

const findNode = (node, nodePath, curPath, callback) => {    
    let nodeFound = false;
    if(curPath === nodePath) { 
        nodeFound = true;
        callback(node);
    }
    else if(node.children) {            
        node.children.forEach((n, i) => { 
            if(!nodeFound) {
                const nextPath = curPath === undefined ? i.toString() : [curPath, i].join('.');  
                findNode(n, nodePath, nextPath, callback);
            }
        });
    }
};

const toggleNode = (tree, nodePath, isCollapsed, updateTree) => {  
    const toggle = (node) => {
        node.collapsed = !isCollapsed;
        updateTree({...tree});
    };
    findNode(tree, nodePath, undefined, toggle);
};

const shiftNode = (tree, nodePath, shiftUp, updateTree) => {
    const { nodeIndex, parentNodePath } = getNodeMetaData(tree, nodePath);
    
    if(nodeIndex === 0 && shiftUp) {
        return;
    }
    else {
        const swapIndex = shiftUp ? nodeIndex - 1 : nodeIndex + 1;        
        const swapNodes = (parentNode) => {
            if(parentNode.children[swapIndex] !== undefined) {
                const srcNode = {...parentNode.children[nodeIndex]};
                const targetNode = {...parentNode.children[swapIndex]}
                if(srcNode && targetNode) {
                    parentNode.children[swapIndex] = {...srcNode};
                    parentNode.children[nodeIndex] = {...targetNode};
                    updateTree({...tree});
                }
            }           
        };
        findNode(tree, parentNodePath, undefined, swapNodes);
    }
};

const addNode = (tree, nodePath, addChild, newNodeLabel, node, updateTree) => {        
    const { parentNodePath, nodeIndex } = getNodeMetaData(tree, nodePath);    
    const newNode = {...nodeTemplate, label: newNodeLabel};     

    if(addChild) {
        if(!node.children || !node.children.length) {            
            node.children = [{...newNode}];
        }
        else {
            node.children.unshift({...newNode});            
        }
        updateTree({...tree});
    }
    else {
        const add = (targetNode) => {                   
            targetNode.children.splice(nodeIndex, 0, {...newNode});
            updateTree({...tree});
        };        
        findNode(tree, parentNodePath, undefined, add);
    }
};

const deleteNode = (tree, nodePath, updateTree) => {
    const { parentNodePath, nodeIndex } = getNodeMetaData(tree, nodePath);
    
    if(tree.children.length > 1)
    {
        const del = (parentNode) => {
            parentNode.children.splice(nodeIndex, 1);
            updateTree({...tree});
        };
        findNode(tree, parentNodePath, undefined, del);
    }        
};

const onDrop = (e, tree, nodePath, isAddChild, itemType, node, updateTree) => {
    e.preventDefault();
    e.stopPropagation();
    debugger;
    const item = JSON.parse(e.dataTransfer.getData(itemType));       
    addNode(tree, nodePath, isAddChild, item.label, node, updateTree);
};

const onDragOver = (e) => {
    e.preventDefault();        
};

export { deleteNode, addNode, shiftNode, toggleNode, onDrop, onDragOver };