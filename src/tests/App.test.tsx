import { render } from '../setupTests';
import App from '../App';

// Smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
