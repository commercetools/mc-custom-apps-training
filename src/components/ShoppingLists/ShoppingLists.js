import React, { useState, useEffect } from "react";
import Text from "@commercetools-uikit/text";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";
import {
  createShoppingList,
  deleteShoppingList,
  updateShoppingListName,
} from "./mutations.graphql";
import DataTableManager from "@commercetools-uikit/data-table-manager";
import DataTable from "@commercetools-uikit/data-table";
import PrimaryButton from "@commercetools-uikit/primary-button";
import { FormModalPage } from "@commercetools-frontend/application-components";
import Spacings from "@commercetools-uikit/spacings";
import TextField from "@commercetools-uikit/text-field";
import TextInput from "@commercetools-uikit/text-input";

import {
  useShowApiErrorNotification,
  useShowNotification,
} from "@commercetools-frontend/actions-global";
import { DOMAINS } from "@commercetools-frontend/constants";
import { useFormik } from "formik";

import { useQuery, useMutation } from "@apollo/client/react";

import IconButton from "@commercetools-uikit/icon-button";
import {
  CheckInactiveIcon,
  EditIcon,
  CheckBoldIcon,
} from "@commercetools-uikit/icons";

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const ShoppingLists = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [updateVisibility, setUpdateVisibility] = useState({
    status: false,
    rowId: "",
    version: "",
    name: "",
  });
  const showApiErrorNotification = useShowApiErrorNotification();
  const showSuccessNotification = useShowNotification();
  const { error, data, loading } = useQuery(fetchShoppingLists, {
    context: { target },
  });
  const refetch = {
    // Then re-run
    refetchQueries: [{ query: fetchShoppingLists, context: { target } }],
  };
  const [saveShoppingList] = useMutation(createShoppingList, refetch);
  const [updateShoppingList] = useMutation(updateShoppingListName, refetch);
  const [delShoppingList] = useMutation(deleteShoppingList, refetch);
  const cols = [
    {
      key: "id",
      label: "id",
      renderItem: (row) => (row?.id ? row.id : ""),
    },
    {
      key: "version",
      label: "version",
      renderItem: (row) => (row?.version ? row.version : ""),
    },
    {
      key: "name",
      label: "Name",
      renderItem: (row) => {
        if (updateVisibility.status && updateVisibility.rowId == row.id)
          return (
            <TextInput
              value={updateVisibility.name}
              onChange={(event) =>
                setUpdateVisibility({
                  ...updateVisibility,
                  name: event.target.value,
                })
              }
            />
          );

        return row?.nameAllLocales ? row?.nameAllLocales[0]?.value : "";
      },
    },
    {
      key: "actions",
      label: "Actions",
      renderItem: (row) => {
        const version = row.version;
        const id = row.id;
        const name = row?.nameAllLocales[0]?.value;
        const locale = row?.nameAllLocales[0]?.locale;
        return (
          <React.Fragment>
            <IconButton
              icon={<CheckInactiveIcon />}
              label="Delete Record"
              onClick={async (row) => {
                const { error } = await delShoppingList({
                  variables: {
                    version,
                    id,
                  },
                  context: { target },
                });
                if (error) showApiErrorNotification({ error: error });
                showSuccessNotification({
                  kind: "success",
                  domain: DOMAINS.SIDE,
                  text: "Shopping List Deleted Successfully",
                });
              }}
            />
            {updateVisibility.status ? (
              updateVisibility.rowId == id ? (
                <IconButton
                  icon={<CheckBoldIcon />}
                  label="Submit Edit Record"
                  onClick={async (row) => {
                    const { error } = await updateShoppingList({
                      variables: {
                        version,
                        id,
                        locale,
                        value: updateVisibility.name,
                      },
                      context: { target },
                    });
                    if (error) showApiErrorNotification({ error: error });
                    showSuccessNotification({
                      kind: "success",
                      domain: DOMAINS.SIDE,
                      text: "Shopping List updated Successfully",
                    });
                    setUpdateVisibility({
                      status: false,
                      rowId: "",
                      version: "",
                      name: "",
                    });
                  }}
                />
              ) : (
                ""
              )
            ) : (
              <IconButton
                icon={<EditIcon />}
                label="Edit Record"
                onClick={(row) =>
                  setUpdateVisibility({
                    status: true,
                    rowId: id,
                    version,
                    name,
                  })
                }
              />
            )}
          </React.Fragment>
        );
      },
    },
  ];
  const formik = useFormik({
    initialValues: {
      locale: "",
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm({});
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleSubmit = async (formValues) => {
    const { error } = await saveShoppingList({
      variables: {
        locale: formValues.locale,
        value: formValues.name,
      },
      context: { target },
    });
    if (error) showApiErrorNotification({ error: error });
    setFormVisibility(false);
    showSuccessNotification({
      kind: "success",
      domain: DOMAINS.SIDE,
      text: "Shopping List added Successfully",
    });
  };

  if (loading) return "Loading...";
  if (error) return `---Error! ${error.message}`;

  return (
    <React.Fragment>
      <FormModalPage
        title="Add Shopping List"
        isOpen={formVisibility}
        onClose={() => setFormVisibility(false)}
        subtitle={
          <Text.Body>{"Add a Shopping list to your project"}</Text.Body>
        }
        topBarCurrentPathLabel="Add Shopping List"
        topBarPreviousPathLabel="Back"
        onSecondaryButtonClick={() => setFormVisibility(false)}
        onPrimaryButtonClick={formik.handleSubmit}
      >
        <form onSubmit={formik.handleSubmit}>
          <Spacings.Inline>
            <TextField
              id="locale"
              title="Locale"
              value={formik.values.locale}
              onChange={formik.handleChange}
            />
            <TextField
              id="name"
              title="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Spacings.Inline>
        </form>
      </FormModalPage>
      <Spacings.Inline>
        <PrimaryButton
          label="Add Shopping List"
          onClick={() => setFormVisibility(true)}
        />
      </Spacings.Inline>
      <DataTableManager columns={cols}>
        <DataTable rows={data?.shoppingLists?.results} />
      </DataTableManager>
    </React.Fragment>
  );
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
