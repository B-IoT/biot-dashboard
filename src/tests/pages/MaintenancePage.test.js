import { render } from "../../setupTests";
import MaintenancePage from "../../pages/MaintenancePage";

it("renders without crashing", () => {
  render(<MaintenancePage />);
  // expect(screen.getByText('Learn React')).toBeInTheDocument();
});
