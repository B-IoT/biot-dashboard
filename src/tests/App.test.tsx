import ReactDOM from 'react-dom';
import App from '../App';

// Smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
