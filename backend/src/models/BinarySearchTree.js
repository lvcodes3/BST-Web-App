const TreeNode = require("./TreeNode");

class BinarySearchTree {
  root;
  size;

  constructor(data) {
    if (data !== undefined && data !== null) {
      this.root = new TreeNode(data);
      this.size = 1;
    } else {
      this.root = null;
      this.size = 0;
    }
  }

  insert(data) {
    let newNode = new TreeNode(data);
    let currentNode = this.root;

    if (currentNode === null) {
      this.root = newNode;
      this.size++;
      return;
    }

    while (true) {
      // no duplicate values allowed
      if (newNode.data === currentNode.data) {
        return;
      }

      //
      if (newNode.data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          this.size++;
          return;
        }
        currentNode = currentNode.left;
      }
      //
      else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          this.size++;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(data) {
    let currentNode = this.root;
    let parentNode = null;
    let isLeftChild = false;

    while (currentNode !== null) {
      // break out of the loop when finding specific node to delete
      if (data === currentNode.data) {
        break;
      }

      parentNode = currentNode;

      if (data < currentNode.data) {
        currentNode = currentNode.left;
        isLeftChild = true;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
        isLeftChild = false;
      }
    }

    if (currentNode === null) {
      return "failure";
    }

    // CASE 1: currentNode has no children
    if (currentNode.left === null && currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    // CASE 2: if currentNode has one child
    else if (currentNode.left === null) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else if (isLeftChild) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    } else if (currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else if (isLeftChild) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    }
    // CASE 3: currentNode has two children
    else {
      let minNode = currentNode.right;
      let minNodeParent = currentNode;

      while (minNode.left !== null) {
        minNodeParent = minNode;
        minNode = minNode.left;
      }

      currentNode.data = minNode.data;

      if (minNode === minNodeParent.left) {
        minNodeParent.left = minNode.right;
      } else {
        minNodeParent.right = minNode.right;
      }
    }
    this.size--;
    return "success";
  }

  // iterative search solution
  iterativeSearch(data) {
    // start at the root
    let currentNode = this.root;

    if (currentNode === null) {
      return `${data} is not in the Binary Search Tree.`;
    }

    // loop until the tn is found or there are no more tns to check
    while (true) {
      // if the current tn has the data we are looking for, return it
      if (data === currentNode.data) {
        return `${data} is in the Binary Search Tree.`;
      }

      // if the data we are looking for is less than the current tn's data,
      // move to the left child (if it exists) and continue the search
      if (data < currentNode.data) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          return `${data} is not in the Binary Search Tree.`;
        }
      }
      // if the data we are looking for is greater than the current tn's data,
      // move to the right child (if it exists) and continue the search
      else if (data > currentNode.data) {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          return `${data} is not in the Binary Search Tree.`;
        }
      }
    }
  }

  /*
  // recursive search solution
  recursiveSearch(currentNode: TreeNode | null, data: number) {
    if (currentNode === null || currentNode.data === data) {
      console.log(currentNode);
      return;
    }

    // first
    if (data < currentNode.data) {
      return this.recursiveSearch(currentNode.left, data);
    }
    // second
    else if (data > currentNode.data) {
      return this.recursiveSearch(currentNode.right, data);
    }
  }
  */
}

module.exports = BinarySearchTree;
