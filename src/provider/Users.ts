import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { ApiService } from "./api-service";
import { Utils } from "./Utils";

@Injectable()
export class Users {

    constructor(
        private storage: Storage,
        private api: ApiService,
    ) {

    }

    /**
     * 获取token key
     * */
    _getTokenKey() {
        return `token`;
    }
    /**
     * 获取用户的登录TOKEN
     */
    token(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get(this._getTokenKey()).then(val => {
                // resolve('5f4391a432ed415396a73b10bdc5137f'); // 后台wmarshx用户的Token aed672e8bbe94206995a78dc6cd6ed1b
                // resolve('d4437223dd024b599ebbee94a2b027f6'); // 本地测试
                resolve(val);
            });
        });
    }

    /**
     * 保存用户登录TOKEN
     * @param token 
     */
    saveToken(token: string): Promise<any> {
        return this.storage.set(this._getTokenKey(), token);
    }

    bindAuth(code: string, provider: string, rid): Promise<any> {
        return this.api.POST('u/auth_bind', { code: code, provider: provider, rid });
    }

    GetAuthUrl(url): Promise<any> {
        return this.api.GET('u/auth', { url: url });
    }

    GetPage(slug) {
        return this.api.GET('p/' + slug, null);
    }

    GetUserHomeData(work_date) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('gwc/user/home', { token: token, work_date: work_date, key: this._getKeyParam() }, "加载中...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetAccountInfo() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/admin/home', { token: token }, "", false)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetFeatures() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/features', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    DeleteAccount(aid) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.POST('manager/accounts/delete', { token: token, account_id: aid },
                    "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetPermissionResources(account_id = null) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/accounts/permission_points', { token: token, account_id: account_id }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SaveAccount(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST('manager/accounts/save', params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    BatchCreateJobPlan(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST('manager/jobs/plans/batch_create', params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetJob(job_id) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                // params['token'] = token;
                this.api.GET('gwc/jobs/' + job_id, { token: token }, "加载中...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    HandleApply(job_id, work_date, action) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                // params['token'] = token;
                this.api.POST('gwc/apply/' + action,
                    { token: token, job_id: job_id, work_date: work_date }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetJobPlans(job_id) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                // params['token'] = token;
                this.api.GET('manager/jobs/plans', { token: token, job_id: job_id }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SavePlan(job_id, id, params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                params['job_id'] = job_id;
                params['id'] = id;
                this.api.POST('manager/jobs/plans/save', params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    DeletePlan(job_id, id) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                // params['token'] = token;
                this.api.POST('manager/jobs/plans/delete', { token: token, job_id: job_id, id: id }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetContactsOrChannels(resouce) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET(`manager/${resouce}`, { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SaveContactsOrChannels(resouce, params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST(`manager/${resouce}/save`, params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetJobs() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/jobs', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SaveJob(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST(`manager/jobs/save`, params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    DeleteJob(jobID) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.POST('manager/jobs/delete', { token: token, id: jobID }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    DeleteContactOrChannel(resource, id) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.POST(`manager/${resource}/delete`, { token: token, mcid: id }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetProjects() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/projects', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetPriceTypes() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/jobs/price_types', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetChannelEarnTypes() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/jobs/channel_earn_types', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SaveProjects(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST('manager/projects/save', params, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    DeleteProject(id) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.POST('manager/projects/delete', { token: token, id: id }, "正在提交", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetUserProfile(showLoading = true, loadingText = '正在加载...') {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('gwc/user/profile', { token: token }, loadingText, showLoading)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    AddSalary(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                this.api.POST('salaries/create', params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetSalaries(state, showLoading = true, loadingText = '加载中...') {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('gwc/user/salaries', { token: token, state: state }, loadingText, showLoading)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    SaveProfile(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                // params['token'] = token;
                this.api.POST('gwc/user/save_profile', { token: token, payload: JSON.stringify(params) })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    logout(): Promise<any> {
        return this.storage.remove(this._getTokenKey());
    }

    UpdatePassword(params) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                params['token'] = token;
                params['merch_id'] = Utils.getQueryString('mid');
                this.api.POST('manager/admin/update_password', params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    private _getKeyParam() {
        const value = Utils.getQueryString("key");
        return value;
    }

    Login(mobile, code) {
        return new Promise((resolve, reject) => {
            this.api.POST('gwc/user/login', {
                mobile: mobile,
                code: code,
                key: this._getKeyParam()
            })
                .then(data => {
                    // console.log(data);
                    if (data && data['data']) {
                        const token = data['data']['token'];
                        this.saveToken(token)
                            .then(res => {
                                resolve(data['data']);
                            });
                    } else {
                        reject('非法错误');
                    }
                })
                .catch(error => {
                    // console.log(error);
                    reject(error.message || '服务器出错了');
                });
        });
    }

    GetAccounts() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('manager/accounts', { token: token }, "正在加载...", true)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetTrades(pageNo: number, pageSize: number = 20) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                const flag = pageNo === 1;
                this.api.GET('user/trades', { token: token, page: pageNo, size: pageSize }, '正在加载', flag)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
                .catch(error => { });
            // 
        });
    }

    GetCode(mobile) {
        return this.api.POST("auth_codes", { mobile: mobile, code_type: 1 });
    }
}