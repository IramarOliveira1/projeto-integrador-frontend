<template>
    <div class="container-main">
        <a-form layout="vertical" name="basic" :model="data" :hideRequiredMark="true">
            <a-row class="row-filter-general">

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item label="Filtrar por nome ou cpf" name="nameOrCpf">
                        <a-input v-model:value="data.nameOrCpf" size="large" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="button-filter-general"
                            size="large">Filtrar</a-button>
                    </a-form-item>

                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <div class="button-add">

                            <a-button type="primary" html-type="submit" class="button-add-general" size="large"
                                @click="showModal">Cadastrar</a-button>
                        </div>
                    </a-form-item>
                </a-col>

            </a-row>
        </a-form>
        <a-table :columns="columns" :data-source="users" key="users.id" bordered :pagination="{ pageSize: 9 }" />
    </div>
    <modal :openModal="openModal" @close="openModal = false"/>

</template>

<script>

import axios from '../../../services/api.js';

import modal from '../modal/modal.vue';

export default {
    components: {
        modal
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
                },
                {
                    title: 'E-mail',
                    dataIndex: 'email',
                    width: '20%',
                },
            ],
            users: [],
            openModal: false,
        }
    },
    mounted() {
        this.all();
    },
    methods: {
        async all() {
            try {
                const response = await axios.get('/user/all', {
                    params: {
                        role: 'USER'
                    }
                });
                this.users = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        showModal() {
            this.openModal = true
        }
    }
}
</script>