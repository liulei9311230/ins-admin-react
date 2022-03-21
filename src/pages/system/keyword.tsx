/*
 * @Author: lei.liu
 * @Date: 2022-03-12 17:43:23
 */
import { useState, useEffect, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Select, Button, Space, Table } from 'antd';
import { keyWordList } from '@src/api';
import ProductTree from './component/productTree';
import DKeyword from './component/d-keyword';
import { bizTypeMap, statusMap } from '@src/config/mapData';

const MemoKeyword = memo(DKeyword);

const { Option } = Select;

const initialValue = {
  keyword: '',
  bizType: '1',
  productCode: '',
  status: '0'
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Params {
  id?: number;
  type: boolean;
}

function Keyword(props) {
  const { productMap } = props;
  const [form] = Form.useForm();
  const [data, setDate] = useState([]);
  const [type, setType] = useState('1');
  const [visible, setVisible] = useState(false);
  const [dataId, setDataId] = useState<number | undefined>();

  const onFinish = () => {
    const formItems = form.getFieldsValue();
    const params = {
      ...formItems,
      pageId: 1,
      pageSize: 10
    };
    console.log(params, data, 'params[[[[[[');
    keyWordList(params).then(res => {
      setDate(res.data.data.content || []);
    });
  };

  useEffect(() => {
    onFinish();
  }, []);

  const toggleModal = (params: Params) => {
    setVisible(params.type);
    if (params.id) setDataId(params.id);
  };

  const columnsData = [
    {
      title: '类型',
      dataIndex: 'bizType',
      render: data => bizTypeMap[+data]
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => statusMap[+data]
    },
    {
      title: '主关键词',
      dataIndex: 'masterKey'
    },
    {
      title: '近义词',
      dataIndex: 'similarKeys'
    },
    {
      title: '变形词',
      dataIndex: 'distortedKeys'
    },
    {
      title: '关联提示词的险种',
      dataIndex: 'relateInsuranceProducts'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <a
              onClick={() =>
                toggleModal({ type: true, id: data?.insuranceKeywordId })
              }
            >
              编辑
            </a>
            <a>启用</a>
            <a>停用</a>
            <a>删除</a>
          </Space>
        );
      }
    }
  ];

  const getFields = () => {
    return (
      <>
        <Col span={8}>
          <Form.Item name="keyword" label="关键词">
            <Input placeholder="请输入主关键词/近义词/变形词"></Input>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="bizType" label="类型">
            <Select>
              {(Object.keys(bizTypeMap) || []).map(item => (
                <Option key={item} value={item}>
                  {bizTypeMap[item]}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="productCode" label="关联险种">
            {type === '1' ? (
              <Select placeholder="选择关联险种">
                <Option value="">全部</Option>
                {(Object.keys(productMap) || []).map(item => (
                  <Option key={item} value={item}>
                    {productMap[item]}
                  </Option>
                ))}
              </Select>
            ) : (
              <ProductTree></ProductTree>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="status" label="状态">
            <Select placeholder="选择状态">
              <Option value="0">全部</Option>
              {(Object.keys(statusMap) || []).map(item => (
                <Option key={item} value={item}>
                  {statusMap[item]}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" onClick={onFinish}>
              查询
            </Button>
            <Button type="ghost" danger>
              新增
            </Button>
          </Space>
        </Col>
      </>
    );
  };
  const fieldValueChange = changedValues => {
    if (changedValues?.bizType) {
      setType(changedValues?.bizType);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValue}
        onValuesChange={fieldValueChange}
      >
        <Row>{getFields()}</Row>
      </Form>

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey={(record: any) => {
            return record.insuranceKeywordId;
          }}
          columns={columnsData as ColumnTypes}
          dataSource={data}
        ></Table>
      </div>
      <MemoKeyword
        visible={visible}
        dataId={dataId}
        onCancel={useCallback(() => toggleModal({ type: false }), [])}
      ></MemoKeyword>
    </>
  );
}

const mapStateToProps = state => {
  return { ...state.ProductDetail };
};

export default connect(mapStateToProps)(Keyword);
