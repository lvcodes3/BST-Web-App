// dependencies
import { useState, useEffect } from "react";
import axios from "axios";
// components
import Header from "./components/Header";
import InsertTreeNode from "./components/InsertTreeNode";
import DeleteTreeNode from "./components/DeleteTreeNode";
import SearchTreeNode from "./components/SearchTreeNode";
import BinarySearchTree from "./components/BinarySearchTree";

function App() {
  const [bst, setBST] = useState<any>({});

  useEffect(() => {
    const getBST = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bst");
        //console.log(response);
        if (response.status === 200) {
          setBST(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBST();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="d-flex">
        <div className="col-3 border d-flex flex-column">
          <InsertTreeNode setBST={setBST} />
          <DeleteTreeNode setBST={setBST} />
          <SearchTreeNode />
        </div>
        <div className="col-9 border">
          <BinarySearchTree bst={bst} />
        </div>
      </div>
    </div>
  );
}

export default App;
