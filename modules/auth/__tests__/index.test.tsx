import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import { App } from "../src/demo/app";

test(
  "Sign In Anonymously",
  async () => {
    const { getByText, getByTestId } = render(<App />);
    await waitForElement(() => getByTestId("signin-anon"));
    const signinButton = getByTestId("signin-anon");
    fireEvent.click(signinButton);
    await waitForElement(() => getByText("You are authenticated"), {
      timeout: 10000
    });
    cleanup();
  },
  10000
);
