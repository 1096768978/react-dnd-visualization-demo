import { message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from '@/pages/localFiles/ItemTypes';

//该组件为了解决多个div绑定同一个drag失效的问题
const DictionaryCard = (props: any) => {
  const { item, cardList, setCardList, count, setCount, index, length } = props;
  const [, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      type: ItemTypes.DICTIONARY,
    },
    begin: (mintor) => {
      return {
        type: ItemTypes.DICTIONARY,
        dictionaryText: item.name,
        dictionaryField: item.field,
      };
    },
    end: (i, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  return (
    <div
      ref={drag}
      style={{
        fontSize: 14,
        height: 40,
        borderTop: '1px solid #ccc',
        borderBottom: length - 1 === index ? '1px solid #ccc' : '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      <div>{item.name}</div>
    </div>
  );
};

export default DictionaryCard;
