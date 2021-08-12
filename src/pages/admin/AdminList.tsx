import React, { Component } from 'react';
import { Button, Space, Table } from 'antd';
import { getAdminList } from '../../api/admin';

interface IAdmin {
    id: number
    name: string
    mobile: string
    email: string
}
interface IState {
    adminList: IAdmin[],
    current: number,
    pageSize: number,
    total: number,
    loading: boolean
}

export class AdminList extends Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            adminList: [
                {
                    id: 6,
                    name: "哈哈",
                    mobile: "183xxxxxxxx",
                    email: "xxxx@qq.com"
                }
            ],
            current: 1,
            pageSize: 15,
            total: 0,
            loading: false
        }
    }

    componentDidMount() {
        // this.getAdminList();
    }

    getAdminList = (page: number = 1) => {
        getAdminList(page).then(response => {
            const { dataList, limit, totalCount } = response.data.data;
            this.setState({
                adminList: dataList,
                loading: false,
                pageSize: limit,
                total: totalCount
            });
        })
    }
    change = (pagination: any) => {
        this.getAdminList(pagination.current);
    }

    render() {
        return (
            <>
                <Table
                    dataSource={this.state.adminList}
                    rowKey={'id'}
                    pagination={{
                        position: ['bottomCenter'],
                        showSizeChanger: false,
                        total: this.state.total,
                        pageSize: this.state.pageSize
                    }}
                    loading={this.state.loading}
                    onChange={this.change}
                >
                    <Table.Column title="ID" dataIndex="id" key="id" />
                    <Table.Column title="姓名" dataIndex="name" key="name" />
                    <Table.Column title="邮箱" dataIndex="email" key="email" />
                    <Table.Column title="电话" dataIndex="mobile" key="mobile" />
                    <Table.Column
                        title="操作"
                        render={
                            () => (
                                <Space key="operate">
                                    <Button type="primary">编辑</Button>
                                    <Button type="primary" danger>删除</Button>
                                </Space>
                            )
                        }
                    />
                </Table>
            </>
        );
    };
};

export default AdminList;
