/* eslint-disable no-template-curly-in-string */
import React, { Fragment, useState } from 'react';
import { Row, Input, Select, Radio, Checkbox, DatePicker, Switch, PageHeader, TimePicker } from 'antd';
import styles from './index.less';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { classNames } from 'classnames';

const CreateActivity: React.FC = () => {
  const [activityModeTipHide, setActivityModeTip] = useState<boolean>(true)
  const [activityMode, setAactivityMode] = React.useState<string>('cycle');
  const [activityTime, setAactivityTime] = React.useState<string>('unlimited');
  const [limitedDateList, setlimitedDateList] = React.useState<any[]>([])
  const [weekList, setWeekList] = React.useState<any[]>([])
  const dateTimeOptions = ['限制日期', '限制周几', '限制时间']
  const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  // const validateMessages = {
  //   // eslint-disable-next-line no-template-curly-in-string
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not a valid email!',
  //     number: '${label} is not a valid number!',
  //   },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
  // };
  // 选择活动状态
  const chooseActivityMode = (e: any) => {
    console.log('radio checked', e.target.value);
    setAactivityMode(e.target.value);
  };
  // 选择活动时间
  const chooseActivityTime = (e: any) => {
    console.log('radio checked', e.target.value);
    setAactivityTime(e.target.value);
  }
  // 限制日期
  const chooseLimitDate = (list: any[]) => {
    console.log('radio checked', list);
    setlimitedDateList(list)
  }
  // 限制日期，选择日期
  const onChangeDate = (list: any[]) => {
    console.log(list)
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
        <div className={styles.activityMessage} >
          <Row className={styles.activityInfo}>
            <span className={styles.title}><i>*</i>活动类型：</span>
            <Select className={styles.activityMsg}>
              <Select.Option value="用户活动">用户活动</Select.Option>
              <Select.Option value="新用户礼包">新用户礼包</Select.Option>
              <Select.Option value="流失召回">流失召回</Select.Option>
              <Select.Option value="平台主题活动">平台主题活动</Select.Option>
              <Select.Option value="周年庆">周年庆</Select.Option>
            </Select>
          </Row>

          <Row className={styles.activityInfo}>
            <span className={styles.title}><i>*</i>活动名称：</span>
            <Input className={styles.activityMsg} maxLength={50} placeholder={'请输入活动名称,并限制在50字以内'} />
          </Row>
          <Row className={styles.activityInfo}>
            <span className={styles.title}><i>*</i>活动描述：</span>
            <Input.TextArea className={styles.introduction} maxLength={100} placeholder={`此处填写活动描述，请限制在100字以内`} />
          </Row>
          <Row className={styles.activityInfo}>
            <span>活动形式：</span>
            <div className={styles.activityModeWrap}>
              <span onMouseOver={() => { setActivityModeTip(false) }} onMouseOut={() => { setActivityModeTip(true) }}>
                <QuestionCircleOutlined />
              </span>

              <Radio.Group onChange={chooseActivityMode} value={activityMode}>
                <div className={styles.activityMode}>
                  <Radio value={'cycle'}>周期性活动</Radio>
                  <Radio value={'once'}>一次性活动</Radio>
                </div>
              </Radio.Group>
              <p className={activityModeTipHide ? styles.activityModeTipHide : styles.activityModeTip}>周期性活动指存在时间跨度的活动，一次性活动指在固定时间点生效的活动</p>

            </div>
          </Row>
          <Row className={styles.activityInfo}>
            <span>活动时间：</span>
            <div>
              <Radio.Group onChange={chooseActivityTime} value={activityTime} className={activityMode !== 'cycle' ? styles.activityTimeHide : styles.activityTimeWrap}>
                <Radio className={styles.dateTimeChoose} value={'unlimited'}>不限</Radio>
                <Radio className={styles.dateTimeChoose} value={'assign'}>在指定时间内</Radio>
              </Radio.Group>
              <Radio.Group onChange={chooseActivityTime} value={activityTime} className={activityMode === 'cycle' ? styles.activityTimeHide : styles.activityTimeWrap}>
                <Radio className={styles.dateTimeChoose} value={'immediate'}>立即生效</Radio>
                <div className={styles.setDateTime}>
                  <Radio className={styles.dateTimeChoose} value={'fixedTime'}>定时生效</Radio>
                  <div >
                    <DatePicker onChange={onChangeDate} />
                    <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                  </div>
                </div>
              </Radio.Group>
            </div>
          </Row>

        </div>
        <div className={activityTime === 'assign' ? styles.timeDateChooseWrap : styles.hide}>
          <Checkbox.Group className={styles.timeDateChoose} options={dateTimeOptions} value={limitedDateList} onChange={chooseLimitDate}>

          </Checkbox.Group>
          <div className={styles.dateTimePickWrap}>
            <div className={styles.dateTimePick}>
              <DatePicker onChange={onChangeDate} />
              <DatePicker className={styles.secondPicker} onChange={onChangeDate} />
            </div>
            <div className={styles.weekPick}>
              <Checkbox.Group options={weekOptions} value={weekList} onChange={onChangeWeek} ></Checkbox.Group>
            </div>
            <div className={styles.timePick}>
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              <TimePicker className={styles.secondPicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </div>
          </div>
        </div>
        <Row className={styles.activityStatus}>
          <span className={styles.title}>活动状态：</span>
          <Switch defaultChecked />
        </Row>
      </div>

    </Fragment >
  );
};
export default CreateActivity;
