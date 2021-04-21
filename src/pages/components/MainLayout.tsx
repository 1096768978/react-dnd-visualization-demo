import {
  Col,
  Input,
  Layout,
  Row,
  Select,
  Menu,
  message,
  Button,
  Radio,
  Checkbox,
  Collapse,
  Upload,
} from 'antd';
import {
  QrcodeOutlined,
  FontSizeOutlined,
  PictureOutlined,
  BarcodeOutlined,
  BorderOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  CaretRightOutlined,
  RedoOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '@/pages/localFiles/ItemTypes';
import Box from './Box';
import DictionaryCard from './DictionaryCard';
import './MainLayout.less';

const { Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const MainLayout = (props: any) => {
  const {
    cardList,
    setCardList,
    canvasWidth,
    canvasHeight,
    canvasMargin,
    canvasBorderWidth,
    setCanvasWidth,
    setCanvasHeight,
    setCanvasMargin,
    setCanvasBorderWidth,
    count,
    setCount,
  } = props;
  //导航栏的属性
  const [barType] = useState([
    { name: '页面', key: 'page' },
    { name: '组件', key: 'component' },
  ]);
  const [currentBar, setCurrentBar] = useState<string>('page');
  const [dictionaryList, setDictionaryList] = useState([]);
  const [currentImgUrl, setCurrentImgUrl] = useState('');
  const [initFlag, setInitFlag] = useState(false);
  //当前被选中的盒子的属性
  const [currentBox, setCurrentBox] = useState({
    type: '',
    info: '',
    left: 0,
    top: 0,
    justify: '',
    align: '',
    fontStyle: [],
    wrap: '',
    fontSize: '',
    width: '',
    height: '',
    borderWidth: '',
    radius: '',
    field: '',
    fieldVisible: false,
    borderVisible: [],
  });

  const [, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.BOX,
    item: {
      type: ItemTypes.BOX,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragImg] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.IMG,
    item: {
      type: ItemTypes.IMG,
    },
    // begin: (mintor) => {
    //   setCurrentImgUrl('');
    //   return { type: ItemTypes.IMG };
    // },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        document.getElementById('btn_file').click();
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragBarCode] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.BARCODE,
    item: {
      type: ItemTypes.BARCODE,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragQrCode] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.QRCODE,
    item: {
      type: ItemTypes.QRCODE,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragSquare] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.SQUARE,
    item: {
      type: ItemTypes.SQUARE,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragEllipse] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.ELLIPSE,
    item: {
      type: ItemTypes.ELLIPSE,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [, dragDiamond] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type:ItemTypes.DIAMOND,
    item: {
      type: ItemTypes.DIAMOND,
    },
    end: (item, monitor: any) => {
      if (monitor.didDrop()) {
        setCardList([...cardList, { ...monitor.getDropResult() }]);
        setCount(count + 1);
      } else {
        message.error('未放置到正确位置');
      }
    },
  });
  const [collectDrop, drop] = useDrop({
    accept: [...Object.values(ItemTypes)],
    drop: (item, monitor) => {
      const delta = monitor.getSourceClientOffset();
      // console.log(delta,'delta',monitor.getDropResult())
      const boxLeft = document.getElementById('xbox').offsetLeft;
      const boxTop = document.getElementById('xbox').offsetTop;
      const boxScrollLeft =
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        window.pageXOffset;
      const boxScrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      // console.log(boxLeft,boxTop,boxScrollLeft,boxScrollTop,'-----')
      return {
        id: count,
        type: item.type,
        left: delta.x - boxLeft + boxScrollLeft,
        top: delta.y - boxTop + boxScrollTop,
        isSelect: false,
        info: 'default',
        dictionaryInfo: item.dictionaryText,
        justify: 'flex-start',
        align: 'flex-start',
        fontStyle: [],
        wrap: false,
        fontSize: 14,
        width: item.type === 'img' ? 180 : 150,
        height: item.type === 'img' ? 108 : 36,
        borderWidth: 1,
        radius: 50,
        field: item.dictionaryField || '',
        fieldVisible: item.dictionaryField ? true : false,
        borderVisible: ['top', 'left', 'bottom', 'right'],
        imgUrl: currentImgUrl || '',
      };
    },
  });

  const actionChangeBorderWidth = (value: string) => {
    setCanvasBorderWidth(value ? Number(value) : 0);
  };

  const actionChangeMargin = (value: string) => {
    setCanvasMargin(value ? Number(value) : 0);
  };

  const handleClick = (e: string) => {
    setCurrentBar(e.key);
  };

  const optionChange = (value) => {
    if (value === '1') {
      cardTools('field', false);
    } else if (value === '2') {
      cardTools('field', true);
    }
  };

  const dictionaryChange = (value) => {
    cardTools('textBySelect', value);
  };

  const propsIn = {
    onChange: (info: any) => {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: any) => {
      return false;
    },
  };

  //bar的子页面分离--页面
  const pageBarDetail = () => {
    return (
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Row gutter={20} align={'middle'}>
            <Col span={6}>标签边距:</Col>
            <Col span={18}>
              <Input
                addonAfter={'mm'}
                value={canvasMargin}
                onChange={(event) => actionChangeMargin(event.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={20} align={'middle'}>
            <Col span={6}>边框宽度:</Col>
            <Col span={18}>
              <Input
                addonAfter={'mm'}
                value={canvasBorderWidth}
                onChange={(event) =>
                  actionChangeBorderWidth(event.target.value)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  //bar的子页面分离--组件
  const componentBarDetail = () => {
    return (
      <>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="基本组件"
            key="1"
            className="site-collapse-custom-panel"
          >
            <div ref={drag}>
              <FontSizeOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              普通文本
            </div>
            <div ref={dragImg}>
              <PictureOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              图片
            </div>
          </Panel>
          <Panel header="条码" key="2" className="site-collapse-custom-panel">
            <div ref={dragBarCode}>
              <BarcodeOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              条码
            </div>
            <div ref={dragQrCode}>
              <QrcodeOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              二维码
            </div>
          </Panel>
          <Panel header="形状" key="3" className="site-collapse-custom-panel">
            <div ref={dragSquare}>
              <BorderOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              圆角矩形
            </div>
            <div ref={dragEllipse}>
              <RedoOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              椭圆
            </div>
            <div ref={dragDiamond}>
              <RadarChartOutlined
                style={{ fontSize: '18px', padding: '15px 10px' }}
              />
              菱形
            </div>
          </Panel>
        </Collapse>
        <Upload {...propsIn} style={{ display: 'none' }} showUploadList={false}>
          <button id="btn_file" style={{ display: 'none' }} />
        </Upload>
      </>
    );
  };
  //bar的子页面分离--字典
  const dictionaryBarDetail = () => {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel header="默认分组" key="1" className="site-collapse-custom-panel">
          {dictionaryList.map((item, index) => (
            <DictionaryCard
              item={item}
              key={index}
              index={index}
              length={dictionaryList.length}
              cardList={cardList}
              setCardList={setCardList}
              count={count}
              setCount={setCount}
            />
          ))}
        </Panel>
      </Collapse>
    );
  };
  //右侧边栏逻辑分离
  const rightBarDetail = () => {
    return (
      initFlag && (
        <Row gutter={[0, 10]} justify={'center'}>
          <Col span={20}>x轴坐标：</Col>
          <Col span={20}>
            <Input
              placeholder="请在此输入x轴坐标"
              value={currentBox.left}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, left: Number(e.target.value) })
              }
              onBlur={() => {
                cardTools('left');
              }}
            />
          </Col>
          <Col span={20}>y轴坐标：</Col>
          <Col span={20}>
            <Input
              placeholder="请在此输入y轴坐标"
              value={currentBox.top}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, top: Number(e.target.value) })
              }
              onBlur={() => {
                cardTools('top');
              }}
            />
          </Col>
          {Boolean(
            currentBox.type === 'box' ||
              currentBox.type === 'barCode' ||
              currentBox.type === 'qrCode' ||
              currentBox.type === 'dictionary',
          ) && (
            <>
              <Col span={20}>
                <Select
                  style={{ width: '100%' }}
                  value={currentBox.fieldVisible ? '2' : '1'}
                  onChange={optionChange}
                >
                  <Option value={'1'}>自定义文本</Option>
                  <Option value={'2'}>关联字段</Option>
                </Select>
              </Col>
              <Col span={20}>
                {currentBox.fieldVisible ? (
                  <Select
                    style={{ width: '100%' }}
                    onChange={dictionaryChange}
                    value={currentBox.field}
                  >
                    {dictionaryList.map((item, index) => (
                      <Option value={item.field} key={index}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <TextArea
                    rows={2}
                    onChange={(e) => {
                      cardTools('text', e);
                    }}
                    value={currentBox.info || ''}
                  />
                )}
              </Col>
            </>
          )}
          {Boolean(
            currentBox.type === 'box' || currentBox.type === 'dictionary',
          ) && (
            <>
              <Col span={20}>文本格式：</Col>
              <Col span={20}>
                <Button type={'primary'} block={true}>
                  常规
                </Button>
              </Col>
              <Col span={20}>内容水平位置：</Col>
              <Col>
                <Radio.Group
                  value={currentBox.justify}
                  onChange={(e) => {
                    cardTools('justify', e);
                  }}
                >
                  <Radio.Button value="flex-start">居左</Radio.Button>
                  <Radio.Button value="center">居中</Radio.Button>
                  <Radio.Button value="flex-end">居右</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={20}>内容垂直位置：</Col>
              <Col>
                <Radio.Group
                  value={currentBox.align}
                  onChange={(e) => {
                    cardTools('align', e);
                  }}
                >
                  <Radio.Button value="flex-start">居上</Radio.Button>
                  <Radio.Button value="center">居中</Radio.Button>
                  <Radio.Button value="flex-end">居下</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={20}>字体样式：</Col>
              <Col span={20}>
                <BoldOutlined
                  style={{
                    fontSize: 20,
                    backgroundColor: currentBox.fontStyle.includes(1)
                      ? '#22c0b7'
                      : '',
                    marginRight: 10,
                  }}
                  onClick={() => {
                    cardTools('fontStyle', 1);
                  }}
                />
                <ItalicOutlined
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    backgroundColor: currentBox.fontStyle.includes(2)
                      ? '#22c0b7'
                      : '',
                  }}
                  onClick={() => {
                    cardTools('fontStyle', 2);
                  }}
                />
                <UnderlineOutlined
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    backgroundColor: currentBox.fontStyle.includes(3)
                      ? '#22c0b7'
                      : '',
                  }}
                  onClick={() => {
                    cardTools('fontStyle', 3);
                  }}
                />
                <StrikethroughOutlined
                  style={{
                    fontSize: 20,
                    backgroundColor: currentBox.fontStyle.includes(4)
                      ? '#22c0b7'
                      : '',
                  }}
                  onClick={() => {
                    cardTools('fontStyle', 4);
                  }}
                />
              </Col>
              <Col span={20}>
                <Checkbox
                  onChange={() => {
                    cardTools('wrap');
                  }}
                  defaultChecked={currentBox.wrap}
                >
                  是否换行
                </Checkbox>
              </Col>
              <Col span={20}>字体大小：</Col>
              <Col span={20}>
                <Input
                  placeholder="请在此输入字体大小"
                  value={currentBox.fontSize}
                  onChange={(e) =>
                    setCurrentBox({ ...currentBox, fontSize: e.target.value })
                  }
                  onBlur={() => {
                    cardTools('fontSize');
                  }}
                />
              </Col>
            </>
          )}
          {Boolean(currentBox.type === 'square') && (
            <>
              <Col span={20}>圆角度数：</Col>
              <Col span={20}>
                <Input
                  placeholder="请在此输入圆角度数"
                  value={currentBox.radius}
                  onChange={(e) =>
                    setCurrentBox({ ...currentBox, radius: e.target.value })
                  }
                  onBlur={() => {
                    cardTools('radius');
                  }}
                />
              </Col>
            </>
          )}
          <Col span={20}>宽度(mm)：</Col>
          <Col span={20}>
            <Input
              placeholder="请在此输入宽度"
              value={currentBox.width}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, width: e.target.value })
              }
              onBlur={() => {
                cardTools('width');
              }}
            />
          </Col>
          <Col span={20}>高度(mm)：</Col>
          <Col span={20}>
            <Input
              disabled={Boolean(currentBox.type === 'qrCode')}
              placeholder="请在此输入高度"
              value={currentBox.height}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, height: e.target.value })
              }
              onBlur={() => {
                cardTools('height');
              }}
            />
          </Col>
          <Col span={20}>边框宽度：</Col>
          <Col span={20}>
            <Input
              placeholder="请在此输入边框宽度"
              value={currentBox.borderWidth}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, borderWidth: e.target.value })
              }
              onBlur={() => {
                cardTools('borderWidth');
              }}
            />
          </Col>
          <Col span={20}>边框：</Col>
          <Col span={20}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    currentBox.borderVisible.length === 4 ? '#22c0b7' : '',
                }}
                onClick={() => {
                  cardTools('borderVisible', 'on');
                }}
              >
                <div
                  style={{ width: 20, height: 20, border: '3px solid #000' }}
                />
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRight: '2px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    currentBox.borderVisible.length === 0 ? '#22c0b7' : '',
                  margin: '0 3px',
                }}
                onClick={() => {
                  cardTools('borderVisible', 'off');
                }}
              >
                <div
                  style={{ width: 20, height: 20, border: '1px solid #000' }}
                />
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: currentBox.borderVisible.includes('top')
                    ? '#22c0b7'
                    : '',
                }}
                onClick={() => {
                  cardTools('borderVisible', 'top');
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: '1px solid #000',
                    borderTop: '3px solid #000',
                  }}
                />
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: currentBox.borderVisible.includes('bottom')
                    ? '#22c0b7'
                    : '',
                  margin: '0 3px',
                }}
                onClick={() => {
                  cardTools('borderVisible', 'bottom');
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: '1px solid #000',
                    borderBottom: '3px solid #000',
                  }}
                />
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: currentBox.borderVisible.includes('left')
                    ? '#22c0b7'
                    : '',
                  marginRight: 3,
                }}
                onClick={() => {
                  cardTools('borderVisible', 'left');
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: '1px solid #000',
                    borderLeft: '3px solid #000',
                  }}
                />
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: currentBox.borderVisible.includes('right')
                    ? '#22c0b7'
                    : '',
                }}
                onClick={() => {
                  cardTools('borderVisible', 'right');
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: '1px solid #000',
                    borderRight: '3px solid #000',
                  }}
                />
              </div>
            </div>
          </Col>
          <Col span={20}>
            <Button
              type="primary"
              danger={true}
              onClick={() => {
                cardTools('delete');
              }}
            >
              删除元素
            </Button>
          </Col>
        </Row>
      )
    );
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    //37，38，39，40
    if (e.keyCode === 37) {
      setCurrentBox({ ...currentBox, left: currentBox.left - 1 });
      cardTools('left');
    } else if (e.keyCode === 38) {
      setCurrentBox({ ...currentBox, top: currentBox.top - 1 });
      cardTools('top');
    } else if (e.keyCode === 39) {
      setCurrentBox({ ...currentBox, left: currentBox.left + 1 });
      cardTools('left');
    } else if (e.keyCode === 40) {
      setCurrentBox({ ...currentBox, top: currentBox.top + 1 });
      cardTools('top');
    }
  };

  const selectCard = useCallback(() => {
    //对于被选中的dom做出判断
    if (cardList.filter((item) => item.isSelect === true).length === 0) {
      return false;
    } else {
      return true;
    }
  }, [cardList]);

  const cardTools = (type, e) => {
    let deepCopy = JSON.parse(JSON.stringify(cardList));
    let id = deepCopy.filter((item) => item.isSelect === true)[0].id;
    let idx = deepCopy.findIndex((i) => i.id === id);
    if (type === 'text') {
      //只能选中一个盒子更改，所以其实只需要关注当前盒子的属性即可
      deepCopy[idx].info = e.target.value;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, info: e.target.value });
    } else if (type === 'justify') {
      deepCopy[idx].justify = e.target.value;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, justify: e.target.value });
    } else if (type === 'align') {
      deepCopy[idx].align = e.target.value;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, align: e.target.value });
    } else if (type === 'fontStyle') {
      if (currentBox.fontStyle.includes(e)) {
        let index = currentBox.fontStyle.indexOf(e);
        let temp = JSON.parse(JSON.stringify(currentBox.fontStyle));
        temp.splice(index, 1);
        deepCopy[idx].fontStyle = temp;
        setCardList(deepCopy);
        setCurrentBox({ ...currentBox, fontStyle: temp });
      } else {
        let temp = JSON.parse(JSON.stringify(currentBox.fontStyle));
        temp.push(e);
        deepCopy[idx].fontStyle = temp;
        setCardList(deepCopy);
        setCurrentBox({ ...currentBox, fontStyle: temp });
      }
    } else if (type === 'wrap') {
      deepCopy[idx].wrap = !deepCopy[idx].wrap;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, wrap: !deepCopy[idx].wrap });
    } else if (type === 'fontSize') {
      deepCopy[idx].fontSize = currentBox.fontSize;
      setCardList(deepCopy);
    } else if (type === 'width') {
      deepCopy[idx].width = currentBox.width * 6;
      setCardList(deepCopy);
    } else if (type === 'height') {
      deepCopy[idx].height = currentBox.height * 6;
      setCardList(deepCopy);
    } else if (type === 'borderWidth') {
      deepCopy[idx].borderWidth = currentBox.borderWidth;
      setCardList(deepCopy);
    } else if (type === 'delete') {
      deepCopy.splice(idx, 1);
      setCardList(deepCopy);
    } else if (type === 'radius') {
      deepCopy[idx].radius = currentBox.radius;
      setCardList(deepCopy);
    } else if (type === 'textBySelect') {
      let str = dictionaryList.find((item) => item.field === e).name;
      deepCopy[idx].field = e;
      deepCopy[idx].dictionaryInfo = str;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, field: e, dictionaryInfo: str });
    } else if (type === 'field') {
      deepCopy[idx].fieldVisible = e;
      setCardList(deepCopy);
      setCurrentBox({ ...currentBox, fieldVisible: e });
    } else if (type === 'borderVisible') {
      if (e === 'on') {
        deepCopy[idx].borderVisible = ['top', 'left', 'bottom', 'right'];
        setCardList(deepCopy);
        setCurrentBox({
          ...currentBox,
          borderVisible: ['top', 'left', 'bottom', 'right'],
        });
      } else if (e === 'off') {
        deepCopy[idx].borderVisible = [];
        setCardList(deepCopy);
        setCurrentBox({ ...currentBox, borderVisible: [] });
      } else {
        if (currentBox.borderVisible.includes(e)) {
          let index = currentBox.borderVisible.findIndex((i) => i === e);
          let temp = JSON.parse(JSON.stringify(currentBox.borderVisible));
          temp.splice(index, 1);
          deepCopy[idx].borderVisible = temp;
          setCardList(deepCopy);
          setCurrentBox({ ...currentBox, borderVisible: temp });
        } else {
          let temp = JSON.parse(JSON.stringify(currentBox.borderVisible));
          temp.push(e);
          deepCopy[idx].borderVisible = temp;
          setCardList(deepCopy);
          setCurrentBox({ ...currentBox, borderVisible: temp });
        }
      }
    } else if (type === 'left') {
      deepCopy[idx].left = currentBox.left;
      setCardList(deepCopy);
    } else if (type === 'top') {
      deepCopy[idx].top = currentBox.top;
      setCardList(deepCopy);
    }
  };

  return (
    <Layout>
      <Sider theme="light">
        <Menu
          onClick={(e) => handleClick(e)}
          selectedKeys={[currentBar]}
          mode="horizontal"
          style={{ marginBottom: 10 }}
        >
          {barType.map((item) => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>
        {currentBar === 'page'
          ? pageBarDetail()
          : currentBar === 'component'
          ? componentBarDetail()
          : dictionaryBarDetail()}
      </Sider>
      <Content>
        <div
          style={{
            background: '#fff',
            margin: '20px',
            padding: canvasMargin,
          }}
        >
          <div
            style={{
              width: `${canvasWidth}%`,
              height: canvasHeight,
              border: `${canvasBorderWidth}px solid #000000`,
              position: 'relative',
            }}
            ref={drop}
            id="xbox"
          >
            {cardList.map((item, index) => (
              <Box
                key={index}
                item={item}
                cardList={cardList}
                setCardList={setCardList}
                currentBox={currentBox}
                setCurrentBox={setCurrentBox}
                initFlag={initFlag}
                setInitFlag={setInitFlag}
                handleKeyDown={handleKeyDown}
              />
            ))}
          </div>
        </div>
      </Content>
      <Sider theme="light">{selectCard() ? rightBarDetail() : ''}</Sider>
    </Layout>
  );
};

export default MainLayout;
