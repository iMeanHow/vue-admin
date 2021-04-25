export class ModuleConfig {
    constructor() {
        this.env = process.env.NODE_ENV === "development" ? "dev" : "prod";
    }

    /** 当前开发环境 */
    readonly env!: "dev" | "prod"

    /** 请求超时毫秒 */
    readonly requestOvertime = 8000;

    /** 开发环境 */
    protected readonly dev = {
        api: "http://localhost:8080"
    }
    
    /** 生产环境 */
    protected readonly prod = {
        api: "http://localhost:8080"
    }

    /** `api`请求域名 */
    get apiUrl() {
        return this[this.env].api;
    }
}

/** 配置模块 */
const config = new ModuleConfig();

export default config;