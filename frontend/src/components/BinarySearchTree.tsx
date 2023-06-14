// dependencies
import { useState, useEffect } from "react";
import { Tree } from "react-d3-tree";

type BinarySearchTreeProps = {
  bst: Record<string, any>;
};

type TreeData = {
  name: string;
  children?: TreeData[];
};

const BinarySearchTree: React.FC<BinarySearchTreeProps> = ({ bst }) => {
  const [treeData, setTreeData] = useState<any[]>([]);

  const formatTreeData = (node: any): TreeData => {
    return {
      name: node.data.toString(),
      children: [
        node.left ? formatTreeData(node.left) : undefined,
        node.right ? formatTreeData(node.right) : undefined,
      ].filter(Boolean) as TreeData[],
    };
  };

  useEffect(() => {
    if (bst.root) {
      const formattedTreeData = formatTreeData(bst.root);
      setTreeData([formattedTreeData]);
    } else {
      setTreeData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bst]);

  return (
    <>
      {treeData.length > 0 ? (
        <div style={{ width: "50em", height: "20em" }}>
          <Tree data={treeData} orientation="vertical" />
        </div>
      ) : (
        <div className="my-5 text-center">
          <h1>The Binary Search Tree is currently empty.</h1>
        </div>
      )}
    </>
  );
};
export default BinarySearchTree;
