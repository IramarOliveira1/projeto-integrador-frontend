<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Cliente' : 'Cadastrar Cliente'" :footer="null"
            width="800px">
            <a-form layout="vertical" ref="form" name="basic" :model="{ ...data.address, ...data }" @finish="save"
                :hideRequiredMark="true">
                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Nome" name="name"
                            :rules="[{ required: true, message: 'Campo nome � obrigatório' }]">
                            <a-input v-model:value="data.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="CPF" name="cpf"
                            :rules="[{ required: true, message: 'Campo cpf � obrigatório' }]">
                            <a-input v-model:value="data.cpf" v-mask="'###.###.###-##'" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item name="email" :rules="[{ required: true, message: 'Campo e-mail � obrigatório' }]">
                            E-mail
                            <a-input v-model:value="data.email" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item name="password"
                            :rules="[modalEdit ? { required: false } : { required: true, message: 'Campo senha � obrigatório' }]">
                            Senha

                            <a-tooltip v-if="modalEdit" class="tooltip-password"
                                title="Administrador n�o pode alterar senha de clientes!">
                                <InfoCircleTwoTone two-tone-color="#ea8b0e" />
                            </a-tooltip>
                            <a-input-password v-model:value="data.password" :disabled="modalEdit ? true : false" />
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
                <a-form-item class="ant-modal-footer">
                    <a-button key="back" @click="closeModal">Fechar</a-button>
                    <a-button type="primary" html-type="submit" v-if="!modalEdit">Cadastrar</a-button>
                    <a-button type="primary" html-type="submit" v-else>Atualizar</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>

import { InfoCircleTwoTone } from '@ant-design/icons-vue';

import { VueTheMask } from 'vue-the-mask'

export default {
    components: {
        InfoCircleTwoTone,
        VueTheMask
    },
    props: ['openModal', 'idUserEdit'],
    data() {
        return {
            isActiveModal: false,
        }
    },
    computed: {
        showModal: {
            get() {
                return this.isActiveModal = this.openModal;
            },
        },
        data: {
            get() {
                return this.$store.getters['user/getData'];
            },
        },
        modalEdit: {
            get() {
                return this.$store.getters['generic/getModalEdit'];
            },
        }
    },
    methods: {
        async save(data) {
            try {

                if (this.modalEdit) {
                    this.update(data);

                    return;
                }

                const response = await this.$store.dispatch('user/save', { data: data, role: 'USER' });

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();

                this.$store.commit('user/clearForm', {
                    name: null, email: null, password: null, cpf: null, phone: null, address: {
                        address: null, zipcode: '', uf: null, city: null, neighborhood: null,
                    }
                });
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('user/update', { id: this.$props.idUserEdit, data: data, role: 'USER' });

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();
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
        closeModal(close) {
            this.$refs['form'].clearValidate();

            this.$store.commit('user/clearForm', {
                name: null, email: null, password: null, cpf: null, phone: null, address: {
                    address: null, zipcode: '', uf: null, city: null, neighborhood: null,
                }
            });
            this.$emit('close', close);
        },
    },
}
</script>