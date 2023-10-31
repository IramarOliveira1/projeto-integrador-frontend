<template>
    <div>
        <a-modal v-model:open="showModal" title="PAGAMENTO" :footer="null" width="800px">
            <h1>TOTAL: {{ parseFloat(calculateTotalValue).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }) }}
            </h1>

            <a-form layout="vertical" ref="form" name="basic" :model="{ ...valueFields }" :hideRequiredMark="true"
                @finish="execute">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Selecione tipo de pagamento" name="tipo_pagamento">
                        <a-select placeholder="Selecione tipo de pagamento" v-model:value="data.payment.tipo_pagamento.id"
                            :options="getTypePayment" :field-names="{ label: 'nome', value: 'id' }" :disabled="loading">
                        </a-select>
                    </a-form-item>
                </a-col>
                <div class="cart" v-if="data.payment.tipo_pagamento.id > 1">

                    <div class="card-item" :class="{ '-active': isCardFlipped }" v-if="labels && inputFields">
                        <vue-paycard :value-fields="valueFields" :input-fields="inputFields" :is-card-number-masked="false"
                            :labels="labels" />

                        <a-row :gutter="[8, 16]">
                            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                                <a-form-item label="N˙mero do cart„o" name="card_number">
                                    <a-input type="tel" v-model:value="valueFields.cardNumber" :id="inputFields.cardNumber"
                                        v-cardformat:formatCardNumber />
                                </a-form-item>
                            </a-col>
                            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                                <a-form-item label="Nome do titular" name="cardName"
                                    :rules="[{ required: true, message: 'Campo nome È obrigatÛrio' }]">
                                    <a-input v-model:value="valueFields.cardName" :id="inputFields.cardName" />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-row :gutter="[8, 16]">
                            <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :xl="{ span: 8 }">
                                <a-form-item label="MÍs" name="cardMonth">
                                    <a-select placeholder="Selecione o mÍs do vencimento do cart„o"
                                        v-model:value="valueFields.cardMonth" :options="month" required
                                        :field-names="{ label: 'month', value: 'month' }">
                                    </a-select>
                                </a-form-item>
                            </a-col>

                            <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :xl="{ span: 8 }">
                                <a-form-item label="Ano" name="cardYear">
                                    <a-select placeholder="Selecione o ano do vencimento do cart„o"
                                        v-model:value="valueFields.cardYear" :options="year"
                                        :field-names="{ label: 'year', value: 'year' }">
                                    </a-select>
                                </a-form-item>
                            </a-col>

                            <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :xl="{ span: 8 }">
                                <a-form-item label="CVV" name="cardCvv"
                                    :rules="[{ required: true, message: 'Campo CVV È obrigatÛrio' }]">
                                    <a-input type="tel" v-model:value="valueFields.cardCvv" :id="inputFields.cardCvv"
                                        @focus="isCardFlipped = true" @blur="isCardFlipped = false"
                                        v-cardformat:formatCardCVC :maxlength="4" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                </div>
                <div class="pix" v-if="data.payment.tipo_pagamento.id === 1">
                    <qrcode-vue value="https://github.com/IramarOliveira1/projeto-integrador-backend" level="H"
                        :size="180" />
                </div>
                <div class="button-payment-finish">
                    <a-button key="back" @click="closeModal" :disabled="loading">Fechar</a-button>
                    <a-button type="primary" html-type="submit" :disabled="loading" :class="this.loading ? 'active' : ''">
                        <a-spin v-if="loading" :indicator="indicator" />
                        <div v-else>
                            Realizar pagamento
                        </div>
                    </a-button>
                </div>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'

import { VuePaycard } from 'vue-paycard'

import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export default {
    components: {
        QrcodeVue,
        VuePaycard,
        locale
    },
    props: ['openModal', 'calculateTotalValue', 'data'],
    data() {
        return {
            indicator: h(LoadingOutlined, {
                style: {
                    fontSize: '22px',
                    color: '#fff'
                },
                spin: true,
            }),
            loading: false,
            isCardFlipped: false,
            valueFields: {
                cardName: '',
                cardNumber: '',
                cardMonth: '',
                cardYear: '',
                cardCvv: ''
            },
            labels: {
                cardName: "AlgueAqui",
                cardHolder: "Nome Completo",
                cardMonth: "MM",
                cardYear: "YY",
                cardExpires: "Validade",
                cardCvv: "CVV"
            },
            inputFields: {
                cardNumber: "v-card-number",
                cardName: "v-card-name",
                cardMonth: "v-card-month",
                cardYear: "v-card-year",
                cardCvv: "v-card-cvv",
            },
            year: [],
            month: []
        }
    },
    computed: {
        showModal: {
            get() {
                return this.isActiveModal = this.openModal;
            },
        },
        getTypePayment: {
            get() {
                return this.$store.getters['payment/getTypePayment'];
            }
        },
        details: {
            get() {
                return this.$store.getters['home/getData'];
            }
        }
    },
    mounted() {
        let month = [];
        let year = [];
        for (let index = 1; index < 13; index++) {
            year.push({ id: index, year: new Date().getFullYear() + index - 1 });
            month.push({ id: index, month: `${index > 9 ? index : '0' + index}` });
        }
        this.year = year;
        this.month = month;
    },
    methods: {

        async execute() {
            try {
                if (this.data.payment.tipo_pagamento.id === null) {
                    return this.$notification.notification(400, 'Campo tipo de pagamento È obrigat√≥rio');
                }

                this.loading = true;

                const data =
                {
                    startDateRent: dayjs(this.details.startDate).format('YYYY-MM-DD'),
                    endDateRent: dayjs(this.details.endDate).format('YYYY-MM-DD'),
                    startAgency: {
                        id: this.details.agencia.id.option.id
                    },
                    endAgency: {
                        id: this.details.devolution.id.option.id

                    },
                    insurance: {
                        id: this.data.insurance.id
                    },
                    payment: {
                        preco: String(this.calculateTotalValue),
                        tipo_pagamento: {
                            id: this.data.payment.tipo_pagamento.id
                        }
                    },
                    user: {
                        id: this.details.user
                    },
                    vehicle: {
                        id: this.details.vehicle.id,
                        modelo: {
                            id: this.details.vehicle.model.id
                        }

                    }
                }

                const response = await this.$store.dispatch('payment/execute', data);

                this.$notification.notification(response.status, response.data.message);

                this.data.payment.tipo_pagamento.id = null;

                this.data.insurance.id = null;

                this.$router.push('dashboard');

                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        closeModal(close) {

            this.$refs['form'].clearValidate();

            this.$emit('close', close);

            this.data.payment.tipo_pagamento.id = null;

            this.valueFields = {
                cardName: '',
                cardNumber: '',
                cardMonth: '',
                cardYear: '',
                cardCvv: ''
            };

        },
    },
}
</script>