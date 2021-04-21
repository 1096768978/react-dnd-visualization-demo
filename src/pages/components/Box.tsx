//这里存放真实渲染的盒子
//id表示盒子的唯一标示
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { message } from 'antd';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';

const Box = (props: any) => {
  const {
    item,
    cardList,
    setCardList,
    currentBox,
    setCurrentBox,
    initFlag,
    setInitFlag,
    handleKeyDown,
  } = props;
  const [collectDrag, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: item.type,
    item: {
      type: item.type,
    },
    end: (i, monitor: any) => {
      if (monitor.didDrop()) {
        //已经放到drop上的盒子平移动只改变x,y坐标
        let deepCopy = JSON.parse(JSON.stringify(cardList));
        let findIndex = deepCopy.findIndex((j) => j.id === item.id);
        deepCopy[findIndex].top = monitor.getDropResult().top;
        deepCopy[findIndex].left = monitor.getDropResult().left;
        setCardList(deepCopy);
        setCurrentBox({
          ...currentBox,
          left: deepCopy[findIndex].left,
          top: deepCopy[findIndex].top,
        });
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  //普通盒子的属性
  const style: React.CSSProperties = useMemo(
    () => ({
      display: 'flex',
      position: 'absolute',
      top: item.top,
      left: item.left,
      width: Number(item.width),
      height: Number(item.height),
      cursor: 'move',
      borderWidth:
        item.borderVisible.length === 4
          ? `${Number(item.borderWidth)}px`
          : item.borderVisible.length === 0
          ? `0px`
          : `${
              item.borderVisible.includes('top') ? Number(item.borderWidth) : 0
            }px ${
              item.borderVisible.includes('right')
                ? Number(item.borderWidth)
                : 0
            }px ${
              item.borderVisible.includes('bottom')
                ? Number(item.borderWidth)
                : 0
            }px ${
              item.borderVisible.includes('left') ? Number(item.borderWidth) : 0
            }px`,
      borderStyle: 'solid',
      borderColor: '#000',
      backgroundColor: item.isSelect && initFlag ? '#22c0b7' : '',
      justifyContent: item.justify,
      alignItems: item.align,
      flexWrap: item.wrap ? 'wrap' : 'nowrap',
      outline: 'none',
    }),
    [item],
  );
  //条码和二维码
  const styleQRCode: React.CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      top: item.top,
      left: item.left,
      width: Number(item.width),
      height:
        item.type === 'qrCode' ? Number(item.width) : Number(item.height * 2.2), //二维码始终为正方形宽高保持一致
      cursor: 'move',
      borderWidth:
        item.borderVisible.length === 4
          ? `${Number(item.borderWidth)}px`
          : item.borderVisible.length === 0
          ? `0px`
          : `${
              item.borderVisible.includes('top') ? Number(item.borderWidth) : 0
            }px ${
              item.borderVisible.includes('right')
                ? Number(item.borderWidth)
                : 0
            }px ${
              item.borderVisible.includes('bottom')
                ? Number(item.borderWidth)
                : 0
            }px ${
              item.borderVisible.includes('left') ? Number(item.borderWidth) : 0
            }px`,
      borderStyle: 'solid',
      borderColor: '#000',
      outline: 'none',
    }),
    [item],
  );

  const styleText: React.CSSProperties = useMemo(
    () => ({
      maxWidth: '100%',
      maxHeight: '100%',
      fontWeight: item.fontStyle.includes(1) ? 'bold' : '',
      fontStyle: item.fontStyle.includes(2) ? 'italic' : '',
      textDecoration:
        item.fontStyle.includes(3) && item.fontStyle.includes(4)
          ? 'underline line-through'
          : item.fontStyle.includes(3)
          ? 'underline'
          : item.fontStyle.includes(4)
          ? 'line-through'
          : '',
      fontSize: Number(item.fontSize),
      overflow: 'hidden',
      whiteSpace: item.wrap ? 'pre-line' : 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
    }),
    [item],
  );

  const selectDom = (type) => {
    //当选中某个盒子时，执行读取该盒子属性的操作
    setCurrentBox({
      type: type,
      info: item.info,
      left: item.left,
      top: item.top,
      justify: item.justify,
      align: item.align,
      fontStyle: item.fontStyle,
      wrap: item.wrap,
      fontSize: item.fontSize,
      width: item.width / 6,
      height: item.height / 6,
      borderWidth: item.borderWidth,
      radius: item.radius,
      field: item.field, //关联字段
      fieldVisible: item.fieldVisible, //关联字段显示的逻辑
      borderVisible: item.borderVisible, //自定义边框
      imgUrl: item.imgUrl,
    });
    let deepCopy = JSON.parse(JSON.stringify(cardList));
    //将之前的选择全部重置
    deepCopy.forEach((item) => (item.isSelect = false));
    //通过id来查找对象而不是index
    let findObj = deepCopy.find((i) => i.id === item.id);
    let findIndex = deepCopy.findIndex((i) => i.id === item.id);
    findObj.isSelect = !findObj.isSelect;
    deepCopy.splice(findIndex, 1);
    deepCopy.push(findObj);
    setCardList(deepCopy);
    setInitFlag(true);
  };
  //对不同类型的盒子进行分类判断，在此返回不同类型的dom结构
  const typeReducer = (type) => {
    if (type === 'box' || type === 'dictionary') {
      return (
        <div
          style={style}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div style={styleText}>
            {item.fieldVisible ? item.dictionaryInfo : item.info}
          </div>
        </div>
      );
    } else if (type === 'img') {
      return (
        <div
          style={{
            width: Number(item.width),
            height: Number(item.height),
            cursor: 'move',
            borderWidth:
              item.borderVisible.length === 4
                ? `${Number(item.borderWidth)}px`
                : item.borderVisible.length === 0
                ? `0px`
                : `${
                    item.borderVisible.includes('top')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('right')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('bottom')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('left')
                      ? Number(item.borderWidth)
                      : 0
                  }px`,
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: item.isSelect && initFlag ? '#22c0b7' : '',
            position: 'absolute',
            top: item.top,
            left: item.left,
            outline: 'none',
          }}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            style={{
              //注意100%和px图片尺寸的不同
              width: '100%',
              height: '100%',
              backgroundImage: `url("${item.imgUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      );
    } else if (type === 'barCode') {
      return (
        <div
          style={styleQRCode}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <Barcode
            value={item.info}
            width={Number(item.width / 100)}
            height={Number(item.height)}
          />
        </div>
      );
    } else if (type === 'qrCode') {
      return (
        <div
          style={styleQRCode}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <QRCode
            id="qrCode"
            value={item.info}
            size={Number(item.width)} // 二维码的大小
            fgColor="#000000" // 二维码的颜色
            style={{ margin: 'auto' }}
          />
        </div>
      );
    } else if (type === 'square') {
      return (
        <div
          style={{
            width: Number(item.width),
            height: Number(item.width),
            borderRadius: `${Number(item.radius - 40)}px`,
            cursor: 'move',
            borderWidth:
              item.borderVisible.length === 4
                ? `${Number(item.borderWidth)}px`
                : item.borderVisible.length === 0
                ? `0px`
                : `${
                    item.borderVisible.includes('top')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('right')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('bottom')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('left')
                      ? Number(item.borderWidth)
                      : 0
                  }px`,
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: item.isSelect && initFlag ? '#22c0b7' : '',
            position: 'absolute',
            top: item.top,
            left: item.left,
            outline: 'none',
          }}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      );
    } else if (type === 'ellipse') {
      return (
        <div
          style={{
            width: Number(item.width),
            height: Number(item.width * 0.75),
            borderRadius: `${Number(item.radius)}%`,
            cursor: 'move',
            borderWidth:
              item.borderVisible.length === 4
                ? `${Number(item.borderWidth)}px`
                : item.borderVisible.length === 0
                ? `0px`
                : `${
                    item.borderVisible.includes('top')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('right')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('bottom')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('left')
                      ? Number(item.borderWidth)
                      : 0
                  }px`,
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: item.isSelect && initFlag ? '#22c0b7' : '',
            position: 'absolute',
            top: item.top,
            left: item.left,
            outline: 'none',
          }}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      );
    } else if (type === 'diamond') {
      return (
        <div
          style={{
            width: Number(item.width),
            height: Number(item.width),
            cursor: 'move',
            borderWidth:
              item.borderVisible.length === 4
                ? `${Number(item.borderWidth)}px`
                : item.borderVisible.length === 0
                ? `0px`
                : `${
                    item.borderVisible.includes('top')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('right')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('bottom')
                      ? Number(item.borderWidth)
                      : 0
                  }px ${
                    item.borderVisible.includes('left')
                      ? Number(item.borderWidth)
                      : 0
                  }px`,
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: item.isSelect && initFlag ? '#22c0b7' : '',
            position: 'absolute',
            top: item.top,
            left: item.left,
            textAlign: 'center',
            transform: [`rotateZ(${45}deg)`],
            outline: 'none',
          }}
          ref={drag}
          onClick={() => selectDom(type)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      );
    }
  };

  return typeReducer(item.type);
};

export default Box;
