import config from "./Config";
import { Message } from "element-ui";
import { 
    AjaxParams, 
    ApiResult
} from "./interfaces";
import store from '@/store';

/**
 * `http`请求
 * @author https://github.com/Hansen-hjs
 * - [MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
 * - [掘金](https://juejin.cn/post/6844904066418491406/#heading-1)
 */
function ajax(params: AjaxParams) {
    /** XMLHttpRequest */
    const XHR = new XMLHttpRequest();
    /** 请求方法 */
    const method = params.method;
    /** 超时检测 */
    const overtime = params.overtime || 0;
    /** 请求链接 */
    let url = params.url;
    /** 非`GET`请求传参 */
    let body = null;
    /** `GET`请求传参 */
    let query = "";

    // 传参处理
    if (method === "GET") {
        // 解析对象传参
        for (const key in params.data) {
            query += "&" + key + "=" + params.data[key];
        }
        if (query) {
            query = "?" + query.slice(1);
            url += query;
        }
    } else {
        body = JSON.stringify(params.data); // 若后台没设置接收 JSON 则不行，需要使用`params.formData`方式传参
    }

    // 监听请求变化；XHR.status learn: http://tool.oschina.net/commons?type=5
    XHR.onreadystatechange = function () {
        if (XHR.readyState !== 4) return;
        if (XHR.status === 200 || XHR.status === 304) {
            params.success && params.success(JSON.parse(XHR.response), XHR);
        } else {
            params.fail && params.fail(XHR);
        }
    }

    // 判断请求进度
    if (params.progress) {
        XHR.addEventListener("progress", params.progress);
    }

    // XHR.responseType = "json"; // 设置响应结果为`json`这个一般由后台返回指定格式，前端无配置
    // XHR.withCredentials = true;	// 是否Access-Control应使用cookie或授权标头等凭据进行跨站点请求。
    XHR.open(method, url, true);

    // 判断传参类型，`json`或者`form`表单
    if (params.formData) {
        body = params.formData;
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 默认就是这个，设置不设置都可以
    } else {
        XHR.setRequestHeader("Content-Type", "application/json");
    }

    // 判断设置配置头信息
    if (params.headers) {
        for (const key in params.headers) {
            const value = params.headers[key];
            XHR.setRequestHeader(key, value);
        }
    }

    // 在IE中，超时属性只能在调用 open() 方法之后且在调用 send() 方法之前设置。
    if (overtime > 0) {
        XHR.timeout = overtime;
        XHR.ontimeout = function () {
            XHR.abort();
            params.timeout && params.timeout(XHR);
        }
    }

    XHR.send(body);
}

function getResultInfo(result: { statusCode: number, data: any }) {
    const info: ApiResult = { status: -1, msg: "网络出错了", data: null, payload: null }
    console.log("result=" + result);
    switch (result.statusCode) {
        case config.requestOvertime:
            info.msg = "Netwrok Timeout";
            break;
        case 200:
            info.status = 1;
            info.msg = "ok";
            info.data = result.data;
            info.payload=result.data.payload;
            break;
        case 400:
            info.msg = "Wrong Params";
        case 403:
            info.msg = "403";
            break;
        case 404:
            info.msg = "404";
            break;
        default:
            break;
    }
    if (result.statusCode >= 500) {
        info.msg = "Internal error";
    }
    return info;
}

/**
 * 基础请求
 * @param method 请求方式
 * @param url 请求接口
 * @param data 请求数据
 * @param formData 表单式传参
 * @param headers 请求头信息
 */
export default function request(
    method: AjaxParams["method"],
    url: string,
    data?: object,
    formData?: AjaxParams["formData"],
    headers?: AjaxParams["headers"]
) {
    console.log(url);
    if(store.user.info.token!=null){
        headers={Authorization:store.user.info.token}
    }
    return new Promise<ApiResult>(function(resolve, reject) {
        ajax({
            url: config.apiUrl + url,
            method: method,
            headers: headers,
            data: data || {},
            formData: formData,
            overtime: config.requestOvertime,
            success(res, xhr) {
                console.log("==success==", res);
                const info = getResultInfo({ statusCode: xhr.status, data: res });
                resolve(info);
            },
            fail(err) {
                const info = getResultInfo({ statusCode: err.status, data: null });
                if (err.response.charAt(0) == "{") {
                    info.data = JSON.parse(err.response);
                }
                // 全局的请求错误提示，不需要可以去掉
                Message.error(info.msg);
                resolve(info);
            },
            timeout() {
                console.warn("XMLHttpRequest timeout !!!");
                const info = getResultInfo({ statusCode: config.requestOvertime, data: null });
                // 全局的请求超时提示，不需要可以去掉
                Message.warning(info.msg);
                resolve(info);
            }
        });
    })
}