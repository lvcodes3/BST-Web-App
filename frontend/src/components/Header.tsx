// react-icons
import { FaTree } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-dark">
      <div className="container d-flex align-items-center p-3">
        <FaTree className="text-light fs-3 me-2" />
        <h1 className="text-light fs-3 m-0">Binary Search Tree Web App</h1>
      </div>
    </header>
  );
};
export default Header;
