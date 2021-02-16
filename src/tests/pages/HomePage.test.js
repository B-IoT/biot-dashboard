import { render } from '../../setupTests';
import SearchPage from '../../pages/SearchPage';

it('renders without crashing', () => {
  render(<SearchPage />);
  // expect(screen.getByText('Learn React')).toBeInTheDocument();
});
