<template>
    <div class="http_request">
        <el-card>
            <div class="mrb_20" v-if="pageData.showTip">
                <el-tag type="danger" style="margin-right: 14px;">请求接口为http，与当前域名https不匹配，可能无法正常请求到数据，需要在http环境下进行</el-tag>
                <el-button type="warning" size="small" @click="openHttp()">切换至http</el-button>
            </div>
            <div class="flex fvertical mrb_20">
                <el-input v-model="pageData.recipe" clearable placeholder="enter recipe name" style="width: 300px; margin-right: 16px;"></el-input>
                <el-button type="primary" @click="getData()" :loading="pageData.loading" >
                    <svg-icon v-show="pageData.loading" name="international" />
                    <span style="padding-left: 8px;">Recipe Search</span>
                </el-button>
                <el-button type="success" icon="el-icon-document" v-if="pageData.content" v-copy="pageData.content">COPY</el-button>
                <el-switch v-model="pageData.showTable" active-text="Show in Form"  style="margin-left: 16px;"></el-switch>
            </div>
            <template v-if="pageData.showTable">
                <el-tag class="mrb_20" type="warning" v-show="pageData.desc">{{ pageData.desc }}</el-tag>
                <el-table :data="pageData.tableData" border stripe>
                    <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="center"></el-table-column>
                    
<el-button type="danger"  @click="del(scope.row)">删除</el-button>
                </el-table>
            </template>
            <el-input type="textarea" autosize placeholder="Result" v-model="pageData.content" v-else></el-input>
        </el-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getWeather, searchRecipe } from "../../api/common";

@Component({})
export default class HttpRequest extends Vue {
    readonly pageData = {
        recipe: "",
        loading: false,
        showTable: true,
        content: "",
        tableData: [],
        desc: "",
        showTip: false
    }

    readonly tableColumns = [
        { label: "id", prop: "id", minWidth: "", width: 100 },
        { label: "title", prop: "title", minWidth: "", width: 400 },
        { label: "description", prop: "description", minWidth: "", width: 600 }
    ]

    async getData() {
        if (!this.pageData.recipe) return this.$message.warning("null recipe name");
        this.pageData.loading = true;
        const res = await searchRecipe(this.pageData.recipe)
        this.pageData.loading = false;
        var content=res.data.data.content;

        var v=[{
                 id:Number,
                 title:String,
                 description:String
             }] as never[]
        for(var i = 0; i < content.length; i++){
            v[i]={id:content[i][0],title:content[i][1],description:content[i][2]} as never
        }

        if (res.status === 1) {
            if (res.data.payload.status === 200) {
                this.pageData.content = JSON.stringify(res.data, null, 100);
                this.pageData.tableData = v;
                this.pageData.desc = "query success";
            } else {
                this.$message.error(res.data.desc);
            }
        } else {
            this.$message.error("network error");
        }
    }
        
    openHttp() {
        location.href = location.href.replace("https", "http");
    }

    mounted() {
        console.clear();
        if (location.origin.includes("https")) {
            this.pageData.showTip = true;
        }
    }
}
</script>
<style lang="scss">
.http_request {
    width: 100%;
    .mrb_20 { margin-bottom: 20px; }
}
</style>