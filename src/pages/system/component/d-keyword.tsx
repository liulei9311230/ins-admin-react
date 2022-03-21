/*
 * @Author: lei.liu
 * @Date: 2022-03-15 18:57:02
 */
import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { bizTypeMap } from '@src/config/mapData';
import { getKeywordDetail } from '@src/api';
const { TextArea } = Input;
const { Option } = Select;

interface EditType {
  dataId: number | undefined;
  visible: boolean;
  onCancel: () => void;
}

const initialValue = {
  bizType: '2',
  masterKey: '234',
  similarKeys: '',
  distortedKeys: ''
};

function EditModal(props: EditType) {
  const [form] = Form.useForm();
  const { visible, onCancel, dataId } = props;
  // const [initialValue, setInitialValue] = useState(initMap);

  const getDetail = async dataId => {
    const res = await getKeywordDetail(dataId);
    const { masterKey, bizType, similarKeys, distortedKeys } = res?.data?.data;
    return { masterKey, bizType, similarKeys, distortedKeys };
  };
  useEffect(() => {
    if (!dataId || !visible) return;
    const fun = async () => {
      const map = await getDetail(dataId);
      form.setFieldsValue(map);
    };
    fun();
  }, [dataId, visible]);
  console.log(initialValue, '[[[[');

  const cancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <Modal onCancel={cancel} title="编辑" width={500} visible={visible}>
      <Form
        initialValues={initialValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="masterKey" label="关键词">
          <Input placeholder="请输入一个主关键词"></Input>
        </Form.Item>
        <Form.Item name="similarKeys" label="近义词">
          <TextArea placeholder="请输入主关键词的近义词"></TextArea>
        </Form.Item>
        <Form.Item name="distortedKeys" label="变形词">
          <TextArea placeholder="请输入主关键词的变形词"></TextArea>
        </Form.Item>
        <Form.Item name="bizType" label="类型">
          <Select>
            {(Object.keys(bizTypeMap) || []).map(item => (
              <Option key={item} value={item}>
                {bizTypeMap[item]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditModal;
