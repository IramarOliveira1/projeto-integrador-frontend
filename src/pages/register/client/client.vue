<template>
    <div class="container-init">
        <div class="image-init">
            <img src="../../../assets/images/register-client.png" alt="">
        </div>

        <div class="form-init">
            <a-col :span="20" class="register-client">
                <a-form layout="vertical" name="basic" :model="data" @finish="save" :hideRequiredMark="true">
                    <h3>Cadastre-se</h3>
                    <h5>Cadastre-se e tenha acesso as melhores ofertas de veículos do Brasil.</h5>

                    <a-form-item label="Nome" name="name"
                        :rules="[{ required: true, message: 'Campo nome é obrigatório' }]">
                        <a-input v-model:value="data.name" size="large" />
                    </a-form-item>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label=" E-mail" name="email"
                                :rules="[{ required: true, message: 'Campo e-mail é obrigatório' }]">
                                <a-input v-model:value="data.email" size="large" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="Senha" name="password"
                                :rules="[{ required: true, message: 'Campo senha é obrigatório' }]">
                                <a-input-password v-model:value="data.password" size="large" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="CPF" name="cpf"
                                :rules="[{ required: true, message: 'Campo cpf é obrigatório' }]">
                                <a-input v-model:value="data.cpf" size="large" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="CEP" name="cep"
                                :rules="[{ required: true, message: 'Campo cep é obrigatório' }]">
                                <a-input v-model:value="data.cep" size="large" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="Endereço" name="address">
                                <a-input v-model:value="data.address" size="large" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="Complemento" name="complement">
                                <a-input v-model:value="data.complement" size="large" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="UF" name="uf">
                                <a-input v-model:value="data.uf" size="large" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="cidade" name="city">
                                <a-input v-model:value="data.city" size="large" disabled />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="Bairro" name="neighborhood">
                                <a-input v-model:value="data.neighborhood" size="large" disabled />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 24 }" :xl="{ span: 12 }">
                            <a-form-item label="Número" name="number"
                                :rules="[{ required: true, message: 'Campo número é obrigatório' }]">
                                <a-input v-model:value="data.number" size="large" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-init" size="large">Entrar</a-button>
                    </a-form-item>

                    <!-- <div class="link-register">
                    <span>nÃ£o tem cadastro?</span>
                    <router-link to="/cadastrar-cliente">
                        <strong>clique aqui</strong>
                    </router-link>
                </div> -->
                </a-form>
            </a-col>
        </div>
    </div>
</template>

<script>
import './client.css';

import axios from '../../../services/api.js';

export default {
    data() {
        return {
            data: {
                name: null,
                email: null,
                password: null,
                cpf: null,
                cep: null,
                address: null,
                complement: null,
                uf: null,
                city: null,
                neighborhood: null,
                number: null,
            }
        }
    },
    methods: {
        async save(data) {
            try {
                const response = await axios.post('/client', data);
                console.log(response);
            } catch (error) {
                console.log(this.error);
            }
        },
    },
}
</script>