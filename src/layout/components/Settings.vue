<template>
    <div class="drawer_content">
        <h3 class="drawer_title">Layout Settings</h3>
        <el-divider></el-divider>
        <div class="drawer_item">
            <span>Theme Color</span>
            <ThemePicker style="float: right; height: 26px; margin: -3px 8px 0 0;" @change="themeChange" />
        </div>
        <div class="drawer_item">
            <span>Show Open histories</span>
            <el-switch v-model="layoutState.showHistoryView" class="drawer-switch" />
        </div>
        <div class="drawer_item">
            <span>Show Logo</span>
            <el-switch v-model="layoutState.showSidebarLogo" class="drawer-switch" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThemePicker from "./ThemePicker.vue";
import store from "../../store";
import { themeChangeAsync } from "../theme";

@Component({
    components: {
        ThemePicker
    }
})
export default class Settings extends Vue {

    readonly layoutState = store.layout.state;

    async updateCss(value: string) {
        await themeChangeAsync(value);
        this.layoutState.theme = value;
    }

    themeChange(value: string) {
        if (this.layoutState.theme != value) {
            this.updateCss(value);
        }
    }

    mounted() {
        if (this.layoutState.theme !== store.layout.defaultTheme) {
            this.updateCss(this.layoutState.theme);
        }
    }
}
</script>

<style lang="scss">
.drawer_content {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    .drawer_title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 15px;
        line-height: 22px;
    }
    .drawer_item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
    }
    .drawer-switch {
        float: right;
    }
}
</style>
