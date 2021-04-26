import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Layout from "../layout/index.vue";
import { RouteItem } from "../utils/interfaces";
import { initPermission } from "./permission";

Vue.use(VueRouter);

/**
 * 基础路由
 * 路由第一层要加"/"，之后的不用加，路由重定向也是
 * learn: https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html
 */
export const base: Array<RouteItem> = [
    {
        path: store.user.loginPath,
        name: "/login",
        component: () => import("@/views/login.vue"),
        meta: { hidden: true, title: "Please Login" },
    }, {
        path: store.user.regPath,
        name: "/reg",
        component: () => import("@/views/registration.vue"),
        meta: { hidden: true, title: "Registration here" },
    },{
        path: "/404",
        name: "page-404",
        component: () => import("@/views/404.vue"),
        meta: { hidden: true, title: "Page not found" },
    }, {
        path: "/401",
        name: "page-401",
        component: () => import("@/views/401.vue"),
        meta: { hidden: true, title: "UNAUTHORIZED" },
    }
];

/** 用户类型一路由 */
export const admin: Array<RouteItem> = [
    {
        path: "/",
        name: "index",
        redirect: "/home",
        component: Layout,
        meta: { title: "Main", icon: "excel" }, 
        children: [
            {
                path: "home",
                meta: { title: "RESA info", icon: "guide" },
                component: () => import("@/views/pages/home.vue")
            }
            // {
            //     path: "the-component",
            //     name: "the-component",
            //     meta: { title: "上传图片", icon: "international" },
            //     component: () => import("@/views/pages/the-component.vue")
            // }
        ]
    },
    {
        path: "/myRecipe",
        name: "myRecipe",
        redirect: "/myRecipe/column-1",
        meta: { title: "My Recipe", icon: "dashboard" }, 
        component: Layout,
        children: [
            {
                path: "menu-1",
                name: "myRecipe/menu-1",
                meta: { title: "View All", icon: "tree" },
                component: () => import("@/views/pages/menu-1.vue")
            }, {
                path: "menu-2",
                name: "myRecipe/menu-2",
                meta: { title: "Update Recipe", icon: "tree" },
                component: () => import("@/views/pages/menu-2.vue")
            }
        ]
    },


    {
        path: "/newRecipe",
        name: "newRecipe",
        redirect: "/newRecipe/column-1",
        meta: { title: "New Recipe", icon: "dashboard" }, 
        component: Layout,
        children: [
            {
                path: "column-1",
                name: "newRecipe/column-1",
                meta: { title: "Manual Input", icon: "theme" },
                component: () => import("@/views/pages/column-1.vue"),
            }, {
                path: "column-2",
                name: "newRecipe/column-2",
                meta: { title: "URL Extract", icon: "table" },
                component: () => import("@/views/pages/column-2.vue")
            }
        ]
    },
    {
        path: "/request",
        name: "request",
        redirect: "/request/search_recipe",
        meta: { title: "Recipe", icon: "guide" },
        component: Layout,
        children: [
            {
                path: "search_recipe",
                name: "request/search_recipe",
                meta: { title: "Recipe Search", icon: "international" },
                component: () => import("@/views/pages/http.vue"),
            }
        ]
    },
    // {
    //     path: "/request",
    //     name: "request",
    //     redirect: "/request/weather",
    //     meta: { title: "http请求", icon: "guide" },
    //     component: Layout,
    //     children: [
    //         {
    //             path: "weather",
    //             name: "request/weather",
    //             meta: { title: "Recipe Update", icon: "international" },
    //             component: () => import("@/views/pages/http.vue"),
    //         }
    //     ]
    // },
    // {
    //     path: "/icon",
    //     component: Layout,
    //     children: [
    //         {
    //             path: "index",
    //             component: () => import(/* webpackChunkName: "icons" */ "@/views/pages/icons.vue"),
    //             name: "Icons",
    //             meta: {
    //                 title: "icons",
    //                 icon: "icon",
    //                 noCache: true
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: "https://github.com/Hansen-hjs/vue-admin",
    //     meta: {
    //         icon: "star",
    //         title: "跳转外部链接"
    //     }
    // }
]

// ========================== 测试 ==========================
// for (let i = 3; i < 18; i++) {
//     const first = admin[0].children as Array<RouteItem>
//     const second = first[1].children as Array<RouteItem>
//     second.push({
//         path: "menu-" + i,
//         name: "nested/menu-" + i,
//         meta: { title: "菜单 2-" + i, icon: "tree" },
//         component: () => import("@/views/pages/menu-1.vue")
//     })
// }

/** 用户类型二路由（懒得整多一份了，直接用上面的） */
export const editor = [admin[0]];

/** `VueRouter`路由实例化对象 */
const router = new VueRouter({
    routes: base
});

initPermission(router, {
    base,
    admin,
    editor
})

export default router;
