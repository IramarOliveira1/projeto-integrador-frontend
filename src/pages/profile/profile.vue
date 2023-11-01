<template>
    <div class="container-main">
        <a-form layout="vertical" ref="form" name="basic" :model="{ ...data.address, ...data }" @finish="update"
            :hideRequiredMark="true">
            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Nome" name="name"
                        :rules="[{ required: true, message: 'Campo nome é obrigatório' }]">
                        <a-input v-model:value="data.name" />
                    </a-form-item>
                </a-col>
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="CPF" name="cpf" :rules="[{ required: true, message: 'Campo cpf é obrigatório' }]">
                        <a-input v-model:value="data.cpf" v-mask="'###.###.###-##'" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item name="email" :rules="[{ required: true, message: 'Campo e-mail é obrigatório' }]">
                        E-mail
                        <a-input v-model:value="data.email" />
                    </a-form-item>
                </a-col>
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item name="password">
                        Senha
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

            <a-form-item>
                <div class="div-button-update-profile">
                    <a-popconfirm title="Deseja realmente excluir essa conta ?" ok-text="Sim" cancel-text="Não"
                        @confirm="deleteProfile(this.$store.getters['user/getUser'].id)">
                        <a-button type="primary" danger class="button-update-profile"
                            v-if="this.$store.getters['user/getUser'].id !== 1">
                            Excluir conta
                        </a-button>
                    </a-popconfirm>

                    <a-button type="primary" class="button-update-profile" html-type="submit">Atualizar</a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>

import { VueTheMask } from 'vue-the-mask'

import axios from '../../services/api.js';

export default {
    components: {
        VueTheMask,
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['user/getData'];
            },
        },
    },
    mounted() {
        this.index();
    },
    methods: {
        async index() {
            try {
                let id = this.$store.getters['user/getUser'].id;

                if (!id) {
                    id = localStorage.getItem('user');
                }

                this.$store.dispatch('user/index', id);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await axios.put(`user/${this.$store.getters['user/getUser'].id}`, data);

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async deleteProfile(id) {
            try {
                await axios.delete(`user/${id}`);

                this.$store.commit('user/setIsAuthenticated', false);

                localStorage.clear();

                this.$router.push('/login');
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