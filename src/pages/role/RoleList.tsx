import React, { Component } from 'react'
import { Button, Space, Table } from 'antd';
import { getRoleList } from '../../api/role'

interface IRole {
    id: number
}
interface IState {
    roleList: IRole[]
    current: number
    pageSize: number
    total: number
    loading: boolean
}
export class RoleList extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            roleList: [],
            current: 1,
            pageSize: 15,
            total: 0,
            loading: false
        }
    }
    componentDidMount() {
        // this.getRoleList();
    }
    getRoleList = (page: number = 1) => {
        getRoleList(page).then(response => {
            const { roleList, limit, totalCount } = response.data;
            this.setState({
                roleList,
                pageSize: limit,
                total: totalCount,
                loading: false
            })
        });
    }
    render() {
        return (
            <Table
                dataSource={this.state.roleList}
                loading={this.state.loading}
                rowKey="id"
                pagination={{
                    position: ['bottomCenter'],
                    total: this.state.total,
                    pageSize: this.state.pageSize,
                    showSizeChanger: false
                }}
            >
                <Table.Column title="id" dataIndex="id" />
                <Table.Column title="角色名称" dataIndex="roleName" />
                <Table.Column
                    title="管理"
                    dataIndex="name"
                    render={
                        (role: IRole) => (
                            <Space>
                                <Button type="primary">编辑</Button>
                                <Button type="primary" danger>删除</Button>
                            </Space>
                        )
                    }
                />
            </Table>
        )
    }
}

export default RoleList
