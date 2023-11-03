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


                    <div class="link-forgot-password">
                        <router-link to="/login">
                            voltar e fazer Login
                        </router-link>
                    </div>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init" size="large"
                            :disabled="data.loading">
                            <a-spin v-if="data.loading" :indicator="data.indicator" />
                            <div v-else>
                                Continuar
                            </div>
                        </a-button>
                    </a-form-item>

                </a-form>
            </a-col>
        </div>
    </div>
</template>

<script>
import axios from '../../services/api.js';

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
export default {
    data() {
        return {
            data: {
                indicator: h(LoadingOutlined, {
                    style: {
                        fontSize: '22px',
                        color: '#fff'
                    },
                    spin: true,
                }),
                loading: false,
                email: null,
            }
        }
    },
    methods: {
        async sendMail(data) {
            try {
                this.data.loading = true;

                const response = await axios.post('/user/send-mail', data);

                this.data.email = null;

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            } finally {
                this.data.loading = false;
            }
        },
    },
}
</script>