<template>
    <div class="column-2">
        <el-alert :closable="false" :title="content" />
        <br>
        <div class="flex fvertical mrb_20">
                <el-input clearable placeholder="enter url" style="width: 300px; margin-right: 16px;"></el-input>
                <el-button type="primary"  >
                    <span style="padding-left: 8px;">URL Extract</span>
                </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Column2 extends Vue {
    content = "URL Extract"
}
</script>

<style>

</style>