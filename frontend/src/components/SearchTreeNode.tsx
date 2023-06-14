// dependencies
import { useState } from "react";
import axios from "axios";
// bootstrap components
import { Form, Button } from "react-bootstrap";

const SearchTreeNode = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const validateValue = (value: number | undefined) => {
    if (value === undefined) {
      return "Input is required!";
    }
    if (typeof value !== "number") {
      return "Please enter a valid number!";
    }
    if (value > 1000 || value < -1000) {
      return "Number must be within the range of -1000 to 1000!";
    }
    return undefined;
  };

  const formSubmit = async (e: React.FormEvent) => {
    try {
      // prevent form screen refresh
      e.preventDefault();

      // validate input
      const errorMessage: string | undefined = validateValue(value);
      if (errorMessage) {
        return setError(errorMessage);
      } else {
        // process data
        const response = await axios.post("http://localhost:5000/bst/search", {
          data: value,
        });
        //console.log(response);
        if (response.status === 200) {
          alert(response.data);
        }

        // reset value and error
        setValue(undefined);
        setError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="my-5">
      <Form.Group className="d-flex flex-column align-items-center">
        <Form.Label
          className="m-0 fw-bold text-center"
          htmlFor="searchTreeNodeValue"
        >
          Search TreeNode:
        </Form.Label>
        <Form.Text className="pt-1 pb-2 m-0 text-danger">{error}</Form.Text>
        <Form.Control
          id="searchTreeNodeValue"
          type="number"
          style={{ width: "80%" }}
          value={value || ""}
          onChange={(e) => {
            if (e.target.value === "") {
              setValue(undefined);
            } else if (typeof parseInt(e.target.value) === "number") {
              setValue(parseInt(e.target.value));
            }
          }}
        />
        <Button
          type="submit"
          variant="dark"
          className="mt-2 border-2 border-primary"
          onClick={formSubmit}
        >
          Search
        </Button>
      </Form.Group>
    </Form>
  );
};
export default SearchTreeNode;
