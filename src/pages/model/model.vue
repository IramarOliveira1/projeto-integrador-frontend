<template>
    <div class="container-main">
        <a-form layout="vertical" name="basic" :model="data" @finish="filter" :hideRequiredMark="true">
            <a-row class="row-filter-general">

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item label="FILTRAR POR NOME" name="nome"
                        :rules="[{ required: true, message: 'Campo filtrar � obrigat�rio!' }]">
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

        <a-table :columns="columns" :data-source="getModels" :row-key="record => record.id" bordered
            :pagination="{ pageSize: 9 }">
            <template #bodyCell="{ column, record }">

                <template v-if="column.key === 'valor_diaria'">
                    {{ parseFloat(record.valor_diaria).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </template>

                <template v-if="column.key === 'action'">
                    <a-button @click="index(record.id)">
                        <EditTwoTone />
                    </a-button>
                    <a-popconfirm title="Deseja realmente excluir esse registro ?" ok-text="Sim" cancel-text="N�o"
                        @confirm="destroy(record.id)">
                        <a-button>
                            <DeleteTwoTone two-tone-color="#ef3413" />
                        </a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
        <modal :openModal="openModal" :idEdit="idEdit" :listImage="listImage" @close="openModal = false" />
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
                    key: 'valor_diaria',
                    title: 'Valor diaria',
                    dataIndex: 'valor_diaria',
                    width: '20%',
                    responsive: ['sm'],
                },
                {
                    title: 'Quantidade',
                    dataIndex: 'quantidade',
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
            idEdit: null,
            listImage: []
        }
    },

    computed: {
        getModels: {
            get() {
                return this.$store.getters['model/getModels'];
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
        this.$store.dispatch('model/all');
    },

    methods: {
        async index(id) {
            try {
                const response = await this.$store.dispatch('model/index', id);

                const extension = response.data[0].url_imagem.split('.')[1];

                const getImage = await this.$axios.get(response.data[0].url_imagem, {
                    responseType: 'blob',
                });

                const image = new File([getImage.data], `${response.data[0].nome}.${extension}`, { type: getImage.data.type });

                const loadImage =
                {
                    url: response.data[0].url_imagem,
                    name: `${response.data[0].nome}.${extension}`,
                }

                this.$store.commit('model/setImage', image);

                this.$store.commit('generic/setModalEdit', true);

                this.openModal = true;
                this.listImage = [loadImage];
                this.idEdit = id;
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async destroy(id) {
            try {
                const response = await this.$store.dispatch('model/destroy', id);

                this.$notification.notification(response.status, response.data.message);

                this.$store.commit('generic/setFilterExits', false);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async filter(data) {
            try {

                await this.$store.dispatch('model/filter', data);

                this.data.tipo = null;

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async clearFilter() {
            this.data.nome = null;

            this.$store.dispatch('model/all');

            this.$store.commit('generic/setFilterExits', false);
        },

        showModal() {
            this.$store.commit('generic/setModalEdit', false);
            this.openModal = true;
        },
    }
}
</script>