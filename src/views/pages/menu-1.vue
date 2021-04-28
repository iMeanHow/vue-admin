<template>
    <div class="menu-1">
        <el-alert :closable="false" :title="content" type="success" effect="dark" />
        <el-card>
            <div class="flex fvertical mrb_20">
                <el-button type="primary" @click="getData()" :loading="pageData.loading" >
                    <svg-icon v-show="pageData.loading" name="international" />
                    <span style="padding-left: 8px;">Show My Recipes</span>
                </el-button>
                <el-button type="success" icon="el-icon-document" v-if="pageData.content" v-copy="pageData.content">COPY</el-button>
                <el-switch v-model="pageData.showTable" active-text="Show in Form"  style="margin-left: 16px;"></el-switch>
            </div>
            <template v-if="pageData.showTable">
                <el-tag class="mrb_20" type="warning" v-show="pageData.desc">{{ pageData.desc }}</el-tag>
                <el-table :data="pageData.tableData" border stripe>
                    
                <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="center"></el-table-column>
                <el-table-column label="operation">

                <template slot-scope="scope">
                <el-button type="primary" @click="update(scope.row)">update</el-button>
                <el-button type="danger" @click="del(scope.row.id)">delete</el-button>
                
                </template>
                </el-table-column>
                </el-table>
            </template>
            <el-input type="textarea" autosize placeholder="Result" v-model="pageData.content" v-else></el-input>
        </el-card>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { extract, viewMine, deleteRecipe } from '../../api/common';
import { toUpdate, toDetail } from '../../router/permission';
@Component({})
export default class Menu1 extends Vue {
    content = "My Recipes"
	mounted(){   
        this.getData();
		
	}
    readonly pageData = {
        city: "Recipe Name",
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
        // { label: "steps", prop: "steps", minWidth: "", width: 120 },
        // { label: "ingrediants", prop: "ingrediants", minWidth: 140, width: "" },
        // { label: "comments", prop: "comments", minWidth: 140, width: "" },
        
    ]

    async getData() {
        this.pageData.loading = true;
        const res = await viewMine()
        this.pageData.loading = false;
        // console.log("my recipse >>", res);
        if (res.status === 1) {
             
             var content=res.data.data.content;
             var v=[{
                 id:Number,
                 title:String,
                 description:String
             }] as never[]
            for(var i = 0; i < content.length; i++){
                v[i]={id:content[i][0],title:content[i][1],description:content[i][2]} as never
            }

            if (res.data.payload.status === 200) {
                this.pageData.content = JSON.stringify(res.data.data, null, 100);
                this.pageData.tableData =v;
                this.pageData.desc = "query success";
            } else {
                this.$message.error(res.data.desc);
            }
        } else {
            this.$message.error("network error");
        }
    }
        
    async del(id:number) {
         
        this.pageData.loading = true;
        const res = await deleteRecipe(id);
        console.log("delete result",res);
        this.getData() ;
    }
    
    async update(id:number) {
        console.log("to update id ",id);
        toUpdate(id);
        
    }
    
}
</script>

<style>

</style>