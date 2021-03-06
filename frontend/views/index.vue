<style scoped lang="less">
.layout{
    background: #f5f7f9;
    border-radius: 4px;
    overflow: hidden;
    min-height: 100%;
}
.layout-header {
    display: flex;
    background: transparent;
    position: relative;
}
.layout-main {
    width: 100%;
}
.layout-menu {
    display: flex;
    margin: auto;
    width: 100%;
    background: transparent;
}
.layout-logo{
    justify-content: flex-start;
    align-content: center; 
    margin: 5px auto;
    float: left;
    background-size: 100%;
    display: flex;
    img {
        width: 100%;
    }
}
.layout-nav{
    justify-content: flex-end;
    margin: 0 auto;
    margin-right: 0px;
}
.layout-sidebar {
    position: fixed;
    left: 0;
    height: 100%;
    z-index: 999;
}
.layout-footer{
    background: transparent;
    p {
        padding: 1em;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
        color: #808080;
        z-index: inherit;
        width: 100%;
        overflow: hidden;
    }
}
.layout-user {
    color: #fff;
    padding: 10px 24px;
    font-size: 2em;
    line-height: 1em;
    flex-direction: row;
    display: flex;
    height: auto;
    i {
        flex: 0 0 1em;
        vertical-align: middle
    }
    span {
        word-break: break-all
    }
}
.menu-item {
    position: relative;
}

.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
.login-footer {
    text-align: center
}
</style>
<template>
    <Layout class="layout">
        <Sider :class="'layout-sidebar'" default-collapsed breakpoint="xs" collapsible :collapsed-width="0" v-model="isCollapsed">
            <Header class="layout-user" v-if="isLogin">
                <!-- <Icon type="person"></Icon> -->
                <span>{{loginUser.nickname}}</span>
            </Header>
            <Menu :active-name="menuActive" theme="dark" width="auto" :class="menuitemClasses">
                <MenuItem name="1-4" v-if="isLogin">
                    <span @click="logoutAccount"><Icon type="log-out"></Icon>
                    <span>退出</span></span>
                </MenuItem>
                <MenuItem name="1-0" v-if="!isLogin">
                    <span @click="loginModel = true"><Icon type="log-in"></Icon>
                    <span>登录</span></span>
                </MenuItem>
            </Menu>
            <Footer class="layout-footer">
                <p>{{ (new Date()).getFullYear() }} &copy; <a hrep="https://github.com/imlinhanchao/eng" target="_blank">Hancel Lin</a></p>
            </Footer>
            <div slot="trigger"></div>
        </Sider>
        <Layout class="layout-main" :class="collapsed">
            <Header class="layout-header">
                <div class="layout-logo">
                    <img src="../assets/logo.svg" alt="logo"/>
                </div>
            </Header>
            <Content :style="{padding: '15px 15px'}">
                <Layout>
                    <router-view />
                </Layout>
            </Content>
        </Layout>
        <Modal v-model="loginModel" title="登录" width="300">
            <Form ref="loginForm" :model="login" :rules="ruleValidate" class="layout-form">
                <FormItem prop="username">
                    <Input type="text" v-model="login.username" placeholder="用户名" @keyup.13="document.getElementById('password').focus()">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="passwd">
                    <Input id="password" :type="passwdType" v-model="login.passwd" placeholder="密码" @keyup.13="loginSubmit('loginForm')">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        <Button slot="append" :icon="showIcon" @click="isPasswdShow=!isPasswdShow" style="box-shadow:none;" :loading="login_loading"></Button>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer" class="login-footer">
                <Button type="primary" @click="loginSubmit('loginForm')" :loading="login_loading">登录</Button>
            </div>
        </Modal>
        <BackTop :style="{
            right: 'auto',
            top: '1em',
            left: 'calc(50% - 1em)'
        }"></BackTop>
    </Layout>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                loginModel: false,
                login: {
                    username: '',
                    passwd: ''
                },
                isPasswdShow: false,
                ruleValidate: {
                    username: [
                        { required: true, message: '请输入用户名。', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, message: '请输入密码。', trigger: 'blur' },
                    ]
                },
                login_loading: false,
                menuActive: '1-1'
            };
        },
        computed: {
            loginUser () {
                return this.$store.getters.userInfo;
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            name () {
                return this.loginUser ? this.loginUser.name : '';
            },
            isLogin () {
                return this.$store.getters.isLogin;
            },
            collapsed() {
                return [
                    this.isCollapsed ? "collapsed" : ""
                ]
            },
            showIcon() {
                return this.isPasswdShow ? 'eye-disabled' : 'eye'
            },
            passwdType () {
                return this.isPasswdShow ? 'text' : 'password'
            },
            compiledMarkdown: function () {
                return this.$marked(this.notes, { sanitize: true })
            }
        },
        mounted () {
        },
        methods: {
            logoutAccount() {
                this.$store.dispatch('logout', (rsp, err) => {
                    if (!rsp || rsp.state != 0) {
                        err = (err && err.message) || rsp.msg
                        this.$Message.error(err);
                    }
                    this.menuActive = '1-1';
                })
            },
            loginSubmit() {
                 this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.login_loading = true;
                        this.$store.dispatch('login', {
                            user: this.login,
                            callback: (rsp, err) => {
                                this.login_loading = false;
                                if (rsp && rsp.state == 0) {
                                    this.loginModel = false;
                                    this.menuActive = '1-1';
                                } else {
                                    err = (err && err.message) || rsp.msg
                                    this.$Message.error(err);
                                }
                            }
                        })
                    }
                });
            }
        }
    }
</script>