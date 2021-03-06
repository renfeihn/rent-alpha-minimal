import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Input, InputNumber, Select, DatePicker, Popconfirm, Modal, Checkbox } from 'antd';
import moment from 'moment';

import { ExtendedComponent } from './ExtendedComponent';

import * as ObjectUtil from './../util/ObjectUtil';

const MAX_INTEGER_VALUE = 2147483647;
const MIN_INTEGER_VALUE = -2147483648;

class EditComponent extends ExtendedComponent {
  getBaseFormField = (name, value, input) => {
    return this.props.form.getFieldDecorator(name, { initialValue: value })(input);
  };
  getBaseFields = (object) => {
    const fields = [];
    if (object) {
      fields.push(this.getBaseFormField('id', object.id, <Input key="id" type="hidden" />));
      fields.push(this.getBaseFormField('creationDate', object.creationDate, <Input key="creationDate" type="hidden" />));
      fields.push(this.getBaseFormField('lastModifiedDate', object.lastModifiedDate, <Input key="lastModifiedDate" type="hidden" />));
      fields.push(this.getBaseFormField('version', object.version, <Input key="version" type="hidden" />));
    }
    return fields;
  };
  getInputField = (name, value, required = true, readOnly = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(!readOnly ? <Input autoComplete="off" /> : <Input autoComplete="off" readOnly />);
  };
  getPasswordField = (name, value, required = true, readOnly = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(!readOnly ? <Input type="password" autoComplete="new-password" /> : <Input type="password" autoComplete="new-password" readOnly />);
  };
  getInputNumberField = (name, value, step = 1, required = true, useNegative = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(<InputNumber min={useNegative ? MIN_INTEGER_VALUE : 0} max={MAX_INTEGER_VALUE} step={step} />);
  };
  getDateField = (name, value, required = true, disabled = false) => {
    const onOpenChange = (status) => {
      if (!status) {
        const newVal = {};
        newVal[name] = this.props.form.getFieldValue(name);
        if (newVal[name]) {
          const newValue = newVal[name];
          newVal[name] = newValue instanceof Object ? moment.utc(newValue.format('YYYY-MM-DD')) : newValue;
        }
        this.props.form.setFieldsValue(newVal);
      }
    };
    return this.props.form.getFieldDecorator(name, {
      initialValue: value ? moment.utc(value) : null,
      rules: [{
        type: 'object',
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(!disabled ? <DatePicker onOpenChange={onOpenChange} /> : <DatePicker disabled />);
  };
  getLink = (object) => {
    return ObjectUtil.getLink(object);
  };
  getSelectWithSearchField = (name, value, values, onChange = () => {}, required = true) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value || undefined,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(
      <Select
        showSearch
        placeholder={this.props.intl.messages.findPlaceholder}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={onChange}
        notFoundContent=""
      >
        {values}
      </Select>
    );
  };
  getSelectField = (name, value, values, onChange = () => {}, required = true, readOnly = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value ? this.getLink(value) : undefined,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(
      <Select
        showSearch
        placeholder={this.props.intl.messages.findPlaceholder}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={onChange}
        notFoundContent=""
        disabled={readOnly}
      >
        {values}
      </Select>
    );
  };
  getCheckboxField = (name, value, title) => {
    return this.props.form.getFieldDecorator(name, {
      valuePropName: 'checked',
      initialValue: value,
    })(<Checkbox>{title}</Checkbox>);
  };
  getAttachmentField = (name, value) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required: true,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(<Input size="small" placeholder={this.props.intl.messages.attachmentNamePlaceholder} />);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        this.props.onSave(values);
      }
    });
  };
  getAttachmentColumn = (title, name) => {
    const onChange = (event, record) => {
      const newObj = record;
      newObj.name = event.target.value;
      this.setState({ attachmentsFileNameError: false });
    };
    const messages = this.props.intl.messages;
    return {
      title,
      key: name,
      dataIndex: name,
      render(text, record) {
        return (
          <Input
            size="small"
            placeholder={messages.attachmentNamePlaceholder}
            value={record.name}
            onChange={event => onChange(event, record)}
          />
        );
      },
    };
  };
  getAttachmentActionColumn = (onView, onDelete) => {
    const messages = this.props.intl.messages;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      width: '140px',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onView(record)}><FormattedMessage id="buttonView" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  };
  getActionColumn = (onEdit, onDelete) => {
    const messages = this.props.intl.messages;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onEdit(record)}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  };
  getActionSimpleColumn = (linkTitle, link) => {
    return this.getActionSimpleColumn(null, linkTitle, link);
  }
  getActionSimpleColumn = (idField, linkTitle, link) => {
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link to={`${link}/${idField ? record[idField].id : record.id}`}>{linkTitle}</Link>
          </span>
        );
      },
    };
  }
  confirmModal = (title, content, onOk) => {
    Modal.confirm({
      title,
      content,
      onOk() {
        onOk();
      },
      onCancel() {
      },
    });
  }
}

EditComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
  form: PropTypes.objectOf(PropTypes.shape),
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
};

EditComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  EditComponent,
};
