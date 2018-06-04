const defaultUrl = "http://localhost/"
//const defaultUrl = "http://192.168.3.153/"
const TParams = {
    defaultUrl,
    defaultPageSize:20,
    urls: {
        /* get_project_list: defaultUrl + 'project/getByPage',
        save_project: defaultUrl + 'project/save',
        del_project: defaultUrl + 'project/del', */
       get_department_buildings_list:defaultUrl + 'department/getDepartmentsAndBuildings', //视图v_building获取楼盘、楼栋、物业、项目部信息列表
       getBuildingsByProject:defaultUrl + 'building/getBuildingsByProject',  //根据楼盘id获取所辖楼栋列表
       allotBuildings :defaultUrl + 'building/allot', //绑定楼栋－－物业项目部
     
        save_admin: defaultUrl + 'admin/save',
        del_admin: defaultUrl + 'admin/del',
        get_oss_params: defaultUrl + 'oss/getParams',//获取阿里oss参数设置
        login:defaultUrl + 'auth/login',
        chgPwd:defaultUrl + 'auth/chgPwd',
        getProjectList:defaultUrl +'project/getList',//获取楼盘列表
        getPropertyList:defaultUrl +'property/getList',//获取物业公司列表
    }
}
window.TParams = TParams

//https://www.eolinker.com/#/share/project/detail?groupID=-1&apiID=544132&shareCode=2fNTYg&shareToken=$2y$10$RYB1~2Fq0kJITA2AHHtt.O~2Fu8tQKmplHEaqVf4Y0aezddzH3TiqBcQi&shareID=93086