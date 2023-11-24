import { render } from '@testing-library/react';
import App from './App';

test('renders loading page', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Loading.../);
    expect(linkElement).toBeInTheDocument();
});
