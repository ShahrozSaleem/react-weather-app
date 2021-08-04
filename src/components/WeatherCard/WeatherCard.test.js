import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store";
import WeatherCard from "./index";

test('should test WeatherCard existence', () => {

    const { queryByTestId } = render(
        <Provider store={appStore}>
            <WeatherCard />
        </Provider>
    );

    expect(queryByTestId("weather-card-test")).toBeTruthy();

})
