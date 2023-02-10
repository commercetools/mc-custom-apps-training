import React, { useState } from 'react';

import {useQuery, useMutation} from '@apollo/client/react'
import {GRAPHQL_TARGETS} from '@commercetools-frontend/constants'

import {fetchShoppingLists} from './queries.graphql'
import {deleteShoppingList, createShoppingList} from './mutations.graphql'
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import {useFormik} from 'formik'
import { FormModalPage } from '@commercetools-frontend/application-components';
import PrimaryButton from '@commercetools-uikit/primary-button';
import TextField from '@commercetools-uikit/text-field';


//data
//results[i].id
const cols = [
  {
    key:"id",
    label:"ID",
    renderItem:(row)=>row.id? row.id:""
  },
  {
    key:"name",
    label:"Name",
    renderItem: (row)=>row.nameAllLocales? row.nameAllLocales[0].value:""
  }
]


const ShoppingLists = () => {
  
  const [modalState, setModalState]=useState(false)

  const formik = useFormik({
    initialValues:{
      locale:"",
      name:""
    },
    onSubmit:(values, {resetForm})=>{
      handleAddShoppingList(values)
      resetForm({})
    },
    validateOnChange:false,
  })

  const {error, data, loading} = useQuery(fetchShoppingLists,{
    context:{target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
  });
  const options = {
    refetchQueries:[{query: fetchShoppingLists, context:{target:GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}}]
  }

  const [delShoppingList] = useMutation(deleteShoppingList,options)
  const [addShoppingList] = useMutation(createShoppingList,options)


  const handleDelete = async() =>{
   const {error} =  await delShoppingList({
    variables:{
      version:1,
      id:"c7f34e17-b66f-452b-afb4-104c3e827fd8"
    },
    context:{target:GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
   })
   if (error)console.log(error.message)
  }
  const handleAddShoppingList = async (formValues)=>{
    const {error,data} = await addShoppingList({
      variables:{
        name:formValues.name,
        locale:formValues.locale
      },
      context:{target:GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
    })
    if(error) console.log(error.message)
    console.log(data)
  }

  // locale:"en" name:"asdkajls"

  if (loading)return 'Loading ...'
  if (error) return `--Error ${error.message}`

  console.log(data)

   
  return <>
    <div>
      
    <FormModalPage
      title="Manage your ShoppingList"
      isOpen={modalState}
      onClose={()=>setModalState(false)}
      isPrimaryButtonDisabled={formik.isSubmitting}
      onSecondaryButtonClick={formik.handleReset}
      onPrimaryButtonClick={formik.handleSubmit}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          title="Name"
          isRequired={true}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          name="locale"
          title="Locale"
          isRequired={true}
          value={formik.values.locale}
          onChange={formik.handleChange}
        />
      </form>
    </FormModalPage>
      
      <PrimaryButton
        label="Add a ShoppingList"
        onClick={() => setModalState(true)}
        isDisabled={false}
      />
        ShoppingLists
        <button onClick={handleDelete}> Delete Shopping List</button>
        <DataTableManager columns={cols}>
          <DataTable rows={data?.shoppingLists?.results} />
        </DataTableManager>
    </div>
  </>
  
};
ShoppingLists.displayName = 'ShoppingLists';

export default ShoppingLists;
