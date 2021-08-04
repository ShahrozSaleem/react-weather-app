import { render, screen } from "@testing-library/react";
import SplashScreen from "./index";

test('should test SplashScreen existence', () => {

    const { queryByTestId } = render(
        <SplashScreen />
    );

    const text = screen.getByText(/Loading/i);

    expect(queryByTestId("loading-test")).toBeTruthy();
    expect(text).toBeInTheDocument();

})
