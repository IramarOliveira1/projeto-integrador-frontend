<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../assets/images/login.png" alt="Imagem de login">
        </div>

        <div class="form-init">
            <a-col :span="14">
                <a-form layout="vertical" name="basic" :model="data" @finish="login" :hideRequiredMark="true">
                    <div>
                        <img class="image-login" src="../../assets/images/logo_blue.png" alt="">
                    </div>
                    <a-form-item label="E-mail" name="email"
                        :rules="[{ required: true, message: 'Campo e-mail é obrigatório' }]">
                        <a-input v-model:value="data.email" size="large" />
                    </a-form-item>

                    <a-form-item label="Senha" name="password"
                        :rules="[{ required: true, message: 'Campo senha é obrigatório!' }]">
                        <a-input-password v-model:value="data.password" size="large" />
                    </a-form-item>


                    <div class="link-forgot">
                        <router-link to="/" class="">
                            Voltar para home?
                        </router-link>
                        <router-link to="/esqueceu-senha">
                            esqueceu sua senha?
                        </router-link>
                    </div>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init" size="large">Entrar</a-button>
                    </a-form-item>

                    <div class="link-register">
                        <span>não tem cadastro?</span>
                        <router-link to="/cadastrar-cliente">
                            <strong>clique aqui</strong>
                        </router-link>
                    </div>
                </a-form>
            </a-col>
        </div>
    </div>
</template>

<script>
import './login.css';

import axios from '../../services/api.js';

export default {
    data() {
        return {
            data: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async login(data) {
            try {

                localStorage.clear();

                const response = await axios.post('/user/login', data);

                localStorage.setItem('token', response.data.token);

                localStorage.setItem('user', response.data.id);

                this.$store.commit('user/setUser', response.data);

                this.$store.commit('user/setIsAuthenticated', true);

                this.$router.push('/dashboard');
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
    },
}
</script>