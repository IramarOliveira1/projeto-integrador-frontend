<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../assets/images/login.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="14">
                <a-form layout="vertical" name="basic" :model="data" @finish="login" :hideRequiredMark="true">
                    <div >
                        <img class="image-login" src="../../assets/images/logo_blue.png" alt="">
                    </div>
                    <a-form-item label="E-mail" name="email"
                        :rules="[{ required: true, message: 'Campo e-mail È obrigatÛrio' }]">
                        <a-input v-model:value="data.email" size="large" />
                    </a-form-item>

                    <a-form-item label="Senha" name="password"
                        :rules="[{ required: true, message: 'Campo senha È obrigatÛrio!' }]">
                        <a-input-password v-model:value="data.password" size="large" />
                    </a-form-item>

                    <router-link to="/recuperar-senha" class="link-forgot">
                        esqueceu sua senha?
                    </router-link>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init" size="large">Entrar</a-button>
                    </a-form-item>

                    <div class="link-register">
                        <span>n√£o tem cadastro?</span>
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
                email: null,
                password: null
            }
        }
    },
    methods: {
        async login(data) {
            try {
                const response = await axios.post('/login', data);
                console.log(response);
            } catch (error) {
                console.log(this.error);
            }
        },
    },
}
</script>