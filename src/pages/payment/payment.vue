<template>
    <div class="container-main">

        <div class="steps">
            <a-steps :current="2" size="small"
                :items="[{ title: 'Local, Data' }, { title: 'Escolher Veiculo' }, { title: 'Pagamento' }]" />
        </div>

        <div class="color-title">

            <div class="title-payment">
                <h1>Resumo da reserva</h1>
            </div>

            <div class="vehicle-payment">
                <h3>Veículo escolhido</h3>
                <h4>Modelo - {{ data.vehicle.model.nome }}</h4>
                <img :src="data.vehicle.model.url_imagem" alt="">
            </div>

            <a-divider style="height: 2px; background-color: #d6d6d6" />

            <div class="withdrawal">
                <h3>Retirada</h3>
                <h4> {{ startDateRent }}</h4>
                <h4> {{ `${data.agencia.id.label} - ${data.agencia.id.option.address.uf}` }}</h4>
            </div>

            <a-divider style="height: 2px; background-color: #d6d6d6" />

            <div class="devolution">
                <h3>Devolução</h3>
                <h4>{{ endDateRent }}</h4>
                <h4>{{ `${data.devolution.id.label} - ${data.devolution.id.option.address.uf}` }}</h4>
            </div>

            <a-divider style="height: 2px; background-color: #d6d6d6" />

            <div class="special-offer">
                <h3>Oferta especial</h3>
                <h4> {{ data.diffDay }} DIÁRIAS X
                    {{ parseFloat(valueDay).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    - TOTAL: {{ parseFloat(calculateDay).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }) }}
                </h4>
            </div>

            <a-divider style="height: 2px; background-color: #d6d6d6" />

            <div v-if="valueInsurance != 0">
                <h3>Proteção</h3>
                <h4> {{ data.diffDay }} DIÁRIAS X
                    {{
                        parseFloat(valueInsurance).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                    }}

                    TOTAL: {{ parseFloat(calculateInsurance).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }) }}
                </h4>
                <a-divider style="height: 2px; background-color: #d6d6d6" />
            </div>

            <a-row class="total">
                <h3>VALOR TOTAL :</h3>
                <h3>
                    {{ parseFloat(valueTotal ?? calculateTotalValue).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }) }}
                </h3>
            </a-row>

            <a-divider style="height: 2px; background-color: #d6d6d6" />

            <div class="selected-insurance">
                <h3>SELECIONE UM SEGURO</h3>
                <a-select placeholder="Selecione um seguro" :options="getInsurancies"
                    :field-names="{ label: 'nome', value: 'id' }" v-model:value="payment.insurance.id"
                    @change="changeValueTotal(payment.insurance.id)">
                </a-select>

                <div class="group-button-payment">
                    <a-button key="back" size="large" @click="back" class="button-back">Voltar</a-button>

                    <a-button type="primary" html-type="submit" class="button-continue" size="large"
                        @click="finalizeReservation(payment.insurance.id)">
                        CONTINUAR
                    </a-button>
                </div>
            </div>
        </div>
    </div>

    <modal :openModal="showModal" :calculateTotalValue="calculateTotalValue" :data="payment" @close="showModal = false" />
</template>

<script>
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';
import modal from './modal.vue';

export default {
    components: {
        locale,
        modal
    },
    data() {
        return {
            showModal: false,
            valueDay: this.$store.getters['home/getData'].vehicle.model.valor_diaria,
            calculateDay: this.$store.getters['home/getData'].vehicle.model.valor_diaria * this.$store.getters['home/getData'].diffDay,
            valueInsurance: 0,
            calculateInsurance: null,
            valueTotal: this.$store.getters['home/getData'].vehicle.model.valor_diaria * this.$store.getters['home/getData'].diffDay,
            calculateTotalValue: null,
            startDateRent: dayjs(this.$store.getters['home/getData'].startDate).format('DD-MM-YYYY'),
            endDateRent: dayjs(this.$store.getters['home/getData'].endDate).format('DD-MM-YYYY'),
        }
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['home/getData'];
            }
        },
        payment: {
            get() {
                return this.$store.getters['payment/getData'];
            }
        },
        getInsurancies: {
            get() {
                return this.$store.getters['insurance/getInsurancies'];
            }
        },
    },

    mounted() {
        this.$store.dispatch('insurance/all');
        this.$store.dispatch('payment/allTypePayment');
    },

    methods: {
        changeValueTotal(id) {
            const filter = this.$store.getters['insurance/getInsurancies'].filter(index => index.id === id);

            const calculateInsurance = filter[0].preco * this.data.diffDay;

            this.valueInsurance = filter[0].preco;

            this.calculateInsurance = calculateInsurance;

            this.calculateTotalValue = calculateInsurance + this.calculateDay;
            this.valueTotal = null;
        },

        finalizeReservation(id) {
            if (id === null) {
                return this.$notification.notification(400, 'Campo seguro é obrigatório');
            }
            this.showModal = true;
        },
        async back() {
            try {

                const response = await this.$store.dispatch('home/search', {
                    startDate: this.data.startDate.format('YYYY-MM-DD'),
                    endDate: this.data.endDate.format('YYYY-MM-DD'),
                    agencia: {
                        id: this.data.agencia.id.option.id
                    },
                });

                this.$store.commit('home/setVehicles', response.data);

                this.$store.commit('home/setData', this.data);

                this.payment.insurance.id = null;

                this.$router.push('/listar-veiculos');
            } catch (error) {
                if (error.response.data.error) {
                    this.$router.push('/');
                }
            }
        }
    },
}
</script>