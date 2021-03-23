/* eslint-disable no-template-curly-in-string */
import React, { Fragment, useState } from 'react';
import { Form, Input, Select, Radio, Checkbox, DatePicker, Button, PageHeader, Modal } from 'antd';
import styles from './index.less';
import { QuestionCircleOutlined } from '@ant-design/icons';

const CreateActivity: React.FC = () => {
  const [activityModeTipHide, setActivityModeTip] = useState<boolean>(true)
  const [activityMode, setAactivityMode] = React.useState<string>('cycle');
  const [activityTime, setAactivityTime] = React.useState<string>('unlimited');
  const [limitedDateList, setlimitedDateList] = React.useState<any[]>([])
  const [weekList, setWeekList] = React.useState<any[]>([])
  const dateTimeOptions = ['限制日期', '限制周几', '限制时间']
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const onFinish = (values: any) => {
    console.log(values);
  };
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  // 选择活动状态
  const onChangeMode = (e: any) => {
    console.log('radio checked', e.target.value);
    setAactivityMode(e.target.value);
  };
  // 选择活动时间
  const onChangeTime = (e: any) => {
    console.log('radio checked', e.target.value);
    setAactivityTime(e.target.value);
  }
  // 限制日期
  const onChangeLimitDate = (list: any[]) => {
    console.log('radio checked', list);
    setlimitedDateList(list)
  }
  // 限制日期，选择日期
  const onChangeDate = (list: any[]) => {

  }
  // 限制日期，选择周几
  const onChangeWeek = (list: any[]) => {
    setWeekList(list)
  }
  return (
    <Fragment>
      <PageHeader className={styles.activityHeader} title="活动管理" >
        <span className={styles.bread}>{`> 创建活动`}</span>
      </PageHeader>

      <div className={styles.createActivityWrap}>
        <h1 className={styles.fillTitle}>填写活动信息</h1>
        <Form className={styles.activityMessage} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['activity', 'type']} label="活动类型" rules={[{ required: true }]}>
            <Select className={styles.activityMsg}>
              <Select.Option value="用户活动">用户活动</Select.Option>
              <Select.Option value="新用户礼包">新用户礼包</Select.Option>
              <Select.Option value="流失召回">流失召回</Select.Option>
              <Select.Option value="平台主题活动">平台主题活动</Select.Option>
              <Select.Option value="周年庆">周年庆</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name={['activity', 'name']} label="活动名称" rules={[{ required: true }]}>
            <Input className={styles.activityMsg} maxLength={50} placeholder={'请输入活动名称,并限制在50字以内'} />
          </Form.Item>
          <Form.Item name={['activity', 'introduction']} label="活动描述" className={styles.introductionTitle}>
            <Input.TextArea className={styles.introduction} maxLength={100} placeholder={`此处填写活动描述，请限制在100字以内`} />
          </Form.Item>
          <Form.Item name={['activity', 'mode']} label="活动形式">
            <div className={styles.activityModeWrap}>
              <span onMouseOver={() => { setActivityModeTip(false) }} onMouseOut={() => { setActivityModeTip(true) }}>
                <QuestionCircleOutlined />
              </span>

              <Radio.Group onChange={onChangeMode} value={activityMode}>
                <div className={styles.activityMode}>
                  <Radio value={'cycle'}>周期性活动</Radio>
                  <Radio value={'once'}>一次性活动</Radio>
                </div>
              </Radio.Group>
              <p className={activityModeTipHide ? styles.activityModeTipHide : styles.activityModeTip}>周期性活动指存在时间跨度的活动，一次性活动指在固定时间点生效的活动</p>

            </div>
          </Form.Item>
          <Form.Item name={['activity', 'time']} label="活动时间" >
            <div>
              <Radio.Group onChange={onChangeTime} value={activityTime} className={activityMode !== 'cycle' ? styles.activityTimeHide : styles.activityTimeWrap}>
                <Radio className={styles.dateTimeChoose} value={'unlimited'}>不限</Radio>
                <Radio className={styles.dateTimeChoose} value={'assign'}>在指定时间内</Radio>
              </Radio.Group>
              <Radio.Group onChange={onChangeTime} value={activityTime} className={activityMode === 'cycle' ? styles.activityTimeHide : styles.activityTimeWrap}>
                <Radio className={styles.dateTimeChoose} value={'immediate'}>立即生效</Radio>
                <Radio className={styles.dateTimeChoose} value={'fixedTime'}>定时生效</Radio>
              </Radio.Group>
            </div>
          </Form.Item>

        </Form>
        <div className={styles.timeDateChooseWrap}>
          <Checkbox.Group className={styles.timeDateChoose} options={dateTimeOptions} value={limitedDateList} onChange={onChangeLimitDate}>

          </Checkbox.Group>
          <div className={styles.dateTimePickWrap}>
            <div className={styles.dateTimePick}>
              <DatePicker onChange={onChangeDate} />
              <DatePicker onChange={onChangeDate} />
            </div>
            <div className={styles.weekPick}>
              <Checkbox.Group options={weekOptions} value={weekList} onChange={onChangeWeek} ></Checkbox.Group>
            </div>
          </div>
        </div>
      </div>

    </Fragment >
  );
};
export default CreateActivity;
