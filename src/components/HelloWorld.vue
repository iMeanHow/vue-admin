<template>
    <div class="hello_world">
        <h1 class="title">{{ msg }}</h1>
        <el-divider content-position="left">RESA</el-divider>
        <p class="text">Course Project for CSC 510 - 2021 Spring</p>
        <p class="text">A recipe extract and storage system.</p>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class HelloWorld extends Vue {
    @Prop({
        type: [String, Number],
        default: ""
    })
    msg!: string;

    vite = "https://www.pipipi.net/vite/guide/";

    vueCli = "https://cli.vuejs.org/zh/guide/";

    elementUi = "https://element.eleme.cn/#/zh-CN/component/installation";

    typeScript = "https://www.tslang.cn/";

    project = "https://github.com/Hansen-hjs/vue-admin"
}
</script>

<style lang="scss">
.hello_world {
    width: 100%;
    .title {
        font-size: 24px;
        color: #444;
        margin-bottom: 20px;
        font-weight: normal;
    }
    .text {
        font-size: 16px;
        color: #555;
        line-height: 28px;
        .el-link {
            padding: 0 4px;
        }
    }
    .code_box {
        width: 100%;
        img {
            display: inline-block;
            vertical-align: top;
            width: 280px;
            margin-right: 16px;
            border-radius: 4px;
            box-shadow: 0 4px 4px rgba(0,0,0,0.1);
            transition: 0.3s all;
        }
        .hovercode {
            cursor: pointer;
            &:hover + .qrcode {
                opacity: 1;
                transform: translateX(0px);
            }
        }
        .qrcode {
            opacity: 0;
            transform: translateX(100px);
        }
    }
}

</style>
