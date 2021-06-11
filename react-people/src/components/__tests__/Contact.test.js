import { render } from '@testing-library/react';
import Contact from '../../pages/Contact';

it("renders without crashing", () => {
    render(<Contact />);
});