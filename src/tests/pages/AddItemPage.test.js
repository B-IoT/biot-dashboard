import React from "react";
import { render } from "../../setupTests";
import AddItemPage from "../../pages/AddItemPage";

it("renders without crashing", () => {
  render(<AddItemPage />);
  // expect(screen.getByText('Learn React')).toBeInTheDocument();
});
