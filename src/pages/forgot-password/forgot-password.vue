<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../assets/images/forgot-password.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="14">
                <a-form layout="vertical" name="basic" :model="data" @finish="forgotPassword" :hideRequiredMark="true">
                    <div class="title">
                        <h3>Esqueceu sua senha?</h3>
                        <h5>Para recuperar seu acesso, precisamos do seu E-mail.</h5>
                    </div>
                    <a-form-item label="E-mail" name="email"
                        :rules="[{ required: true, message: 'Campo e-mail é obrigatório' }]">
                        <a-input v-model:value="data.email" size="large" />
                    </a-form-item>

                    <router-link to="/login" class="link-forgot">
                        voltar e fazer Login
                    </router-link>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init" size="large">
                            Continuar
                        </a-button>
                    </a-form-item>

                </a-form>
            </a-col>
        </div>
    </div>
</template>

<script>
import './forgot-password.css';
import axios from '../../services/api.js';

export default {
    data() {
        return {
            data: {
                email: null,
            }
        }
    },
    methods: {
        async forgotPassword(data) {
            try {
                const response = await axios.post('/forgot-password', data);
                console.log(response);
            } catch (error) {
                console.log(this.error);
            }
        },
    },
}
</script>