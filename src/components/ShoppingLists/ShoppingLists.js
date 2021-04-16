import React, { useState, useEffect } from "react";
import Text from "@commercetools-uikit/text";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";
import { createShoppingList, deleteShoppingList } from "./mutations.graphql";
import DataTableManager from "@commercetools-uikit/data-table-manager";
import DataTable from "@commercetools-uikit/data-table";
import PrimaryButton from "@commercetools-uikit/primary-button";
import { FormModalPage } from "@commercetools-frontend/application-components";
import Spacings from "@commercetools-uikit/spacings";
import TextField from "@commercetools-uikit/text-field";

import {
  useShowApiErrorNotification,
  useShowNotification,
} from "@commercetools-frontend/actions-global";
import { DOMAINS } from "@commercetools-frontend/constants";
import { useFormik } from "formik";

import { useQuery, useMutation } from "@apollo/client/react";
import IconButton from "@commercetools-uikit/icon-button";
import { CheckInactiveIcon, EditIcon } from "@commercetools-uikit/icons";

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const ShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState([{}]);
  const [formVisibility, setFormVisibility] = useState(false);
  const showApiErrorNotification = useShowApiErrorNotification();
  const showSuccessNotification = useShowNotification();
  const [saveShoppingList] = useMutation(createShoppingList);
  const [delShoppingList] = useMutation(deleteShoppingList);
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
      renderItem: (row) =>
        row?.nameAllLocales ? row?.nameAllLocales[0]?.value : "",
    },
    {
      key: "actions",
      label: "Actions",
      renderItem: (row) => {
        const version = row.version;
        const id = row.id;
        return (
          <IconButton
            icon={<CheckInactiveIcon />}
            label="Delete Record"
            onClick={async (row) => {
              const { error, data } = await delShoppingList({
                variables: {
                  version,
                  id,
                },
                context: { target },
              });
              if (error) showApiErrorNotification({ error: error });
              console.log(data);
              setShoppingLists(
                shoppingLists.filter((item) => {
                  console.log(data);
                  return item.id !== data.deleteShoppingList.id;
                })
              );
              showSuccessNotification({
                kind: "success",
                domain: DOMAINS.SIDE,
                text: "Shopping List Deleted Successfully",
              });
            }}
          />
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

  const { error, data, loading } = useQuery(fetchShoppingLists, {
    context: { target },
  });

  const handleSubmit = async (formValues) => {
    const { error, data, loading } = await saveShoppingList({
      variables: {
        locale: formValues.locale,
        value: formValues.name,
      },
      context: { target },
    });
    if (error) showApiErrorNotification({ error: error });
    setShoppingLists([...shoppingLists, data.createShoppingList]);
    setFormVisibility(false);
    showSuccessNotification({
      kind: "success",
      domain: DOMAINS.SIDE,
      text: "Shopping List added Successfully",
    });
  };

  useEffect(() => {
    setShoppingLists(data?.shoppingLists?.results);
  }, [data]);

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
        <DataTable rows={shoppingLists?.length > 0 ? shoppingLists : []} />
      </DataTableManager>
    </React.Fragment>
  );
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
