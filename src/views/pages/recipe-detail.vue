<template >
    <div class="menu-2">
        <el-alert :closable="false" :title="content" type="info" effect="dark" /><br>
        <el-card>
            <div class="flex fvertical mrb_20">
              <el-button type="primary" @click="getData()" :loading="pageData.loading" >
                    <svg-icon v-show="pageData.loading" name="international" />
                    <span style="padding-left: 8px;">Flash</span>
                </el-button>
            </div>
            <br><br>

            <template >
                <el-tag class="mrb_20" type="warning" v-show="pageData.desc" >{{ pageData.desc }}</el-tag>
                <el-table :data="pageData.tableData" border stripe>
                    
                <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="center"></el-table-column>
                </el-table>
            </template>
            <br>
            <template>
                <el-tag class="mrb_20" type="warning" v-show="pageData1.desc" >{{ pageData1.desc }}</el-tag>
                <el-table :data="pageData1.tableData" border stripe>
                    
                <el-table-column v-for="item in tableColumns1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="left"></el-table-column>
                </el-table>
            
            </template><br>

                <template>
                <el-tag class="mrb_20" type="warning" v-show="pageData2.desc" >{{ pageData2.desc }}</el-tag>
                <el-table :data="pageData2.tableData" border stripe>
                    
                <el-table-column v-for="item in tableColumns2" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="left"></el-table-column>
                </el-table>
            </template>
            <br>

            <template>
                <el-tag class="mrb_20" type="warning" v-show="pageData3.desc" >{{ pageData3.desc }}</el-tag>
                <el-table :data="pageData3.tableData" border stripe>
                    
                <el-table-column v-for="item in tableColumns3" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="left"></el-table-column>
                </el-table>
            </template><br>
                <div>
            <h4>Comment Now</h4><br>
            <el-form>
             <el-form-item prop="rating">
                <el-input clearable placeholder="rating"  v-model="commentForm.rating" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="text">
                <el-input clearable placeholder="comment"  v-model="commentForm.text" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-button type="primary"  @click="comment()">
                    <span style="padding-left: 8px;">Add Comment</span>
                </el-button>
             </el-form>
            </div>
        </el-card>

    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRouterQuery } from '../../router/permission';
import { viewMine, deleteRecipe, detailRecipe, createRecipe, commentRecipe } from '../../api/common';
@Component({})
export default class recipeDetail extends Vue {
    content = "Recipe Detail "
	mounted(){   
        this.getData();
		
	}

    commentForm = {
        id:0,
        rating:"",
        text:""
    }

    readonly pageData = {
        loading: false,
        content: "",
        tableData: [],
        desc: "",
        showTip: false
    }

    readonly pageData1 = {
        loading: false,
        content: "",
        tableData: [],
        desc: "",
        showTip: false
    }

    readonly pageData2 = {
        loading: false,
        content: "",
        tableData: [],
        desc: "",
        showTip: false
    }
    
    readonly pageData3 = {
        loading: false,
        content: "",
        tableData: [],
        desc: "",
        showTip: false
    }
    readonly tableColumns = [
        { label: "id", prop: "id", minWidth: "", width: 200 },
        { label: "title", prop: "title", minWidth: "", width: 500 },
        { label: "description", prop: "description", minWidth: "", width: 700 },
    ]
    
    readonly tableColumns1 = [
        { label: "steps", prop: "steps", minWidth: "", width: 1350 },
    ]
    readonly tableColumns2 = [
        { label: "ingrediants", prop: "ingrediants", minWidth: 1350, width: "" },
    ]
        readonly tableColumns3 = [
        { label: "rating", prop: "rating", minWidth: 350, width: "" },  
        
        { label: "comment", prop: "comment", minWidth: 1000, width: "" },  
    ]
    async getData() {
        console.log("get detail data")
         
        this.pageData.loading = true;
        var t = getRouterQuery() as any;
        console.log("id",t.id);
        const res = await detailRecipe(t.id);
        this.pageData.loading = false;
        console.log("detail recipe >>", res.data.data.comment);
        var v1=[{}] as never[]
        var v2=[{}] as never[]
        var v3=[{}] as never[]
        var v4=[{}] as never[]
        var content= res.data.data
        v1[0]={id:content.id,title:content.title,description:content.description} as never
        for(var i = 0; i < content.steps.length; i++){
              if(content.ingrediants[i].detail!="")
                v2[i]={steps:content.steps[i].detail} as never
        }
        for(var i = 0; i < content.ingrediants.length; i++){
            if(content.ingrediants[i].detail!="")
                v3[i]={ingrediants:content.ingrediants[i].detail} as never
        }
        for(var i = 0; i < content.comment.length; i++){
                v4[i]={rating:content.comment[i].rating,comment:content.comment[i].comment} as never
        }
        if (res.status === 1) {

            if (res.data.payload.status === 200) {
                this.pageData.content = JSON.stringify(res.data.data, null, 100);
                this.pageData.tableData =v1;
                this.pageData1.tableData =v2;
                this.pageData2.tableData =v3;
                this.pageData3.tableData =v4;
                this.pageData.desc = "query success";
            } else {
                this.$message.error(res.data.desc);
            }
        } else {
            this.$message.error("network error");
        }
    }

    async comment() {
        console.log("manual input");
        const elementForm: any = this.$refs["extractFormEl"];
        console.log("manual input = ",this.commentForm);
        var t = getRouterQuery() as any;
        this.commentForm.id=t.id;
        const res = await commentRecipe(this.commentForm);
        console.log("manual input post request ");
        console.log("data= ", res);

            if (res.status === 1) {
                console.log("comment success");
                this.$message("comment success");
                this.getData();
            } else {
                this.$message.error(res.msg);
            }

     }

}
</script>

<style>

</style>