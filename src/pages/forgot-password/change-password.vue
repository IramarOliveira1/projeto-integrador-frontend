<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../assets/images/forgot-password.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="14">
                <a-form layout="vertical" name="basic" :model="data" @finish="changePassword" :hideRequiredMark="true">
                    <div class="title">
                        <h2>Redefinir sua senha.</h2>
                        <h5>Para recuperar seu acesso, preencha os campos abaixo.</h5>
                    </div>
                    <a-form-item label="Código" name="code"
                        :rules="[{ required: true, message: 'Campo código é obrigatório' }]">
                        <a-input v-model:value="data.code" size="large" />
                    </a-form-item>

                    <a-form-item label="Senha" name="password"
                        :rules="[{ required: true, message: 'Campo senha é obrigatório' }]">
                        <a-input-password v-model:value="data.password" size="large" />
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
import axios from '../../services/api.js';

export default {
    data() {
        return {
            data: {
                code: null,
                password: null,
            }
        }
    },
    methods: {
        async changePassword(data) {
            try {
                const response = await axios.post('/user/verify-code', data);

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
    },
}
</script>