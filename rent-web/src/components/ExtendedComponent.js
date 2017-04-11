import { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { notification } from 'antd';

import * as HttpStatus from './../util/HttpStatus';
import * as ParameterType from './../util/ParameterType';

const DATE_FORMAT = 'YYYY-MM-DD';

class ExtendedComponent extends Component {
  componentDidUpdate() {
    if (this.props.isRequestError && this.props.isRequestError === HttpStatus.CONFLICT) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorConflictDescription,
      });
    } else if (this.props.isRequestError) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorDescription,
      });
    }
    if (this.props.isSaved) {
      notification.success({
        message: this.props.intl.messages.saveDataSuccessTitle,
        description: this.props.intl.messages.saveDataSuccessDescription,
      });
    }
    if (this.props.isDeleted) {
      notification.success({
        message: this.props.intl.messages.deleteRecordTitle,
        description: this.props.intl.messages.deleteRecordSuccessDescription,
      });
    }
  }
  getColumn = (title, name) => {
    return { title, dataIndex: name, key: name };
  }
  getDateColumn = (title, name) => {
    return {
      title,
      dataIndex: name,
      key: name,
      render(text) {
        let value = text;
        if (value && value.constructor.name === 'Moment') {
          value = value.format(DATE_FORMAT);
        }
        return value;
      },
    };
  }
  forwardTo = (url) => {
    browserHistory.push(url);
  }
  getListForCurrentPeriod = (list) => {
    return this.getListForPeriod(list, this.props.currentWorkingPeriod);
  }
  getListForPeriod = (list, workingPeriod) => {
    let newList = list;
    if (workingPeriod) {
      newList = list.filter((item) => {
        const itemDateStart = new Date(item.dateStart).getTime();
        const itemDateEnd = new Date(item.dateEnd).getTime();
        const workingPeriodDateStart = new Date(workingPeriod.dateStart).getTime();
        const workingPeriodDateEnd = new Date(workingPeriod.dateEnd).getTime();
        const dateStart = itemDateStart >= workingPeriodDateStart && itemDateStart <= workingPeriodDateEnd;
        const dateEnd = !item.dateEnd || (itemDateEnd >= workingPeriodDateStart && itemDateEnd <= workingPeriodDateEnd);
        return dateStart || dateEnd;
      });
    }
    return newList;
  }
  getAccountTotalAreaForCurrentPeriod = (account) => {
    return this.getAccountTotalAreaForPeriod(account, this.props.currentWorkingPeriod);
  }
  getAccountTotalAreaForPeriod = (account, workingPeriod) => {
    let totalArea = account.apartment.totalArea;
    const currentParameters = this.getListForCurrentPeriod(account.parameters, workingPeriod);
    currentParameters.forEach((item) => {
      if (item.parameterType.code === ParameterType.TOTAL_AREA_CODE) {
        totalArea = item.value;
      }
    });
    return totalArea;
  }
  getAccountPhoneNumbersForCurrentPeriod = (account) => {
    return this.getAccountPhoneNumbersForPeriod(account, this.props.currentWorkingPeriod);
  }
  getAccountPhoneNumbersForPeriod = (account, workingPeriod) => {
    let phoneNumbers = '';
    const currentParameters = this.getListForCurrentPeriod(account.parameters, workingPeriod);
    currentParameters.forEach((item) => {
      if (item.parameterType.code === ParameterType.PHONE_NUMBER_CODE) {
        phoneNumbers += (phoneNumbers.length === 0 ? '' : ';') + item.value;
      }
    });
    return phoneNumbers;
  }
}

ExtendedComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
  isRequestError: PropTypes.any,
  isSaved: PropTypes.bool,
  isDeleted: PropTypes.bool,
};

ExtendedComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponent,
};
