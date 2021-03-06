import React from 'react';
import { BinarySearchTree } from './utils/BinarySearchTree';

const bst = new BinarySearchTree();

function Tree(props) {
  const { data, removeNumber } = props;

  function renderTree(node) {
    return Object.entries(node).map(function ([key, value]) {
      if (key === 'left' && typeof value === 'object') {
        if (value !== null) {
          return (
            <li key={value.data}>
              <Tree data={value} removeNumber={removeNumber} />
            </li>
          );
        }
        if (value === null) {
          return null;
        }
      } else if (key === 'right' && typeof value === 'object') {
        if (value !== null) {
          return (
            <li key={value.data}>
              <Tree data={value} removeNumber={removeNumber} />
            </li>
          );
        }
        if (value === null) {
          return null;
        }
      }
    });
  }

  return data ? (
    <>
      <span className="tf-nc" onClick={() => {
        removeNumber(data.data)
      }}>{data.data}</span>
      <ul>{renderTree(data)}</ul>
    </>
  ) : (
    'EMPTY'
  );
}

function App() {
  const [number, setNumber] = React.useState(50);
  const [root, setRoot] = React.useState(null);

  React.useEffect(() => {
    bst.add(50);
    bst.add(45);
    bst.add(55);
    bst.add(53);
    bst.add(54);
    bst.add(51);
    bst.add(40);
    bst.add(48);
    bst.add(60);
    bst.add(30);
    bst.add(80);
    bst.add(10);
    bst.add(42);
    bst.add(32);
    bst.add(58);
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }, []);

  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }

  function addNumber(e) {
    e.preventDefault();
    bst.add(number);
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }

  const removeNumber = (val) => {
    // e.preventDefault();
    bst.remove(val);
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }
  function getRandomInt(){
    return Math.floor(Math.random(-1,1)*200-100);
}


  function findMax() {
    alert(`Max value is ${bst.findMax()}`);
  }

  function findMin() {
    alert(`Mim value is ${bst.findMin()}`);
  }
  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      var rndint=getRandomInt();
      bst.add(rndint);
      setRoot((prev) => ({ ...prev, ...bst.root }));
    }
  }
  return (
    <div className="container">
      <h1>Binary Search Tree Visualization</h1>
      {/* <form onSubmit={addNumber} className="form-control">
        <input type="number" min="1" name="add" onChange={changeNumber} required />
        <button type="submit" className="input-button">
          Add
        </button>
        <button type="button" onClick={findMax} className="find-max-button">
          Find Max
        </button>
      </form>
      <form onSubmit={removeNumber} className="form-control">
        <input type="number" min="1" name="remove" onChange={changeNumber} required />
        <button type="submit" className="input-button">
          Remove
        </button>
        <button type="button" onClick={findMin} className="find-min-button">
          Find Min
        </button>
      </form> */}
      <div className="tf-tree tf-custom">
        <ul>
          <li>
            <Tree 
              data={root} 
              parent={bst.root} 
              removeNumber={removeNumber}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
