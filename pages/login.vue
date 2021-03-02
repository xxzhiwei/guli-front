<template>
    <div class="main">
        <div class="title">
            <a class="active" href="/login">登录</a>
            <span>·</span>
            <a href="/register">注册</a>
        </div>

        <div class="sign-up-container">
            <el-form ref="userForm" :model="formData">
                <el-form-item
                    class="input-prepend restyle"
                    prop="mobile"
                    :rules="[
                        {
                            required: true,
                            message: '请输入手机号码',
                            trigger: 'blur',
                        },
                        { validator: checkPhone, trigger: 'blur' },
                    ]"
                >
                    <div>
                        <el-input
                            type="text"
                            placeholder="手机号"
                            v-model="formData.mobile"
                        />
                        <i class="iconfont icon-phone" />
                    </div>
                </el-form-item>

                <el-form-item
                    class="input-prepend"
                    prop="password"
                    :rules="[
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur',
                        },
                    ]"
                >
                    <div>
                        <el-input
                            type="password"
                            placeholder="密码"
                            v-model="formData.password"
                        />
                        <i class="iconfont icon-password" />
                    </div>
                </el-form-item>

                <div class="btn">
                    <input
                        type="button"
                        class="sign-in-button"
                        value="登录"
                        @click="login()"
                    />
                </div>
            </el-form>
            <!-- 更多登录方式 -->
            <div class="more-sign">
                <h6>社交帐号登录</h6>
                <ul>
                    <li>
                        <a
                            id="weixin"
                            class="weixin"
                            target="_blank"
                            href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
                            ><i class="iconfont icon-weixin"
                        /></a>
                    </li>
                    <li>
                        <a id="qq" class="qq" target="_blank" href="#"
                            ><i class="iconfont icon-qq"
                        /></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import { login, getUserInfo } from "../api/user";
import { mapMutations } from 'vuex';
import jsCookie from 'js-cookie'

export default {
    layout: "type-1",

    data() {
        return {
            //封装登录手机号和密码对象
            formData: {
                mobile: "18520568417",
                password: "123",
            },
        };
    },

    methods: {
        ...mapMutations(['saveUserInfo', 'saveTokenR']),
        async login() {
            const result = await login(this.formData);
            if (result.success) {
                this.saveTokenR(result.data.record)
                await this.getUserInfo()
                this.$message.success("登录成功");
                this.$router.push("/")
            } else {
                this.$message.success("登录失败");
            }
        },

        checkPhone(rule, value, callback) {
            if (!/^1[34578]\d{9}$/.test(value)) {
                return callback(new Error("手机号码格式不正确"));
            }
            return callback();
        },

        saveTokenR(tokenR) {
            const { token, expiresDays, expiresTime } = tokenR
            jsCookie.set('token', token, { expires: expiresDays })
            jsCookie.set('expiresTime', expiresTime)
        },

        // 获取用户信息
        async getUserInfo() {
            const result = await getUserInfo()
            if (result.success) {
                const { record } = result.data
                jsCookie.set('userInfo', record)
            }
        }
    },
};

</script>
<style>
.el-form-item__error {
    z-index: 9999999;
}

.sign-up-container {
    width: 40%;
}
</style>