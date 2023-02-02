// 对axios二次封装
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
// start:进度条开始 done：进度条结束
import "nprogress/nprogress.css"

// 1.利用axios的对象方法create创建一个axios实例
// 2.requests就是axios，只是配置了一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径中会加上api
    baseURL:"/mock",
    // 请求超时时间5s
    timeout:5000
})

// 请求拦截器：请求前检测到，做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里有个属性，headers请求头很重要
    // 进度条开始动
    nprogress.start();
    return config;
})


// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
    // 进度条结束动
    nprogress.done();
    return res.data;
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests
