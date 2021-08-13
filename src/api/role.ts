import request from "../utils/request";

export const getRoleList = (page: number = 1) => {
    return request({
        url: "/admin/role/list",
        params: { page }
    });
}