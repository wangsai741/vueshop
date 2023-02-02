import {reqGetCode,reqUserRigister,reqUserLogin,reqUserInfo,reqLoginOut} from '@/api';
import { setToken,getToken,removeToken } from '@/utils/token';

const state={
    code:'',
    token:getToken(),
    userInfo:{},
};
const mutations={
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 清空仓库数据
        state.token = "";
        state.userInfo = {};
        // 清除本地存储数据
        removeToken();
    }
};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRigister(user);
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 登陆
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // 服务器下发token
        // 带token找服务器要用户信息展示
        if(result.code == 200){
            // 登陆成功获取token
            commit('USERLOGIN',result.data.token);
            // 持久存储token
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            // 提交用户信息保存
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 退出登陆
    async userLogout({commit}){
        let result = await reqLoginOut();
        if(result.code == 200){
            commit('CLEAR');
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    }
    
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters
}