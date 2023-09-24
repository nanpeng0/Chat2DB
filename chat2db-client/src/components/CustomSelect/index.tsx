import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';

interface IOption {
  label: string;
  value: string | number | null;
}

interface IProps {
  className?: string;
  options: IOption[];
  onChange?: any;
  value?: any;
}

const CustomSelect = memo<IProps>((props: IProps) => {
  const { options, onChange, value } = props;
  const [customOptions, setCustomOptions] = useState<IOption[]>([]);
  const [customValue, setCustomValue] = useState<string>();

  useEffect(() => {
    setCustomOptions([...options, { label: '', value: null }]);
  }, [options]);

  useEffect(() => {
    setCustomValue(value);
  }, [value]);

  // 1. 如果自定义的节点为null就过滤掉自定义节点
  // 2. 如果自定义节点的值和前面的节点的值相同就过滤掉自定义节点
  const filtrationCustomOptions = (list: IOption[]) => {
    const newList = [...list];
    const lastItem = newList[newList.length - 1];
    newList.forEach((item, index) => {
      if ((lastItem.value === item.value && index !== list.length - 1) || !item.value) {
        newList.pop();
      }
    });
    return newList;
  };

  const onSearch = (v: string) => {
    customOptions[customOptions.length - 1].label = v;
    customOptions[customOptions.length - 1].value = v;
    setCustomOptions([...customOptions]);
  };
  const customChange = (v: string) => {
    setCustomValue(v);
    onChange?.(v);
  };
  return (
    <Select
      allowClear
      onChange={customChange}
      value={customValue}
      showSearch
      onSearch={onSearch}
      options={filtrationCustomOptions(customOptions)}
    />
  );
});

export default CustomSelect;
