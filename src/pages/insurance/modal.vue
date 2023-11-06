<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Seguro' : 'Cadastrar Seguro'" :footer="null"
            width="800px">

            <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="save" :hideRequiredMark="true">
                <a-row>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Tipo de Cobertura" name="nome"
                            :rules="[{ required: true, message: 'Campo tipo é obrigatório' }]">
                            <a-input v-model:value="data.nome" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Preço" name="preco"
                            :rules="[{ required: true, message: 'Campo preço é obrigatório' }]">
                            <a-input v-model:value="data.preco" v-money="money" />
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

import { Money } from 'v-money'

export default {
    components: {
        Money
    },
    props: ['openModal', 'idEdit'],
    data() {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false
            },
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
                return this.$store.getters['insurance/getData'];
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

                const response = await this.$store.dispatch('insurance/save', data);

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);
                
                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('insurance/update', { id: this.$props.idEdit, data: data });

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();

            this.$store.commit('insurance/clearForm', { nome: null, preco: null, });

            this.$emit('close', close);
        },
    },
}
</script>