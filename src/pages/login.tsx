import React, { Component, createRef, RefObject } from 'react'
import { Form, FormInstance, Input, Button, Space, message } from 'antd';
import { set } from '../utils/storage';
import { login } from '../api/login';
import '../static/css/login.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class LoginPage extends Component {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context);
        this.formRef = createRef<FormInstance>();
    }

    goLogin = (form: any) => {
        login(form.name, form.password).then(response => {
            const { code, msg, data } = response.data;
            if (code === 0) {
                set("token", data.token);
                window.location.href = "/";
                message.success(msg);
            } else {
                message.error(msg);
            }
        })
    }

    render() {
        return (
            <>
                <Form
                    id="loginForm"
                    {...layout}
                    ref={this.formRef}
                    onFinish={this.goLogin}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            {
                                type: "string",
                                required: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                type: "string",
                                required: true
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Button htmlType="reset">
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default LoginPage;
