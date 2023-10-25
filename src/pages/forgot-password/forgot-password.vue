<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../assets/images/send-forgot-password.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="14">
                <a-form layout="vertical" name="basic" :model="data" @finish="sendMail" :hideRequiredMark="true">
                    <div class="title">
                        <h2>Esqueceu sua senha?</h2>
                        <h5>Para recuperar seu acesso, precisamos do seu e-mail.</h5>
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
        async sendMail(data) {
            try {

                const response = await axios.post('/user/send-mail', data);

                this.data.email = null;

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
    },
}
</script>