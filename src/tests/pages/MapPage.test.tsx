import MapPage from '../../pages/MapPage/MapPage';
import { render } from '../../setupTests';
import { act } from 'react-dom/test-utils';

// See snapshots

it('renders without crashing', () => {
  render(<MapPage location={{ state: { itemName: 'ECG' } }} />);
});

it('displays the correct title', () => {
  act(() => {
    render(<MapPage location={{ state: { itemName: 'ECG' } }} />);
  });
  expect(document.getElementById('map-title').textContent).toBe(
    'Voici les ECGs à proximité'
  );

  act(() => {
    render(<MapPage location={{ state: { itemName: 'Lit' } }} />);
  });
  expect(document.getElementById('map-title').textContent).toBe(
    'Voici les Lits à proximité'
  );
});
