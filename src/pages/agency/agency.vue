<template>
    <div class="container-main">
        <a-form layout="vertical" name="basic" :model="data" @finish="filter" :hideRequiredMark="true">
            <a-row class="row-filter-general">

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item label="FILTRAR POR NOME DA AGÊNCIA" name="nome"
                        :rules="[{ required: true, message: 'Campo nome é obrigatório!' }]">
                        <a-input v-model:value="data.nome" size="large" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-filter-general"
                            size="large">Filtrar</a-button>
                        <a-button type="primary" @click="clearFilter" class="button-filter-general clear-filter"
                            size="large" v-if="buttonFilter">Limpar Filtro</a-button>
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

        <a-table :columns="columns" :data-source="getAgencies" :row-key="record => record.id" bordered
            :pagination="{ pageSize: 9 }">
            <template #bodyCell="{ column, record }">


                <template v-if="column.key === 'action'">
                    <a-button @click="index(record.id)">
                        <EditTwoTone />
                    </a-button>
                    <a-popconfirm title="Deseja realmente excluir esse registro ?" ok-text="Sim" cancel-text="Não"
                        @confirm="destroy(record.id)">
                        <a-button>
                            <DeleteTwoTone two-tone-color="#ef3413" />
                        </a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
        <modal :openModal="openModal" :idEdit="idEdit" @close="openModal = false" />
    </div>
</template>

<script>

import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';

import modal from './modal.vue';

export default {
    components: {
        modal,
        DeleteTwoTone,
        EditTwoTone
    },
    data() {
        return {
            data: {
                nome: null,
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
                    dataIndex: 'nome',
                    width: '20%',
                },
                {
                    title: 'Telefone',
                    key: 'telefone',
                    dataIndex: 'telefone',
                    width: '20%',
                    responsive: ['sm'],
                },
                {
                    title: 'Ação',
                    dataIndex: 'action',
                    key: 'action',
                    width: '10%',
                    align: 'center',
                },
            ],
            openModal: false,
            idEdit: null
        }
    },

    computed: {
        getAgencies: {
            get() {
                return this.$store.getters['agency/getAgencies'];
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
        this.$store.dispatch('agency/all');
    },

    methods: {

        async index(id) {
            try {
                await this.$store.dispatch('agency/index', id);

                this.$store.commit('generic/setModalEdit', true);

                this.openModal = true;
                this.idEdit = id;
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async destroy(id) {
            try {
                const response = await this.$store.dispatch('agency/destroy', id);

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async clearFilter() {
            this.$store.dispatch('agency/all');

            this.$store.commit('generic/setFilterExits', false);
        },

        async filter(data) {
            try {

                await this.$store.dispatch('agency/filter', data);

                this.data.nome = null;

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        showModal() {
            this.$store.commit('generic/setModalEdit', false);
            this.openModal = true;
        },
    }
}
</script>