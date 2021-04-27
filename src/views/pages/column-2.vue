<template>
    <div class="column-2">
        <el-alert :closable="false" :title="content" />
        <br>
        <el-form class="extract_form" label-position="left" ref="extractFormEl" :model="extractForm" :rules="searchRule">

        <div class="flex fvertical mrb_20">
             <el-form-item prop="url">
                <el-input clearable placeholder="enter url"  v-model="extractForm.url" style="width: 300px; margin-right: 16px;"></el-input>
             </el-form-item>
             <el-form-item>
                <el-button type="primary"  @click="extract()">
                    <span style="padding-left: 8px;">URL Extract</span>
                </el-button>
             </el-form-item>
        </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { extract } from "../../api/common";
import store from "../../store";
import { openNextPage } from "../../router/permission";
@Component({})
export default class Column2 extends Vue {
    content = "URL Extract"
    extractForm = {
        url: ""
    }
    searchRule = {
        url: [
            { required: true }
        ]
    }
    async extract() {
        console.log("url extract");
        const elementForm: any = this.$refs["extractFormEl"];
        console.log("url extract111",this.extractForm);
        const res = await extract(this.extractForm);
        console.log("url post request ");
        console.log("data= ", res);

            if (res.status === 1) {
                console.log("extract success");
                 this.$message("extract success");
                openNextPage();
            } else {
                this.$message.error(res.msg);
            }

     }
    
}
</script>

<style>

</style>