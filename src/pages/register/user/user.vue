<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../../assets/images/register-client.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="20" class="register-client">
                <a-form layout="vertical" name="basic" :model="{ ...data.address, ...data }" @finish="save"
                    :hideRequiredMark="true">
                    <div class="title">
                        <h2>Cadastre-se</h2>
                        <h5>Cadastre-se e tenha acesso as melhores ofertas de veículos do Brasil.</h5>
                    </div>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Nome" name="name"
                                :rules="[{ required: true, message: 'Campo nome é obrigatório' }]">
                                <a-input v-model:value="data.name" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="CPF" name="cpf"
                                :rules="[{ required: true, message: 'Campo cpf é obrigatório' }]">
                                <a-input v-model:value="data.cpf" v-mask="'###.###.###-##'" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label=" E-mail" name="email"
                                :rules="[{ required: true, message: 'Campo e-mail é obrigatório' }]">
                                <a-input v-model:value="data.email" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Senha" name="password"
                                :rules="[{ required: true, message: 'Campo senha é obrigatório' }]">
                                <a-input-password v-model:value="data.password" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Telefone" name="phone"
                                :rules="[{ required: true, message: 'Campo telefone é obrigatório' }]">
                                <a-input v-model:value="data.phone" v-mask="'## #####-####'" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="CEP" name="zipcode"
                                :rules="[{ required: true, message: 'Campo cep é obrigatório' }]">
                                <a-input v-model:value="data.address.zipcode" v-mask="'#####-###'" @blur="viaCep" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Endereço" name="address">
                                <a-input v-model:value="data.address.address" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Complemento" name="complement">
                                <a-input v-model:value="data.address.complement" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="UF" name="uf">
                                <a-input v-model:value="data.address.uf" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Cidade" name="city">
                                <a-input v-model:value="data.address.city" disabled />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Bairro" name="neighborhood">
                                <a-input v-model:value="data.address.neighborhood" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Número" name="number"
                                :rules="[{ required: true, message: 'Campo número é obrigatório' }]">
                                <a-input v-model:value="data.address.number" type="number" min="0" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <router-link to="/login" class="link-forgot">
                        voltar e fazer Login
                    </router-link>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init button-register">Cadastrar</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </div>
    </div>
</template>

<script>
import './user.css';

import { VueTheMask } from 'vue-the-mask'

export default {
    components: {
        VueTheMask
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['user/getData'];
            },
        }
    },
    methods: {
        async save(data) {
            try {

                const response = await this.$store.dispatch('user/save', { data: data, role: 'USER' });

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('user/clearForm', {
                    name: null, email: null, password: null, cpf: null, phone: null, address: {
                        address: null, zipcode: '', uf: null, city: null, neighborhood: null,
                    }
                });

                localStorage.clear();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async viaCep() {
            try {
                if (this.data.address.zipcode.length >= 9) {
                    await this.$store.dispatch('user/viaCep', this.data.address);
                }
            } catch (error) {
                this.$notification.notification(400, "CEP inv�lido!");

                this.$store.commit('clearForm',
                    {
                        address: {
                            address: null,
                            zipcode: '',
                            uf: null,
                            city: null,
                            neighborhood: null,
                        }
                    }
                );
            }
        },
    },
}
</script>