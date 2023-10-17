<template>
    <div>
        <a-modal v-model:open="showModal" title="PAGAMENTO" :footer="null" width="800px">
            <h1>TOTAL: {{ parseFloat(calculateTotalValue).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }) }}
            </h1>

            <a-form layout="vertical" ref="form" name="basic" :model="data" :hideRequiredMark="true">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Selecione tipo de pagamento" name="tipo_pagamento">
                        <a-select placeholder="Selecione tipo de pagamento" v-model:value="data.payment.tipo_pagamento.id"
                            :options="getTypePayment" :field-names="{ label: 'nome', value: 'id' }">
                        </a-select>
                    </a-form-item>
                </a-col>
                <div class="cart" v-if="data.payment.tipo_pagamento.id > 1">
                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="Nome do titular" name="name"
                                :rules="[{ required: true, message: 'Campo nome 茅 obrigat贸rio' }]">
                                <a-input />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="N鷐ero do cart鉶" name="number_cart"
                                :rules="[{ required: true, message: 'Campo marca 茅 obrigat贸rio' }]">
                                <a-input v-cardformat:formatCardNumber />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[8, 16]">
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="M阺/Ano" name="Ano"
                                :rules="[{ required: true, message: 'Campo marca 茅 obrigat贸rio' }]">
                                <a-input v-cardformat:formatCardExpiry />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                            <a-form-item label="CVV" name="cvv"
                                :rules="[{ required: true, message: 'Campo marca 茅 obrigat贸rio' }]">
                                <a-input v-cardformat:formatCardCVC />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </div>

                <div class="pix" v-if="data.payment.tipo_pagamento.id === 1">
                    <qrcode-vue value="https://github.com/IramarOliveira1/projeto-integrador-backend" level="H"
                        :size="180" />
                </div>

                <div class="button-payment-finish">
                    <a-button key="back" @click="closeModal">Fechar</a-button>
                    <a-button type="primary" html-type="submit">Realizar pagamento</a-button>
                </div>
            </a-form>

            <VCreditCard />

        </a-modal>

    </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue'


import VCreditCard from 'v-credit-card';
import 'v-credit-card/dist/VCreditCard.css';


export default {
    components: {
        QrcodeVue,
        VCreditCard
    },
    props: ['openModal', 'calculateTotalValue', 'data'],
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
    },
    methods: {
        closeModal() {
            this.$emit('close', close);
        }
    },
}
</script>