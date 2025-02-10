import React, { useState, useEffect } from 'react';
import Nav from '../../../widget/nav';
import IconNavComponent from '../../../widget/iconNavComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useTheme } from '../../../components/themeProvider';
import useConfig from "../../../utils/useConfig";
import AOS from "aos";


const Home = () => {
    const [avatar, setAvatar] = useState('');
    const [hoveredAvatar, setHoveredAvatar] = useState('');
    const [defaultAvatar, setDefaultAvatar] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [field, setField] = useState('');
    const [profile, setProfile] = useState('');
    const [isMobile, setIsMobile] = useState(false); // 用来判断是否为手机屏幕
    const { isDarkMode } = useTheme();
    const { configValue: quote,error,loading } = useConfig('pages.home.quote');



    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次

        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');
                const data = await response.json();
                setAvatar(data.pages.home.avatar.init);
                setDefaultAvatar(data.pages.home.avatar.init); // 保存默认头像
                setHoveredAvatar(data.pages.home.avatar.hovered); // 保存悬停头像
                setName(data.pages.home.name);
                setInstitution(data.pages.home.institution);
                setField(data.pages.home.field);
                setProfile(data.pages.home.profile);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };
        fetchConfig();
    }, []);


    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 假设 768px 以内为手机设备
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始时判断一次

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 设置card的样式
    const cardStyles = {
        background: "inherit",
        color: isDarkMode ? '#ffffff' : '#000000',
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`, // 卡片边框
        borderRadius: '10px', // 可选圆角
        padding: '20px', // 内边距
        width: '100%', // 卡片填充整个Col
        height: '100%',
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)' // 深色模式下的阴影
            : '0 8px 12px rgba(0, 0, 0, 0.5)', // 浅色模式下的阴影
    };

    if (error){
        return <div>Loading homeConfiguration error: {error}</div>
    }

    if (loading){
        return <div>Loading...</div>
    }

    return (
        <Container
            id="#home"
            className="d-flex flex-column justify-content-evenly align-items-center"
            style={{ minHeight: '100vh'}}
        >
            <Row className="d-flex flex-column flex-md-row align-items-center justify-content-center text-center w-100" style={{marginBottom: "50px"}} data-aos="zoom-in">
                {/* 图片和文字区域 */}
                <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center g-3 mb-4 mb-md-0">
                    <Image
                        src={avatar}
                        alt="avatar"
                        className="img-fluid rounded-circle mb-3"
                        style={{
                            width: '400px', // 在移动端缩小头像尺寸
                            height: '400px',
                            objectFit: 'cover',
                        }}
                        onMouseEnter={() => setAvatar(hoveredAvatar)} // 鼠标悬停切换头像
                        onMouseLeave={() => setAvatar(defaultAvatar)} // 鼠标移开恢复默认头像
                        onClick={isMobile ? () => setAvatar(avatar === defaultAvatar ? hoveredAvatar : defaultAvatar) : null}
                    />
                    <h2 className="mt-3">{name}</h2>
                    <h3>{institution}</h3>
                    <p id="field">{field}</p>
                    <IconNavComponent />
                    <Nav style={{ marginBottom: 0, padding: 0 }} />
                </Col>

                {/* About Me 区域 */}
                <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center">
                    <Card style={{ ...cardStyles, flexGrow: 1, padding: 5 }} className="mb-4" >
                        <Card.Body>
                            <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                <Image
                                    src="/img.png"
                                    className="img-fluid rounded-circle"
                                    style={{ width: '2rem', height: '2rem', objectFit: 'cover' }}
                                />
                                Hello, I'm MMeowhite!
                            </Card.Title>
                            <Card.Subtitle className="mt-2 mb-3" style={{ fontSize: '1rem' }}>
                                I'd like to say something...
                            </Card.Subtitle>
                            <Card.Text
                                className="text-start"
                                style={{
                                    fontSize: '1.3rem',
                                    lineHeight: '1.5',
                                    maxHeight: '400px', // 限制最大高度，出现滚动条
                                    overflowY: 'auto', // 垂直滚动条
                                }}
                            >
                                {profile}
                            </Card.Text>
                            <Card.Link href="/" style={{ fontSize: '1.1rem', marginRight: '10px', textDecoration: 'none' }}>
                                Learn More
                            </Card.Link>
                            <Card.Link href="/" style={{ fontSize: '1.1rem', textDecoration: 'none' }}>
                                Contact Me
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Quote 区域 */}
            <Row xs={12} md={6} className="justify-content-center w-100" style={{marginBottom: "100px"}} data-aos="fade-up">
                <Card style={cardStyles}>
                    <Card.Header style={{
                        borderBottom: `1px solid ${isDarkMode ? '#cccccc' : '#444444'}`,
                        boxShadow: isDarkMode
                            ? '0 8px 12px rgba(255, 255, 255, 0.1)' // 深色模式下的阴影
                            : '0 8px 12px rgba(0, 0, 0, 0.1)'}}>
                        Quote
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {quote ? quote : "please input your own quote"}
                            </p>
                            <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Row>


        </Container>
    );
};

export default Home;
