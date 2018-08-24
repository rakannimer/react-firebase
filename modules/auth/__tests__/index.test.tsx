import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import {App} from '../src/demo/app'

test('Sign In Anonymously', async () => {
  const {getByText} = render(<App />);
  const signinButton = getByText("Sign In Anonymously");
  fireEvent.click(signinButton)
  await waitForElement(()=>getByText("You are authenticated"))
})
