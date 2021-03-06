import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class TariffEditValuesForm extends EditComponent {
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.calculationType = this.props.calculationTypes.content.filter(calculationType => this.getLink(calculationType) === values.calculationType)[0];
        newValues.measurementUnit = this.props.measurementUnits.content.filter(measurementUnit => this.getLink(measurementUnit) === values.measurementUnit)[0];
        this.props.onOkFormTariffValueEdit(newValues);
      }
    });
  }
  onCancel = () => {
    this.props.onCancelFormTariffValueEdit(this.props.tariffValue);
  }
  afterClose = () => {
    this.props.form.resetFields();
  }
  render() {
    const object = this.props.tariffValue;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditValueOnTariffTitle" /> : <FormattedMessage id="editPageAddValueOnTariffTitle" />;
    const baseFields = this.getBaseFields(object);
    let calculationTypeList = null;
    if (this.props.calculationTypes && this.props.calculationTypes.content) {
      calculationTypeList = this.props.calculationTypes.content.map(calculationType => (
        <Select.Option key={calculationType.id} value={this.getLink(calculationType)}>{calculationType.name}</Select.Option>
      ));
    }
    let measurementUnitList = null;
    if (this.props.measurementUnits && this.props.measurementUnits.content) {
      measurementUnitList = this.props.measurementUnits.content.map(measurementUnit => (
        <Select.Option key={measurementUnit.id} value={this.getLink(measurementUnit)}>{measurementUnit.name}</Select.Option>
      ));
    }
    return (
      <Modal
        visible={this.props.formTariffValueEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
          {baseFields}
          <FormItem label={this.props.intl.messages.calculationTypeFieldName}>
            {this.getSelectWithSearchField('calculationType', this.getLink(object.calculationType), calculationTypeList)}
          </FormItem>
          <FormItem label={this.props.intl.messages.measurementUnitFieldName}>
            {this.getSelectWithSearchField('measurementUnit', this.getLink(object.measurementUnit), measurementUnitList)}
          </FormItem>
          <FormItem label={this.props.intl.messages.commonFieldValue}>
            {this.getInputNumberField('value', parseFloat(object.value), 0.1)}
          </FormItem>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldDateStart}>
                {this.getDateField('dateStart', object.dateStart)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldDateEnd}>
                {this.getDateField('dateEnd', object.dateEnd, false)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(TariffEditValuesForm));
