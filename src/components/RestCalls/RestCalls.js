import React, { useReducer, useEffect, useState } from "react";
import Text from "@commercetools-uikit/text";
import messages from "./messages";
import * as actions from "./actions";
import { useAsyncDispatch } from "@commercetools-frontend/sdk";
import { useShowApiErrorNotification } from "@commercetools-frontend/actions-global";
import DataTableManager from "@commercetools-uikit/data-table-manager";
import DataTable from "@commercetools-uikit/data-table";
import { InfoModalPage } from "@commercetools-frontend/application-components";

const initialState = {
  isLoading: true,
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

const columns = [
  { key: "name", label: "Name" },
  { key: "key", label: "Key" },
];

const RestCalls = () => {
  // The asyncDispatch is a wrapper around the redux dispatch and provides
  // the correct return type definitions because the action resolves to a Promise.
  const asyncDispatch = useAsyncDispatch();
  const showApiErrorNotification = useShowApiErrorNotification();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isClosed, setIsClosed] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    asyncDispatch(actions.fetchZones())
      .then((result) => {
        dispatch({ type: "ok", payload: result });
      })
      .catch((error) => {
        dispatch({ type: "error", payload: error });
        showApiErrorNotification({ errors: error });
      });
  }, []);

  if (state.isLoading) return "Loading...";
  if (state.error) return `Error! ${state.error.message}`;
  return (
    <div>
      <InfoModalPage
        title="Lorem ipsum"
        isOpen={isClosed}
        onClose={() => setIsClosed(false)}
        subtitle={<Text.Body>{"Lorem ipsum ..."}</Text.Body>}
        topBarCurrentPathLabel="Lorem ipsum"
        topBarPreviousPathLabel="Back"
      >
        <Text.Body>{modalContent.name}</Text.Body>
      </InfoModalPage>
      <DataTableManager columns={columns}>
        <DataTable
          rows={state.data.results}
          onRowClick={(row) => {
            setModalContent(row);
            setIsClosed(true);
          }}
        />
      </DataTableManager>
    </div>
  );
};
RestCalls.displayName = "RestCalls";

export default RestCalls;
