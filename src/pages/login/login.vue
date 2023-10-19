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
                        :rules="[{ required: true, message: 'Campo e-mail � obrigat�rio' }]">
                        <a-input v-model:value="data.email" size="large" />
                    </a-form-item>

                    <a-form-item label="Senha" name="password"
                        :rules="[{ required: true, message: 'Campo senha � obrigat�rio!' }]">
                        <a-input-password v-model:value="data.password" size="large" />
                    </a-form-item>


                    <div class="link-forgot">
                        <router-link to="/" class="">
                            Voltar para home?
                        </router-link>
                        <router-link to="/recuperar-senha">
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
                email: "iramar.oliveira@trc.sebraeba.com.br",
                password: "123456"
            }
        }
    },
    methods: {
        async login(data) {
            try {

                localStorage.clear();

                const response = await axios.post('/user/login', data);

                const user = { isAuthenticated: true, ...response.data }

                localStorage.setItem('user', JSON.stringify(user));

                this.$store.commit('user/setUser', user);

                
                // this.$store.commit('generic/setModalEdit', true);

                // this.$store.commit('setUserLogin', response.data);

                this.$router.push('/dashboard')
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
    },
}
</script>