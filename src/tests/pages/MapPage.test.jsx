import MapPage from '../../pages/MapPage/MapPage';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  render(<MapPage location={{ state: { itemName: 'ECG' } }} />);
});

it('knows that 2 and 2 make 4', () => {
  const page = { state: { itemName: 'ECG' } };
});
