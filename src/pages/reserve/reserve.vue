<template>
    <div class="container-main">
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
                            v-if="reserves.status === 'EM ANDAMENTO' || reserves.status === 'ENTREGUE FORA DO PRAZO' && this.$store.getters['user/getUser'].role === 'ADMIN'"
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

                    <div class="detail-agency">
                        <h2>Dados da agencia</h2>
                        <h3><strong>Data Retirada:</strong> {{ new
                            Date(reserves.startDateRent).toLocaleDateString('pt-BR')
                        }}
                        </h3>
                        <h3><strong>Endereco retirada:</strong> FALTA IMPLEMENTAR</h3>
                        <h3><strong>Data Devolucao:</strong> {{ new
                            Date(reserves.endDateRent).toLocaleDateString('pt-BR')
                        }}
                        </h3>
                        <h3><strong>Endereco Devolucao:</strong> FALTA IMPLEMENTAR</h3>
                    </div>
                    <a-divider style="height: 2px; background-color: #d6d6d6" />

                    <div class="detail-vehicle">
                        <h2>Dados da veiculo</h2>
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
                    </div>

                </div>
            </a-collapse-panel>
        </a-collapse>
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
            loading: false,
            idLoding: null,
        }
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['reserve/getReserves'];
            }
        }
    },

    mounted() {
        this.all();
    },
    methods: {
        async all() {
            try {

                await this.$store.dispatch('reserve/all', this.$store.getters['user/getUser'].id);

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async startRent(id) {
            try {

                const response = await this.$store.dispatch('reserve/startRent', { idReserve: id, idUser: this.$store.getters['user/getUser'].id });

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async endRent(id) {
            try {

                const response = await this.$store.dispatch('reserve/endRent', { idReserve: id, idUser: this.$store.getters['user/getUser'].id });

                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async cancellationRent(id) {
            try {
                this.loading = true;

                this.idLoding = id;

                const response = await this.$store.dispatch('reserve/cancellationRent', { idReserve: id, idUser: this.$store.getters['user/getUser'].id });

                this.loading = false;

                this.idLoding = null;
                this.$notification.notification(response.status, response.data.message);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        }
    },
}
</script>