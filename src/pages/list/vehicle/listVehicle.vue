<template>
    <div class="container-main">
        <a-row :gutter="[8, 16]">
            <a-card hoverable style="width: 240px" v-for="vehicle in data" :key="vehicle.id">
                {{ vehicle.model.valor_diaria }}
                <template #cover>
                    <img alt="example" :src="vehicle.model.url_imagem" />
                </template>
                <a-card-meta :title="vehicle.model.nome">
                    <template #description> Veiculos disponiveis: {{ vehicle.vehicle_available }}</template>
                </a-card-meta>
            </a-card>
        </a-row>
    </div>
</template>

<script>
export default {

    computed: {
        data: {
            get() {
                return this.$store.getters['reserve/getVehicles']
            }
        }
    },
}
</script>