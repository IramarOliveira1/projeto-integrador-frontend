<template>
    <div class="container-main">
        <a-form layout="vertical" name="basic" ref="form" :model="data" :hideRequiredMark="true">
            <a-row class="row-filter-general">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item label="Filtar por status" name="nome">
                        <a-select placeholder="Selecione um status" v-model:value="status.label" :options="status"
                            @change="filter" :field-names="{ label: 'label', value: 'label' }"></a-select>
                    </a-form-item>
                </a-col>

                <div class="filter-code">
                    <a-row>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 16 }" :xl="{ span: 16 }">
                            <a-form-item label="Filtar por codigo" name="code">
                                <a-input placeholder="Informe um codigo" v-model:value="code" />
                            </a-form-item>

                        </a-col>
                        <a-button type="primary" html-type="submit" @click="filterCode"
                            class="button-filter-general">Filtrar</a-button>
                    </a-row>
                </div>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 8 }">
                    <a-form-item>
                        <a-button type="primary" @click="clearFilter" class="button-filter-reserve"
                            v-if="buttonFilter">Limpar Filtro</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <a-space direction="vertical" style="width: 100%" v-if="data.length === 0">
            <a-alert description="Nenhuma reserva encontrada!" type="warning" closable />
        </a-space>

        <a-collapse v-for="reserves in data" :key="reserves.id" style="margin-bottom: 20px;" collapsible="header">

            <a-collapse-panel key="2" :header="reserves.codeReserve">
                <template #extra>
                    <div class="extra">
                        <a-button
                            v-if="reserves.status === 'RESERVADO' && this.$store.getters['user/getUser'].role === 'ADMIN'"
                            size="small" :disabled="loading" @click="startRent(reserves.id)">Iniciar Reserva</a-button>

                        <a-button class="button-finish" type="primary" ghost size="small" :disabled="loading"
                            v-if="reserves.status === 'EM ANDAMENTO' && this.$store.getters['user/getUser'].role === 'ADMIN'"
                            @click="endRent(reserves.id)">Finalizar
                            Reserva
                        </a-button>
                        <a-button class="button-cancellation" size="small"
                            v-if="reserves.status === 'RESERVADO' && this.$store.getters['user/getUser'].role === 'ADMIN'"
                            danger @click="cancellationRent(reserves.id)" :disabled="loading">
                            <a-spin v-if="loading && reserves.id === idLoding" :indicator="indicator" />
                            <div v-else>
                                Cancelar
                                Reserva
                            </div>
                        </a-button>
                        <a-tag color="green" v-if="reserves.status === 'FINALIZADO'">{{ reserves.status }}</a-tag>
                        <a-tag color="orange" v-if="reserves.status === 'CANCELADO'">{{ reserves.status }}</a-tag>
                        <a-tag color="cyan" v-if="reserves.status === 'EM ANDAMENTO'">{{ reserves.status }}</a-tag>
                        <a-tag color="red" v-if="reserves.status === 'ENTREGUE FORA DO PRAZO'">{{ reserves.status
                        }}</a-tag>
                        <a-tag color="blue" v-if="reserves.status === 'RESERVADO'">{{ reserves.status }}</a-tag>
                    </div>
                </template>
                <div class="ellipsis">

                    <div class="detail-user">
                        <h2>Dados do cliente</h2>
                        <h3><strong>Nome:</strong> {{ reserves.name }}</h3>
                        <h3><strong>CPF:</strong> {{ reserves.cpf }}</h3>
                        <h3><strong>E-mail:</strong> {{ reserves.email }}</h3>
                        <h3><strong>Codigo:</strong> {{ reserves.codeReserve }}</h3>
                    </div>
                    <a-divider style="height: 2px; background-color: #d6d6d6" />

                    <div class="detail-agency-start">
                        <h2>Dados da agencia de retirada</h2>
                        <h3><strong>Data Retirada:</strong> {{ new
                            Date(reserves.startDateRent).toLocaleDateString('pt-BR')
                        }}
                        </h3>
                        <h3><strong>Nome Agencia:</strong> {{ reserves.agencyRentInit.nome }} </h3>
                        <h3><strong>Endereco:</strong> {{ `${reserves.agencyRentInit.address.logradouro},
                                                    ${reserves.agencyRentInit.address.numero} - ${reserves.agencyRentInit.address.bairro}`
                        }}</h3>
                        <h3><strong>CEP:</strong> {{ reserves.agencyRentInit.address.cep }} </h3>

                    </div>
                    <a-divider style="height: 2px; background-color: #d6d6d6" />

                    <div class="detail-agency-end">
                        <h2>Dados da agencia de devolucao</h2>
                        <h3><strong>Data Devolucao:</strong> {{ new
                            Date(reserves.endDateRent).toLocaleDateString('pt-BR')
                        }}
                        </h3>

                        <h3><strong>Nome Agencia:</strong> {{ reserves.agencyRendEnd.nome }} </h3>
                        <h3><strong>Endereco:</strong> {{ `${reserves.agencyRendEnd.address.logradouro},
                                                    ${reserves.agencyRendEnd.address.numero} - ${reserves.agencyRendEnd.address.bairro}`
                        }}</h3>
                        <h3><strong>CEP:</strong> {{ reserves.agencyRendEnd.address.cep }} </h3>
                    </div>
                    <a-divider style="height: 2px; background-color: #d6d6d6" />

                    <div class="detail-vehicle">
                        <h2>Dados do veiculo</h2>
                        <h3><strong>Marca:</strong> {{ reserves.vehicle.marca }}</h3>
                        <h3><strong>Modelo:</strong> {{ reserves.vehicle.modelo.nome }}</h3>
                        <h3><strong>Ano:</strong> {{ reserves.vehicle.ano }}</h3>
                        <h3><strong>Capacidade:</strong> {{ reserves.vehicle.capacidade }}</h3>
                        <h3><strong>Cor:</strong> {{ reserves.vehicle.cor }}</h3>
                        <h3><strong>Valor da diaria:</strong> {{ parseFloat(reserves.vehicle.modelo.valor_diaria
                        ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</h3>
                        <h3><strong>Tipo do seguro:</strong> {{ reserves.insurance.nome }}</h3>
                    </div>

                    <a-divider style="height: 2px; background-color: #d6d6d6" />

                    <div class="detail-type-payment">
                        <h2>Dados do Pagamento</h2>
                        <h3><strong> Valor pago:</strong> {{
                            parseFloat(reserves.payment.preco
                            ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</h3>
                        <h3><strong>Tipo de pagamento:</strong> {{ reserves.payment.tipo_pagamento.nome }}</h3>
                        <h3 v-if="reserves.dateDevolution"><strong>Data quando o veiculo foi devolvido: </strong>{{
                            new Date(reserves.dateDevolution).toLocaleDateString('pt-BR') }}
                        </h3>
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <a-pagination v-model:current="current" v-model:pageSize="pageSize" :total="data[0]?.totalElements" @change="all"
            class="pagination" v-if="data.length > 0" />
    </div>
</template>

<script>

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export default {
    data() {
        return {
            indicator: h(LoadingOutlined, {
                style: {
                    fontSize: '22px',
                    color: '#000'
                },
                spin: true,
            }),
            pageSize: 6,
            page: 0,
            current: 1,
            code: null,
            loading: false,
            idLoding: null,
            status: [
                {
                    'label': 'FINALIZADO',
                }, {
                    'label': 'CANCELADO',
                }, {
                    'label': 'ENTREGUE FORA DO PRAZO',
                }, {
                    'label': 'RESERVADO',
                }, {
                    'label': 'EM ANDAMENTO',
                }
            ],
        }
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['reserve/getReserves'];
            }
        },
        buttonFilter: {
            get() {
                return this.$store.getters['generic/getFilterExits'];
            },
        }
    },

    mounted() {
        this.all();
        this.$store.commit('generic/setFilterExits', false);
    },
    methods: {
        async all(page) {
            try {

                if (page) {
                    this.page = page - 1;
                }

                await this.$store.dispatch('reserve/all', { page: this.page ?? page });

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async startRent(id) {
            try {

                const response = await this.$store.dispatch('reserve/startRent', { idReserve: id, page: this.page });

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async endRent(id) {
            try {

                const response = await this.$store.dispatch('reserve/endRent', { idReserve: id, page: this.page });

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async cancellationRent(id) {
            try {
                this.loading = true;

                this.idLoding = id;

                const response = await this.$store.dispatch('reserve/cancellationRent', { idReserve: id, page: this.page });

                this.loading = false;

                this.idLoding = null;
                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async filter(data) {
            try {
                await this.$store.dispatch('reserve/filterStatusAll', { page: 0, status: data });

                this.$store.commit('generic/setFilterExits', true);

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async filterCode() {
            try {

                if (!this.code) {
                    return this.$notification.notification(400, 'Campo código é obrigatÃ³rio');
                }

                await this.$store.dispatch('reserve/filterCodeAll', { page: 0, code: this.code });

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async clearFilter() {
            this.all();
            this.current = 1;
            this.$store.commit('generic/setFilterExits', false);
            this.status.label = null
            this.code = null;
        },
    },
}
</script>