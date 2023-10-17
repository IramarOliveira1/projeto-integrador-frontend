<template>
    <div class="container-main">

        <div class="steps">
            <a-steps :current="1" size="small"
                :items="[{ title: 'Local, Data' }, { title: 'Escolher Veiculo' }, { title: 'Pagamento' }]" />
        </div>

        <div class="header-list-vehicle">
            <h1>Escolha um carro que melhor te atende</h1>
        </div>

        <div class="card-vehicles">

            <a-card :title="'CATEGORIA ' + vehicle.model.categoria" v-for="vehicle in data" :key="vehicle.id">
                <template #cover>
                    <img alt="Imagem Carros" class="image-card-vehicles" :src="vehicle.model.url_imagem" />
                </template>
                <a-card-meta :title="vehicle.model.nome" />
                <a-card-meta
                    :title="parseFloat(vehicle.model.valor_diaria).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '/dia'" />
                <a-card-meta>
                    <template #description> Veiculos disponiveis: {{ vehicle.vehicle_available }}</template>
                </a-card-meta>

                <a-button type="primary" html-type="submit" class="button-select-vehicle"
                    @click="chooseVehicle(vehicle)">ESCOLHER
                    VEICULO</a-button>
            </a-card>
        </div>
    </div>
</template>

<script>
import './listVehicle.css';

import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';
export default {
    components: {
        locale
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['reserve/getVehicles'];
            }
        }
    },
    methods: {
        chooseVehicle(vehicle) {
            const dateOne = dayjs(this.$store.getters['home/getData'].startDate);
            const dateTwo = dayjs(this.$store.getters['home/getData'].endDate);

            // const data = {
            //     startDateRent: JSON.parse(localStorage.getItem('vuex')).home.data.startDate,
            //     endDateRent: JSON.parse(localStorage.getItem('vuex')).home.data.endDate,
            //     startAgency: {
            //         id: JSON.parse(localStorage.getItem('vuex')).home.data.agencia.id.option.id
            //     },
            //     endAgency: {
            //         id: JSON.parse(localStorage.getItem('vuex')).home.data.devolution.id.option.id
            //     },

            //     insurance: {
            //         id: null
            //     },
            //     payment: {
            //         preco: null,
            //         tipo_pagamento: {

            //             id: null
            //         }
            //     },
            //     user: {
            //         id: 1
            //     },
            //     vehicle: {
            //         id: id
            //     }
            // }

            this.$store.commit('payment/setResume',
                {
                    data: this.$store.getters['home/getData'],
                    diffDay: dateTwo.diff(dateOne, 'd'),
                    vehicle: vehicle
                }
            );

            this.$router.push('/pagamento');
        }
    },
}
</script>