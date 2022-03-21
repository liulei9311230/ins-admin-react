/*
 * @Author: lei.liu
 * @Date: 2022-03-14 17:03:24
 */
import { useState, useEffect } from 'react';
import { Input, Popover, Tree } from 'antd';
import { getTreeData } from '@src/api';
const { Search } = Input;

function ProductTree() {
  const [visible, setVisible] = useState(false);
  const [treeData, setTreeData] = useState<Array<DataNode>>([]);
  // const [expandedKeys] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const handleVisibleChange = visible => setVisible(visible);

  interface DataNode {
    key: string;
    title: string;
    children?: Array<DataNode>;
  }

  let level: number = 0;
  const handleData = (map, dataArr: Array<DataNode> = []) => {
    level = level + 1;
    for (let key in map) {
      const value = map[key];
      let obj: DataNode = {
        key: `${key}${level}`,
        title: key,
        children: []
      };
      dataArr.push(obj);
      if (!Array.isArray(value)) {
        handleData(value, obj.children);
      }
    }
    return dataArr;
  };

  useEffect(() => {
    getTreeData().then(res => {
      const data = res?.data?.data || {};
      const dataArr: DataNode[] = [];
      handleData(data, dataArr);
      setTreeData(dataArr);
      console.log(dataArr, '0000');
    });
  }, [searchValue]);

  const onChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const loop = data =>
    data.map(item => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#d84a1b' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key
      };
    });

  // console.log(loop(treeData), '99999999');
  const content = (
    <>
      <Search
        style={{ marginBottom: 10, width: 360 }}
        placeholder="Search"
        onChange={onChange}
      ></Search>
      <Tree
        style={{ maxHeight: 360, overflowY: 'auto' }}
        checkable
        // expandedKeys={expandedKeys}
        treeData={loop(treeData)}
      ></Tree>
    </>
  );

  return (
    <>
      <Popover
        visible={visible}
        placement="bottom"
        content={content}
        trigger="click"
        onVisibleChange={handleVisibleChange}
      >
        <Input placeholder="选择关联险种" readOnly />
      </Popover>
    </>
  );
}

export default ProductTree;
