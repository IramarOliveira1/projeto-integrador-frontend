<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Cliente' : 'Cadsatrar Cliente'" :footer="null">
            <a-form layout="vertical" name="basic" :model="{ ...data.address, ...data }" @finish="save"
                :hideRequiredMark="true">
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
export default {
    props: ['openModal', 'idUserEdit'],
    data() {
        return {
            isActiveModal: false
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
                return this.$store.getters.getUser;
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

                if (this.modalEdit) {
                    this.update(data);

                    return;
                }

                const response = await this.$store.dispatch('save', data);

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();

                this.$store.commit('clearForm', {
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

                const response = await this.$store.dispatch('update', { id: this.$props.idUserEdit, data: data });

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async viaCep() {
            try {
                if (this.data.address.zipcode.length >= 9) {
                    await this.$store.dispatch('viaCep', this.data.address);
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
            this.$store.commit('clearForm', {
                name: null, email: null, password: null, cpf: null, phone: null, address: {
                    address: null, zipcode: '', uf: null, city: null, neighborhood: null,
                }
            });
            this.$emit('close', close);
        },
    },
}
</script>