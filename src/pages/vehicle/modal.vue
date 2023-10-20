<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Veiculo' : 'Cadastrar Veiculo'" :footer="null"
            width="800px">

            <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="save" :hideRequiredMark="true">

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Marca" name="marca"
                            :rules="[{ required: true, message: 'Campo marca é obrigatório' }]">
                            <a-input v-model:value="data.marca" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Modelo" name="modelo"
                            :rules="[{ required: true, message: 'Campo modelo é obrigatório' }]">

                            <a-select v-model:value="data.modelo.id" placeholder="Selecione um modelo" :options="models"
                                :field-names="{ label: 'nome', value: 'id' }"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Placa" name="placa"
                            :rules="[{ required: true, message: 'Campo placa é obrigatório' }]">
                            <a-input v-model:value="data.placa" v-mask="'AAA-####'" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Ano" name="ano"
                            :rules="[{ required: true, message: 'Campo ano é obrigatório' }]">
                            <a-input v-model:value="data.ano" type="number" min="0" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Cor" name="cor"
                            :rules="[{ required: true, message: 'Campo cor é obrigatório' }]">
                            <a-input v-model:value="data.cor" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Agência" name="agencia"
                            :rules="[{ required: true, message: 'Campo agencia é obrigatório' }]">

                            <a-select v-model:value="data.agencia.id" placeholder="Selecione uma agência"
                                :options="agencies" :field-names="{ label: 'nome', value: 'id' }"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Capacidade" name="capacidade"
                            :rules="[{ required: true, message: 'Campo capacidade é obrigatório' }]">
                            <a-input v-model:value="data.capacidade" type="number" min="0" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }" v-if="modalEdit">
                        <a-form-item label="Categoria" name="categoria">
                            <a-input v-model:value="data.modelo.categoria" disabled />
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

import { VueTheMask } from 'vue-the-mask';

import { InboxOutlined } from '@ant-design/icons-vue';

export default {
    components: {
        InboxOutlined,
        VueTheMask,
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

        modalEdit: {
            get() {
                return this.$store.getters['generic/getModalEdit'];
            },
        },

        data: {
            get() {
                return this.$store.getters['vehicle/getData'];
            },
        },

        agencies: {
            get() {
                return this.$store.getters['vehicle/getAgencies'];
            },
        },

        models: {
            get() {
                return this.$store.getters['vehicle/getModels'];
            },
        },
    },

    methods: {
        async save(data) {
            try {

                if (this.modalEdit) {
                    this.update(data);

                    return;
                }

                const response = await this.$store.dispatch('vehicle/save', data);

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('vehicle/update', { id: this.$props.idEdit, data });

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();

            this.$store.commit('vehicle/clearForm', {
                ano: null,
                capacidade: null,
                cor: null,
                marca: null,
                placa: null,
                agencia: {
                    id: null
                },
                modelo: {
                    id: null
                },
            });

            this.$emit('close', close);
        },
    },
}
</script>