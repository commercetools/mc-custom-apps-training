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
 
  return <div>ExternalServer</div>
};

export default ExternalServer;
