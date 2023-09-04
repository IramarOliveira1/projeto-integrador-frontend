<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Seguro' : 'Cadastrar Seguro'" :footer="null"
            width="800px">

            <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="save" :hideRequiredMark="true">
                <a-row>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Tipo de Cobertura" name="tipo"
                            :rules="[{ required: true, message: 'Campo tipo é obrigat�rio' }]">
                            <a-input v-model:value="data.tipo" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Preço" name="preco"
                            :rules="[{ required: true, message: 'Campo preço é obrigat�rio' }]">
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
    props: ['openModal', 'idUserEdit'],
    data() {
        return {
            data: {
                tipo: null,
                preco: null,
            },
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
                return this.$store.getters.getModalEdit;
            },
        }
    },
    methods: {
        async save(data) {
            try {

                console.log(data);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                console.log('entrei');

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();

            // this.$store.commit('clearForm', {
            //     name: null, email: null, password: null, cpf: null, phone: null, address: {
            //         address: null, zipcode: '', uf: null, city: null, neighborhood: null,
            //     }
            // });
            this.$emit('close', close);
        },
    },
}
</script>