import request from "../utils/request";
import utils from "../utils";
import store from "../store";
import { 
    ApiResult,
    LoginParam,
    UserInfoType,
    RegParam,
    SearchParam,
    ExtractParam,
    RecipeParam,
    CommentParam,
    updateRecipeParam
} from "../utils/interfaces";
import { getRouterQuery } from '@/router/permission';

/**
 * 上传图片
 * @param fromData 图片`FromData` 这里我模拟上传，所以类型是`File`，接口上传时才是`FromData`
 */
export function uploadImg(fromData: File) {
    // 模拟上传
    return new Promise<ApiResult>(function(resolve) {
        const reader = new FileReader();
        reader.onload = function() {
            setTimeout(function() {
                resolve({
                    status: 1,
                    data: { img: reader.result },
                    msg: "上传成功",
                    payload: ""
                })
            }, 500);
        }
        reader.onerror = function() {
            resolve({
                status: -1,
                data: null,
                msg: "上传失败",
                payload: ""
            })
        }
        reader.readAsDataURL(fromData);
    })
    
    // return request("POST", "/uploadImg", {}, fromData);
}

/**
 * 获取天气预报数据
 * @param city 城市名
 */
export function getWeather(city: string) {
    return request("GET", "/weather_mini", {
        city: encodeURIComponent(city)
    })
}

export function searchRecipe(recipeName: string) {
    return request("GET", "/api/recipe/search", {
        keyword: recipeName
    })
}


/**
 * 提交表单数据
 * @param params 
 */
export function submitForm(params: { id: number, name: string, age: number }) {
    return request("POST", "/submitForm", {}, utils.jsonToFormData(params))
}

/**
 * 登录
 * @param params 登录信息
 */
export async function login(params: LoginParam) {
    // 模拟登录
    params.rememberMe=0;

    var v = request("POST", "/api/account/login", params);
    console.log("payl= "+(await v).payload);
    console.log("token= "+(await v).payload.token);
    
    const info: UserInfoType = {
        email: params.email,
        token: (await v).payload.token,
        userType: "admin",
        id: Math.random().toString(36).substr(10)
    }
    store.user.update(info);
    return v;
    // return new Promise<ApiResult>(function(resolve) {

    //     params.rememberMe=0;
    //     const loginRes = request("POST", "/api/account/login", params);
    //     console.log("login request posted!");
        
    //     /** 缓存信息  */
    //     const info: UserInfoType = {
    //         email: params.email,
    //         token: Math.random().toString(36).substr(2),
    //         userType: "",
    //         id: Math.random().toString(36).substr(10)
    //     }
    //     console.log(loginRes);
    //     setTimeout(() => {
    //         switch (info.email) {
    //             case store.user.testUserList[0]:
    //                 info.userType = "admin";
    //                 store.user.update(info);
    //                 resolve({ status: 1, msg: "ok", data: info });
    //                 break;

    //             case store.user.testUserList[1]:
    //                 info.userType = "editor";
    //                 store.user.update(info);
    //                 resolve({ status: 1, msg: "ok", data: info });
    //                 break;

    //             default:
    //                 resolve({ status: -1, msg: "user not exist", data: null });
    //                 break;
    //         }
    //     }, 600);
    // })
    
    
    
    // const res = await request("POST", "/login", params)
    // if (res.code === 1) {
    //     // 录成功后缓存用户信息
    //     res.data.name = params.username;
    //     store.user.update(res.data);
    // }
    // return res;
}

export async function reg(params: RegParam) {
    window.console.log(params);
    return request("POST", "/api/account/reg", params);
}

export async function extract(url: ExtractParam) {
    console.log("url =:" + url);
    return request("POST", "/api/recipe/import",url);
}



export async function createRecipe(param: RecipeParam) {
    console.log("create param =:" + param);
    return request("POST", "/api/recipe/create",param);
}

export async function updateRecipe(param: updateRecipeParam) {
    
    console.log("update param =:" + param);
    return request("POST", "/api/recipe/update",param);
}

export async function commentRecipe(param: CommentParam) {
    console.log("create comment =:" + param);
   
    return request("POST", "/api/recipe/comment",param);
}

export async function viewMine() {
    console.log("view my recipes");
    return request("GET", "/api/recipe/mine");
}

export async function deleteRecipe(s:number) {
    console.log("delete my recipe");
    return request("GET", "/api/recipe/delete",{'id':s});
}

export async function detailRecipe(s:number) {
    console.log("view recipes");
    return request("GET", "/api/recipe/lookup",{'id':s});
}