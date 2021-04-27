<template>
    <div class="column-1">
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
                <el-button type="primary"  @click="create()">
                    <span style="padding-left: 8px;">INPUT</span>
                </el-button>
             </el-form-item>
        </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { extract, createRecipe } from "../../api/common";
import store from "../../store";
import { openNextPage } from "../../router/permission";
@Component({})
export default class Column1 extends Vue {
    content = "Manual Input"
    createForm = {
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
    searchRule = {
        title: [
            { required: true }
        ]
    }
    async create() {
        console.log("manual input");
        const elementForm: any = this.$refs["extractFormEl"];
        console.log("manual input = ",this.createForm);
        const res = await createRecipe(this.createForm);
        console.log("manual input post request ");
        console.log("data= ", res);

            if (res.status === 1) {
                console.log("manual input success");
                this.$message("manual input success");
                openNextPage();
            } else {
                this.$message.error(res.msg);
            }

     }

}
</script>

<style>

</style>