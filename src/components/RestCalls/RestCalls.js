import React,{useReducer,useEffect,useState} from 'react';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import * as actions from './actions';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useShowApiErrorNotification } from '@commercetools-frontend/actions-global';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';




const initialState = {
    isLoading: true,
    data: null,
    error: null,
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ok':
        return { isLoading: false, data: action.payload, error: null };
      case 'error':
        return { isLoading: false, data: null, error: action.payload };
      default:
        return state;
    }
  };
  
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'key', label: 'Key' },
  ];

const RestCalls = () =>{
 // The asyncDispatch is a wrapper around the redux dispatch and provides
  // the correct return type definitions because the action resolves to a Promise.
  const asyncDispatch = useAsyncDispatch();
  const showApiErrorNotification = useShowApiErrorNotification();
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return <div>RestCalls</div>

}
RestCalls.displayName = 'RestCalls';

export default RestCalls;
