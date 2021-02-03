import React, { useReducer, useEffect, useState } from "react";
import Text from "@commercetools-uikit/text";
import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useShowApiErrorNotification } from "@commercetools-frontend/actions-global";
import PrimaryButton from "@commercetools-uikit/primary-button";
import { ContentNotification, Spacings } from "@commercetools-frontend/ui-kit";

const externalApiUrl = "https://external-server.now.sh/sayhi";
const initialState = {
  isLoading: false,
  data: null,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ok":
      return { isLoading: false, data: action.payload, error: null };
    case "error":
      return { isLoading: false, data: null, error: action.payload };
    default:
      return state;
  }
};
const ExternalServer = () => {
  // The asyncDispatch is a wrapper around the redux dispatch and provides
  // the correct return type definitions because the action resolves to a Promise.
  const asyncDispatch = useAsyncDispatch();
  const showApiErrorNotification = useShowApiErrorNotification();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState(
    "Click on the button above to send a call to the External Server"
  );
  const [from, setFrom] = useState("");
  

  const handleClick = () =>{
    asyncDispatch(actions.forwardTo.get({ uri: externalApiUrl }))
      .then((result) => {
        setType("success")
        setMessage(result.message)
        setFrom(result.from)
        dispatch({ type: "ok", payload: result });
      })
      .catch((error) => {
        dispatch({ type: "error", payload: error });
        showApiErrorNotification({ errors: error });
      });
  }
 
  if (state.isLoading) return "Loading...";
  if (state.error) return (
    <ContentNotification type="error">
        {" "}
        {`Message: ${state.error.message}`}{" "}
      </ContentNotification>
  );
  
  return (
    <Spacings.Stack scale="l" alignItems="flex-start">
      <Text.Headline as="h3">External fetch example</Text.Headline>

      <PrimaryButton
        label="Call to External Server"
        onClick={handleClick}
      />

      <ContentNotification type={type}>
        {" "}
        {`Message: ${message} ${from}`}{" "}
      </ContentNotification>
    </Spacings.Stack>
  );
};

export default ExternalServer;
