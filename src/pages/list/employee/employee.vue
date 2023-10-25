<template>
    <div class="container-main">
        <a-form layout="vertical" name="basic" :model="data" @finish="filter" :hideRequiredMark="true">
            <a-row class="row-filter-general">

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item label="FILTRAR POR NOME OU CPF" name="nameOrCpf"
                        :rules="[{ required: true, message: 'Campo filtrar � obrigat�rio!' }]">
                        <a-input v-model:value="data.nameOrCpf" size="large" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-filter-general"
                            size="large">Filtrar</a-button>
                        <a-button type="primary" @click="clearFilter" v-if="buttonFilter"
                            class="button-filter-general clear-filter" size="large">Limpar Filtro</a-button>
                    </a-form-item>

                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <div class="button-add">
                            <a-button type="primary" class="button-add-general" size="large"
                                @click="showModal">Cadastrar</a-button>
                        </div>
                    </a-form-item>
                </a-col>

            </a-row>
        </a-form>

        <a-table :columns="columns" :data-source="getUsers" :row-key="record => record.id" bordered
            :pagination="{ pageSize: 9 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">

                    <a-tooltip
                        :title="record.id === getUser.id ? 'Para atualizar ou excluir cadastro entre na aba de perfil.' : ''">
                        <a-button @click="index(record.id)" :disabled="record.id === getUser.id">
                            <EditTwoTone />
                        </a-button>

                        <a-popconfirm title="Deseja realmente excluir esse registro ?" ok-text="Sim" cancel-text="Não"
                            @confirm="destroy(record.id)" :disabled="record.id === getUser.id">
                            <a-button :disabled="record.id === getUser.id">
                                <DeleteTwoTone two-tone-color="#ef3413" />
                            </a-button>
                        </a-popconfirm>
                    </a-tooltip>
                </template>
            </template>
        </a-table>
        <modal :openModal="openModal" :idUserEdit="idUserEdit" @close="openModal = false" />
    </div>
</template>

<script>

import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';

import modal from './modal/modal.vue';

export default {
    components: {
        modal,
        DeleteTwoTone,
        EditTwoTone
    },
    data() {
        return {
            data: {
                nameOrCpf: null
            },
            columns: [
                {
                    title: 'id',
                    dataIndex: 'id',
                    width: '20%',
                    responsive: ['sm'],

                },
                {
                    title: 'Nome',
                    dataIndex: 'name',
                    width: '20%',
                },
                {
                    title: 'CPF',
                    dataIndex: 'cpf',
                    width: '20%',
                    responsive: ['sm'],
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    width: '10%',
                    align: 'center',
                },
            ],
            openModal: false,
            idUserEdit: null,
            isEmploy: true,
        }
    },
    computed: {
        getUsers: {
            get() {
                return this.$store.getters['user/getUsers'];
            }
        },
        getUser: {
            get() {
                return this.$store.getters['user/getUser'];
            }
        },
        buttonFilter: {
            get() {
                return this.$store.getters['generic/getFilterExits'];
            },
        }
    },
    mounted() {

        this.$store.commit('generic/setFilterExits', false);
        this.$store.dispatch('user/all', {
            role: 'ADMIN'
        });
    },
    methods: {
        async index(id) {
            try {
                await this.$store.dispatch('user/index', id);

                this.$store.commit('generic/setModalEdit', true);

                this.openModal = true;
                this.idUserEdit = id;
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async filter(data) {
            try {

                await this.$store.dispatch('user/filter', { data: data.nameOrCpf, role: 'ADMIN' });

                this.data.nameOrCpf = null;

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async clearFilter() {
            this.$store.dispatch('user/all', { role: 'ADMIN' });

            this.$store.commit('generic/setFilterExits', false);
        },

        async destroy(id) {
            try {
                const response = await this.$store.dispatch('destroy', { id: id, role: 'ADMIN' });

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        showModal() {
            this.$store.commit('clearForm', {
                name: null, email: null, password: null, cpf: null, phone: null, address: {
                    address: null, zipcode: '', uf: null, city: null, neighborhood: null,
                }
            });

            this.$store.commit('generic/setModalEdit', false);
            this.openModal = true
        }
    }
}
</script>