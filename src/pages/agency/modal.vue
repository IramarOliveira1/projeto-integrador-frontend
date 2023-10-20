<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Agência' : 'Cadastrar Agência'" :footer="null"
            width="800px">
            <a-form layout="vertical" ref="form" name="basic" :model="{ ...data.address, ...data }" @finish="save"
                :hideRequiredMark="true">
                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Nome" name="nome"
                            :rules="[{ required: true, message: 'Campo nome é obrigatório' }]">
                            <a-input v-model:value="data.nome" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Telefone" name="telefone"
                            :rules="[{ required: true, message: 'Campo telefone é obrigatório' }]">
                            <a-input v-model:value="data.telefone" v-mask="'## #####-####'" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">

                        <a-form-item name="quantidade_total">
                            Quantidade
                            <a-tooltip class="tooltip-password"
                                title="Campo quantidade é alimentado de acordo com a quantidade de veiculos cadastrados na agência!">
                                <InfoCircleTwoTone two-tone-color="#ea8b0e" />
                            </a-tooltip>
                            <a-input v-model:value="data.quantidade_total" disabled />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item name="cep" :rules="[{ required: true, message: 'Campo cep é obrigatório' }]">
                            CEP
                            <a-input v-model:value="data.address.cep" v-mask="'#####-###'" @blur="viaCep" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Endereço" name="logradouro">
                            <a-input v-model:value="data.address.logradouro" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Complemento" name="complemento">
                            <a-input v-model:value="data.address.complemento" />
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
                        <a-form-item label="Cidade" name="cidade">
                            <a-input v-model:value="data.address.cidade" disabled />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Bairro" name="bairro">
                            <a-input v-model:value="data.address.bairro" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Número" name="numero"
                            :rules="[{ required: true, message: 'Campo número é obrigatório' }]">
                            <a-input v-model:value="data.address.numero" type="number" min="0" />
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
    props: ['openModal', 'idEdit'],
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
                return this.$store.getters['agency/getData'];
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

                const convertData = {
                    nome: data.nome,
                    telefone: data.telefone,
                    quantidade_total: data.quantidade_total,
                    address: {
                        complement: data.complemento,
                        uf: data.uf,
                        city: data.cidade,
                        neighborhood: data.bairro,
                        number: data.numero,
                        zipcode: data.cep,
                        address: data.logradouro,
                    },
                }

                if (this.modalEdit) {
                    this.update(convertData);

                    return;
                }

                const response = await this.$store.dispatch('agency/save', convertData);

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('agency/update', { id: this.$props.idEdit, data: data });

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async viaCep() {
            try {
                if (this.data.address.cep.length >= 9) {
                    const response = await this.$store.dispatch('agency/viaCep', this.data.address);

                    if (response.data.erro) {
                        this.$notification.notification(400, "CEP inv�lido!");
                        this.clearForm();
                    }
                }
            } catch (error) {
                this.$notification.notification(400, "CEP inv�lido!");
                this.clearForm();
            }
        },

        clearForm() {
            this.$store.commit('agency/clearForm',
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
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();

            this.clearForm();

            this.$emit('close', close);
        },
    },
}
</script>