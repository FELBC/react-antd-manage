import React from 'react';
import { Card, Row, Col, Modal } from 'antd';

export default class Gallery extends React.Component{

    state={
        visible:false
    }

    openGallery = (imgSrc) => {
        this.setState({
            visible:true,
            currentImg:'/gallery/' + imgSrc
        });
    }

    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png'],
            ['5.png','6.png','7.png','8.png'],
            ['9.png','10.png','11.png','12.png'],
            ['13.png','14.png','15.png','16.png'],
            ['17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png']
        ];
        const imgList = imgs.map((list) => list.map((item,index) =>
            <Card
                key={index}
                style={{marginBottom:10}}
                cover={<img alt="" src={'/gallery/' + item} onClick={() => this.openGallery(item)} />}
            >
                <Card.Meta 
                    title="React"    
                    description="react 学习"
                />
            </Card>
        ));
        return(
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col span={4}>
                        {imgList[0]}
                    </Col>
                    <Col span={4}>
                        {imgList[1]}
                    </Col>
                    <Col span={4}>
                        {imgList[2]}
                    </Col>
                    <Col span={4}>
                        {imgList[3]}
                    </Col>
                    <Col span={4}>
                        {imgList[4]}
                    </Col>
                    <Col span={4}>
                        {imgList[5]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    onOk={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    <img 
                        src={this.state.currentImg} 
                        alt="" 
                        style={{width:'100%'}}    
                    />
                </Modal>
            </div>
        );
    }
}