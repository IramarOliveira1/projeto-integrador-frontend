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
                        <h5>Cadastre-se e tenha acesso as melhores ofertas de ve�culos do Brasil.</h5>
                    </div>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Nome" name="name"
                                :rules="[{ required: true, message: 'Campo nome � obrigat�rio' }]">
                                <a-input v-model:value="data.name" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="CPF" name="cpf"
                                :rules="[{ required: true, message: 'Campo cpf � obrigat�rio' }]">
                                <a-input v-model:value="data.cpf" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label=" E-mail" name="email"
                                :rules="[{ required: true, message: 'Campo e-mail � obrigat�rio' }]">
                                <a-input v-model:value="data.email" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Senha" name="password"
                                :rules="[{ required: true, message: 'Campo senha � obrigat�rio' }]">
                                <a-input-password v-model:value="data.password" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Telefone" name="phone"
                                :rules="[{ required: true, message: 'Campo telefone � obrigat�rio' }]">
                                <a-input v-model:value="data.phone" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="CEP" name="zipcode"
                                :rules="[{ required: true, message: 'Campo cep � obrigat�rio' }]">
                                <a-input v-model:value="data.address.zipcode" @blur="viaCep" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Endere�o" name="address">
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
                            <a-form-item label="N�mero" name="number"
                                :rules="[{ required: true, message: 'Campo n�mero � obrigat�rio' }]">
                                <a-input v-model:value="data.address.number" />
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

import axios from '../../../services/api.js';

export default {
    data() {
        return {
            data: {
                name: null,
                email: null,
                password: null,
                cpf: null,
                phone: null,
                address: {
                    complement: null,
                    uf: null,
                    city: null,
                    neighborhood: null,
                    number: null,
                    zipcode: null,
                    address: null
                },
            }
        }
    },
    methods: {
        async save(data) {
            try {
                const response = await axios.post('/user/register', data);

                this.$notification.notification(response.status, response.data.message);

                this.$router.push('/login')
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async viaCep() {
            try {
                if (this.data.address.zipcode.length >= 9) {
                    const response = await this.$axios.get(`https://viacep.com.br/ws/${this.data.address.zipcode}/json/`);
                    this.data.address.address = response.data.logradouro;
                    this.data.address.uf = response.data.uf;
                    this.data.address.city = response.data.localidade;
                    this.data.address.neighborhood = response.data.bairro;
                }
            } catch (error) {
                this.$notification.notification(400, "CEP inv�lido!");

                this.clearForm({
                    address: {
                        address: null,
                        zipcode: null,
                        uf: null,
                        city: null,
                        neighborhood: null,
                    }
                });
            }
        },
        clearForm(form) {
            this.data = form;
        }
    },
}
</script>