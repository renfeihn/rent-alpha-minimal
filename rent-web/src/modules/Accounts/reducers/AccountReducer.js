import moment from 'moment';

import * as AccountAction from './../actions/AccountAction';
import * as AccountParameterAction from './../actions/AccountParameterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

export const getDefaultParameter = () => {
  return {
    id: '',
    parameterType: {
      id: '',
      name: '',
    },
    value: 0,
    dateStart: moment(),
    dateEnd: null,
  };
};

const emptyEditData = {
  id: '',
  accountNumber: '',
  dateOpen: moment(),
  dateClose: null,
  contractor: {
    id: '',
  },
  apartment: {
    id: '',
    building: {
      id: '',
      street: {
        id: '',
      },
    },
  },
  parameters: [],
};

export const accountReducer = (state, action) => {
  switch (action.type) {
    case AccountAction.GET_ACCOUNT:
    case AccountAction.SAVE_ACCOUNT: {
      return prepareEdit(state.account.edit.data, true, false, false, false);
    }
    case AccountAction.FIND_ACCOUNTS_BY_ACCOUNT_NUMBER:
    case AccountAction.GET_ACCOUNTS:
    case AccountAction.DELETE_ACCOUNT: {
      return prepareList(state.account.list.data, emptyEditData, true, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountAction.GET_ACCOUNTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountAction.GET_ACCOUNTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountAction.SAVE_ACCOUNT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountAction.DELETE_ACCOUNT_SUCCESS: {
      return prepareList(state.account.list.data, emptyEditData, false, false, false, true);
    }

    case AccountAction.SAVE_ACCOUNT_FAILED: {
      return prepareEdit(state.account.edit.data, false, action.showError, false, false);
    }
    case AccountAction.DELETE_ACCOUNT_FAILED: {
      return prepareList(state.account.list.data, emptyEditData, false, true, false, false);
    }

    case AccountAction.NEW_ACCOUNT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case AccountAction.ADD_NEW_PARAMETER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters.push(action.parameter);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountAction.EDIT_PARAMETER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      newObj.parameters.push(action.parameter);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountAction.REMOVE_PARAMETER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_FAILED: {
      return state.account;
    }

    default:
      return prepareDefault(state.account.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountEditData = state => state.accounts.account.edit.data;
export const getAccountListData = state => state.accounts.account.list.data;
export const getAccountIsLoading = state => state.accounts.account.list.isLoading || state.accounts.account.edit.isLoading;
export const getAccountIsRequestError = state => state.accounts.account.list.isRequestError || state.accounts.account.edit.isRequestError;
export const getAccountIsSaved = state => state.accounts.account.isSaved;
export const getAccountIsDeleted = state => state.accounts.account.isDeleted;
