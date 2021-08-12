import request from "../utils/request";

export const getAdminList = (page: number = 1) => {
    return request({
        url: "/admin/admin/list",
        params: {
            page: page
        }
    })
}