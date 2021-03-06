import React, { Component } from 'react';
import { Button, Space, Table } from 'antd';
import { getAdminList } from '../../api/admin';
import DeleteAdmin from './DeleteAdmin';
import AddAdmin from './AddAdmin';

export interface IAdmin {
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
    loading: boolean,
    showAddminModal: boolean
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
            loading: false,
            showAddminModal: false
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

    deleteAdmin = (id: number) => {
        this.setState((state) => {
            return {
                adminList: state.adminList.filter(admin => admin.id !== id)
            }
        })
    }

    showAddminModal = () => {
        this.setState({
            showAddminModal: true
        });
    }
    hideAddminModal = (refresh?: boolean) => {
        if (refresh) {
            this.getAdminList();
        }
        this.setState({
            showAddminModal: false
        });
    }
    render() {
        return (
            <>
                <Button type="primary" onClick={this.showAddminModal}>添加管理员</Button>
                <AddAdmin
                    visible={this.state.showAddminModal}
                    callback={this.hideAddminModal}
                />
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
                            (admin: IAdmin) => (
                                <Space key="operate">
                                    <Button type="primary">编辑</Button>
                                    <DeleteAdmin id={admin.id} deleteAdmin={this.deleteAdmin} />
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
