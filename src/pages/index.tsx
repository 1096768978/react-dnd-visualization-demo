import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Input,
  Layout,
  PageHeader,
  Row,
  Select,
  Switch,
  Tag,
} from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import MainLayout from '@/pages/components/MainLayout';

const Detail = (props: any) => {
  //真实渲染的盒子信息
  const [cardList, setCardList] = useState<any>([]);
  const [count, setCount] = useState(0);
  //画布属性
  const [canvasWidth, setCanvasWidth] = useState(80);
  const [canvasHeight, setCanvasHeight] = useState(50);
  const [canvasMargin, setCanvasMargin] = useState<string | number | undefined>(
    0,
  );
  const [canvasBorderWidth, setCanvasBorderWidth] = useState<
    string | number | undefined
  >(0);

  return (
    <DndProvider backend={HTML5Backend}>
      <Row
        className={
          'content_margin-10 content-container_background-color content-container_padding-around-top-more'
        }
      >
        <Col span={24}>
          <PageHeader
            title="样品"
            className="site-page-header"
            extra={[
              <Button key="2">取消</Button>,
              <Button key="1" type="primary">
                保存
              </Button>,
            ]}
          >
            {/* 父组件不将props传递给子组件会导致子组件props为空 */}
            <MainLayout
              {...props}
              cardList={cardList}
              setCardList={setCardList}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              canvasMargin={canvasMargin}
              canvasBorderWidth={canvasBorderWidth}
              setCanvasWidth={setCanvasWidth}
              setCanvasHeight={setCanvasHeight}
              setCanvasMargin={setCanvasMargin}
              setCanvasBorderWidth={setCanvasBorderWidth}
              count={count}
              setCount={setCount}
            />
          </PageHeader>
        </Col>
      </Row>
    </DndProvider>
  );
};

export default Detail;
