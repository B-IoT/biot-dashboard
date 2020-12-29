import renderer from "react-test-renderer";
import CustomCard from "../../components/CustomCard";

it("renders without crashing with custom props", () => {
  const props = {
    className: test,
    style: { color: "#ffff" },
    children: 1,
  };
  const rendered = renderer.create(<CustomCard props={props} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
