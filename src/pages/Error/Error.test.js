import { render, screen } from "@testing-library/react";
import Error from "./index";

test('should test Error page existence', () => {

    const { queryByTestId } = render(
        <Error />
    );

    const text = screen.getByText(/Something went Wrong/i);

    expect(queryByTestId("error-test")).toBeTruthy();
    expect(text).toBeInTheDocument();

})
