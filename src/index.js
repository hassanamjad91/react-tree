import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import TreeExample from './views/TreeExample/TreeExample';
import './style/base.style.css';

class App extends React.Component {
  render() {
    return (
      <StrictMode>
          <div className="app">        
          <TreeExample />
        </div>
      </StrictMode>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));