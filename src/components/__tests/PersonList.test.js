import React from "react";

import { render } from "@testing-library/react";

import { People } from "../HomePage/PersonList";

describe("PersonList", () => {
    it("renders without crashing", () => {
      render(<People />);
    });

//     it("loads data and edits a person", async () => {
//         const { container, debug, getByDisplayValue } = render(<People />);
    

//         await waitForElement(() => getByText(container, "Archie Cohen"));

//         const appointment = getAllByTestId(
//           container,
//           "appointment"
//         ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    
//         fireEvent.click(getByAltText(appointment, "Edit"));
//         // expect(getByText(appointment, "Cancel")).toBeInTheDocument();
    
//         expect(getByText(appointment, "Save")).toBeInTheDocument();
    
//         fireEvent.change(getByDisplayValue("Archie Cohen"), {
//           target: { value: "Lydia Miller-Jones" },
//         });
    
//   });
})

