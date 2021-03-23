import React, { Fragment, useState } from 'react';
import { Row, Col, Input, Select, DatePicker, Button, PageHeader, Table, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { PlusSquareOutlined } from '@ant-design/icons';


const Activities: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalContentText, setModalContentTex] = useState<string>('');

  // 显示对话框
  const showModal = (record: any) => {
    console.log(record)
    console.log(isModalVisible)
    setModalContentTex(record?.activityName)
    setIsModalVisible(true);
  };
  // 对话框确认
  const handleOk = () => {
    setIsModalVisible(false);
  };
  // 对话框取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: '活动ID',
      dataIndex: 'activityId',
      key: 'activityId',
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
    },
    {
      title: '活动描述',
      dataIndex: 'activityDesc',
      key: 'activityDesc',
    },
    {
      title: '公众号',
      dataIndex: 'wechart',
      key: 'wechart',

    },
    {
      title: '活动开始日期',
      dataIndex: 'activityStartDate',
      key: 'activityStartDate',

    },
    {
      title: '活动结束日期',
      dataIndex: 'activityEndDate',
      key: 'activityEndDate',

    },
    {
      title: '活动类型',
      dataIndex: 'activityType',
      key: 'activityType',

    },
    {
      title: '通知方式',
      dataIndex: 'noticeType',
      key: 'noticeType',

    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',

    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',

    },
    {
      title: '活动状态',
      dataIndex: 'activityStatus',
      key: 'activityStatus',

    },
    {
      title: '操作',
      dataIndex: 'opreation',
      key: 'opreation',
      render: (opreation: any[], record: any) => (
        <>
          {opreation.map((item: any, index: number) => {
            return (
              <Button onClick={() => { showModal(record) }} className={styles.operate} key={index}>
                {item}
              </Button>
            );
          })}
        </>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      activityId: 'John Brown',
      activityName: 32,
      activityDesc: 'New York No. 1 Lake Park',
      wechart: ['nice', 'developer'],
      activityStartDate: '2020-02-23',
      activityEndDate: '2020-02-23',
      activityType: '红包',
      noticeType: '短信',
      creater: '得得',
      createDate: '2020-01-22',
      activityStatus: '结束',
      opreation: ['关闭活动', '查看效果']
    },
    {
      key: '2',
      activityId: 'Jim Green',
      activityName: 42,
      activityDesc: 'London No. 1 Lake Park',
      wechart: ['loser'],
      activityStartDate: '2020-02-23',
      activityEndDate: '2020-02-23',
      activityType: '红包',
      noticeType: '短信',
      creater: '得得',
      createDate: '2020-01-22',
      activityStatus: '结束',
      opreation: ['关闭活动', '查看效果']
    },
    {
      key: '3',
      activityId: 'Joe Black',
      activityName: 32,
      activityDesc: 'Sidney No. 1 Lake Park',
      wechart: ['cool', 'teacher'],
      activityStartDate: '2020-02-23',
      activityEndDate: '2020-02-23',
      activityType: '红包',
      noticeType: '短信',
      creater: '得得',
      createDate: '2020-01-22',
      activityStatus: '结束',
      opreation: ['关闭活动', '查看效果']
    },
  ];

  return (
    <Fragment>
      <PageHeader className={styles.activityHeader} title="活动管理" >
        <Button className={styles.createActivity} type="primary" icon={<PlusSquareOutlined />}>创建活动</Button>
      </PageHeader>
      <div className={styles.setCondition}>
        <Row className={styles.condition}>
          <Col span={3}>
            <Input placeholder="输入活动名称" />
          </Col>
          <Select defaultValue="公众号" className={styles.selectBox}>
            <Select.Option value="大温饭团">大温饭团</Select.Option>
            <Select.Option value="多伦多">多伦多</Select.Option>
            <Select.Option value="大温">大温</Select.Option>
          </Select>
          <Select defaultValue="通知方式" className={styles.selectBox}>
            <Select.Option value="短信">短信</Select.Option>
            <Select.Option value="弹窗">弹窗</Select.Option>
          </Select>
          <Select defaultValue="活动状态" className={styles.selectBox}>
            <Select.Option value="开始">开始</Select.Option>
            <Select.Option value="结束">结束</Select.Option>
          </Select>
          <div className={styles.activityDate}>
            <DatePicker />
            <DatePicker className={styles.endDate} />
          </div>
        </Row>
        <div className={styles.serachOrReset}>
          <Button className={styles.search} type="primary" icon={<SearchOutlined />}>搜索</Button>
          <Button className={styles.reset}>重置</Button>
        </div>
      </div>
      <div className={styles.activityList}>
        <Table columns={columns} dataSource={data}
        />
      </div>
      <Modal title="提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>请确认是否要关闭活动{modalContentText}</p>
      </Modal>
    </Fragment>
  );
};
export default Activities;
