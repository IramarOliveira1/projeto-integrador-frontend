<template>
    <div>

        <h1>Resumo de sua reserva</h1>


        <h3>Retirada</h3>
        <h1>{{ getData.startDate }}</h1>
        <h1>{{ getData.agencia.id.label }}</h1>

        <h3>Devolucao</h3>
        <h1>{{ getData.endDateRent }}</h1>
        <h1>{{ getData.devolution.id.label }}</h1>
        <h1>{{ getData.startDate }}</h1>

        <a-select placeholder="Selecione um seguro" :options="getInsurancies"
            :field-names="{ label: 'nome', value: 'id' }"></a-select>

        <a-select placeholder="Selecione tipo de pagamento" :options="getTypePayment"
            :field-names="{ label: 'nome', value: 'id' }"></a-select>
    </div>
</template>

<script>
export default {
    computed: {
        getData: {
            get() {
                return this.$store.getters['payment/getData'];
            }
        },
        getInsurancies: {
            get() {
                return this.$store.getters['insurance/getInsurancies'];
            }
        },
        getTypePayment: {
            get() {
                return this.$store.getters['payment/getTypePayment'];
            }
        },
    },

    mounted() {
        this.$store.dispatch('insurance/all');
        this.$store.dispatch('payment/allTypePayment');
    },
}
</script>