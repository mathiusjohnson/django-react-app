import { render } from '@testing-library/react';
import Status from '../HomePage/PersonListItem/Status';

it("renders without crashing", () => {
    render(<Status />);
});