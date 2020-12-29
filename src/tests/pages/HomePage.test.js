import { render } from "../../setupTests";
import HomePage from "../../pages/HomePage";

it("renders without crashing", () => {
  render(<HomePage />);
  // expect(screen.getByText('Learn React')).toBeInTheDocument();
});
