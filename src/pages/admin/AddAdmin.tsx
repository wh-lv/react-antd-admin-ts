import React, { Component, RefObject, createRef } from 'react';
import { Modal, Form, FormInstance, Input, Button, Space, message } from 'antd';
import { IAdmin } from './AdminList';
import { addAdmin } from '../../api/admin';

interface IProps {
    visible: boolean
    callback: (redresh?: boolean) => void
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export class AddAdmin extends Component<IProps> {
    formRef: RefObject<FormInstance>
    constructor(props: IProps, context: any) {
        super(props, context);
        this.formRef = createRef<FormInstance>();
    }

    addAdmin = (admin: IAdmin) => {
        addAdmin(admin).then(response => {
            const { code, msg } = response.data;
            if (code === 0) {
                message.success(msg);
                this.formRef.current?.resetFields();
                this.props.callback(true);
            } else {
                message.error(msg);
            }
        })
    }
    render() {
        return (
            <Modal
                title="添加管理员"
                visible={this.props.visible}
                onCancel={() => this.props.callback}
                footer={false}
            >
                <Form
                    ref={this.formRef}
                    {...layout}
                    onFinish={this.addAdmin}
                >
                    <Form.Item
                        name="name"
                        label="用户名"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入用户名"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="passowrd"
                        label="密码"
                        rules={[
                            {
                                type: "string",
                                validator: (rule, value) => {
                                    if (value == undefined || value === '') {
                                        return Promise.resolve();
                                    }
                                    if (value.length < 6) {
                                        return Promise.reject("密码长度不可以小于6位")
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mobile"
                        label="手机号"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "手机号不可以为空"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">提交</Button>
                            <Button type="primary" htmlType="reset">重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        )
    };
};

export default AddAdmin;
