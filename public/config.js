/* const defaultUrl = "http://localhost/" */
const defaultUrl = "http://192.168.3.153/"
const TParams = {
    defaultUrl,
    urls: {
        /* get_project_list: defaultUrl + 'project/getByPage',
        save_project: defaultUrl + 'project/save',
        del_project: defaultUrl + 'project/del', */
       
        save_admin: defaultUrl + 'admin/save',
        del_admin: defaultUrl + 'admin/del',
        get_oss_params: defaultUrl + 'oss/getParams',
        login:defaultUrl + 'auth/login',
        chgPwd:defaultUrl + 'auth/chgPwd',
    }
}
window.TParams = TParams

//https://www.eolinker.com/#/share/project/detail?groupID=-1&apiID=544132&shareCode=2fNTYg&shareToken=$2y$10$RYB1~2Fq0kJITA2AHHtt.O~2Fu8tQKmplHEaqVf4Y0aezddzH3TiqBcQi&shareID=93086