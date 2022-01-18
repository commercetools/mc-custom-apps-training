import React, { useReducer, useEffect, useState } from "react";
import Text from "@commercetools-uikit/text";
import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useShowApiErrorNotification } from "@commercetools-frontend/actions-global";
import PrimaryButton from "@commercetools-uikit/primary-button";
import { ContentNotification, Spacings } from "@commercetools-frontend/ui-kit";

const externalApiUrl =
  "https://app-kit-playground-commercetools-playground.vercel.app/api/echo";

const ExternalServer = () => {
  // The asyncDispatch is a wrapper around the redux dispatch and provides
  // the correct return type definitions because the action resolves to a Promise.
  const asyncDispatch = useAsyncDispatch();
  const showApiErrorNotification = useShowApiErrorNotification();
  const [type, setType] = useState("info");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(
    "Click on the button above to send a call to the External Server"
  );

  const handleClick = () => {
    asyncDispatch(actions.forwardTo.get({ uri: externalApiUrl }))
      .then((result) => {
        setType("success");
        setMessage(result.message);
      })
      .catch((error) => {
        setType("error");
        setError(error.message);
        showApiErrorNotification({ errors: error });
      });
  };

  if (error)
    return (
      <ContentNotification type="error">
        {" "}
        {`Message: ${error}`}{" "}
      </ContentNotification>
    );

  return (
    <Spacings.Stack scale="l" alignItems="flex-start">
      <Text.Headline as="h3">External fetch example</Text.Headline>

      <PrimaryButton label="Call to External Server" onClick={handleClick} />

      <ContentNotification type={type}>
        {" "}
        {`Message: ${message}`}{" "}
      </ContentNotification>
    </Spacings.Stack>
  );
};

export default ExternalServer;
