import { render } from '@testing-library/react';
import About from '../../pages/About';

it("renders without crashing", () => {
    render(<About />);
});