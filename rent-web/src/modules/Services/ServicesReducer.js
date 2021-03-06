import {
  serviceTypeReducer,
  getServiceTypeIsLoading,
  getServiceTypeIsRequestError,
} from './reducers/ServiceTypeReducer';

import {
  serviceReducer,
  getServiceIsLoading,
  getServiceIsRequestError,
} from './reducers/ServiceReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  serviceType: data,
  service: data,
};

const ServiceReducer = (state = initialState, action) => {
  return {
    serviceType: serviceTypeReducer(state, action),
    service: serviceReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getServiceTypeIsRequestError(state) || getServiceIsRequestError(state);
export const getIsLoading = state => getServiceTypeIsLoading(state) || getServiceIsLoading(state);

// Export Reducer
export default ServiceReducer;
