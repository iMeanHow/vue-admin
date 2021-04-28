<template>
    <div class="menu-2">
        <el-alert :closable="false" :title="content" type="success" />
        <br>
        <el-form class="create_form" label-position="left" ref="createFormEl" :model="createForm" :rules="searchRule">

        <div class="flex fvertical mrb_20">
            <div>
             <el-form-item prop="title">
                <el-input clearable placeholder="title"  v-model="createForm.title" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="description">
                <el-input clearable placeholder="description"  v-model="createForm.description" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            </div>
            <div></div>
            <div>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[0].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>

            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[1].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[2].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[3].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[4].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
                         <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[5].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>

            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[6].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[7].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[8].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="steps">
                <el-input clearable placeholder="steps"  v-model="createForm.steps[9].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            </div>
            <div>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[0].detail" style="width: 300px; margin-right: 16px;"></el-input>
            </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[1].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[2].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[3].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[4].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
                         <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[5].detail" style="width: 300px; margin-right: 16px;"></el-input>
            </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[6].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[7].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[8].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            <el-form-item prop="ingrediants">
                <el-input clearable placeholder="ingrediants"  v-model="createForm.ingrediants[9].detail" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
            </div>
             <el-form-item>
                 <br>
                <el-button type="primary"  @click="update()">
                    <span style="padding-left: 8px;">UPDATE</span>
                </el-button>
             </el-form-item>
        </div>
        </el-form>
        
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRouterQuery, toDetail } from '../../router/permission';
import { detailRecipe, createRecipe, updateRecipe } from '../../api/common';
@Component({})
export default class Menu2 extends Vue {
   	mounted(){   
        this.getData();
		
	}
    content = "Update Recipe"
    searchRule = {
        title: [
            { required: true }
        ]
    }
    createForm = {
        id:0,
        title: "",
        description: "",
        steps:[
            {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""},
            {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}

        ],
        ingrediants:[
            {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""},
             {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}, {detail:""}
        ],
        comments:[
             {
            comment: "",
            rating: 10}
        ]
    }
    async getData() {
        console.log("get detail data")
         
        var t = getRouterQuery() as any;
        console.log("id",t.id);
        const res = await detailRecipe(t.id);
        console.log("detail recipe >>", res.data.data);

        var content= res.data.data

        if (res.status === 1) {
            this.createForm.id=t.id;
            this.createForm.title=content.title;
            this.createForm.description=content.description;
            for(var i = 0; i < content.steps.length&& i<10; i++){
               this.createForm.steps[i].detail=content.steps[i].detail;
            }
        for(var i = 0; i < content.ingrediants.length && i<10; i++){
               this.createForm.ingrediants[i].detail=content.ingrediants[i].detail;
        }
            if (res.data.payload.status === 200) {
            } else {
                this.$message.error(res.data.desc);
            }
        } else {
            this.$message.error("network error");
        }
    }

        async update() {
        var t = getRouterQuery() as any;
        console.log("update recipe");
        console.log("update input = ",this.createForm);
        const res = await updateRecipe(this.createForm);
        console.log("manual input post request ");
        console.log("data= ", res);

            if (res.status === 1) {
                console.log("manual input success");
                this.$message("manual input success");
                toDetail(t);
            } else {
                this.$message.error(res.msg);
            }

     }

}
</script>

<style>

</style>