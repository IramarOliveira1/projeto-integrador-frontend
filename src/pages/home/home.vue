<template>
    <div class="container-main container-home">
        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="search" :hideRequiredMark="true">
            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Agência retirada" name="agencia">
                        <a-select size="large" v-model:value="data.agencia.id" placeholder="Selecione uma ag�ncia"
                            :options="agencies" :field-names="{ label: 'nome', value: 'nome' }" labelInValue showSearch
                            @change="changeAgency" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data retirada" name="startDate">

                        <a-date-picker v-model:value="data.startDate" format="DD-MM-YYYY" :locale="locale" size="large"
                            :disabled-date="disabledDate" :disabled="disabledStartDate" style="width: 100%;"
                            :allowClear="false" @change="changeStartDate" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Agência devolução" name="devolution">

                        <a-select size="large" v-model:value="data.devolution.id" placeholder="Selecione uma ag�ncia"
                            :options="agencies" :field-names="{ label: 'nome', value: 'nome' }" :disabled="disabledGeneric"
                            labelInValue showSearch @change="changeButton" />
                    </a-form-item>
                </a-col>
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data devolução" name="endDate"
                        :rules="[{ required: true, message: 'Campo Data devolução é obrigatório' }]">
                        <a-date-picker :value="data.endDate" @change="changeEndDate" format="DD-MM-YYYY" :locale="locale"
                            size="large" :disabled-date="disabledEndDate" :disabled="disabledGeneric" style=" width: 100%"
                            :allowClear="false" />
                    </a-form-item>
                </a-col>
            </a-row>

            <div class="button-search">
                <a-button type="primary" html-type="submit" :disabled="disabledButton">CONTINUAR</a-button>
            </div>
        </a-form>
    </div>
    <div class="footer">
        <h3>Sistema AlugueAqui</h3>
        <h4>Desenvolvido por: Iramar Capim - Bruno Tito - Marcos Vinicio </h4>
        <h5> Priscila Julia - Ricardo Jesus - Tairone Barbosa </h5>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';
export default {

    data() {
        return {
            locale,
            disabledStartDate: true,
            disabledGeneric: true,
            disabledButton: true,
            addDays: null,
        }
    },
    computed: {
        data: {
            get() {
                return this.$store.getters['home/getData'];
            },
        },

        agencies: {
            get() {
                return this.$store.getters['home/getAgencies'];
            },
        },
    },

    mounted() {
        this.clearForm();
        this.$store.dispatch('home/all');
    },

    methods: {
        changeAgency() {
            this.disabledStartDate = false;
        },

        changeButton() {
            this.disabledButton = false;
        },

        async search(data) {
            try {
                const response = await this.$store.dispatch('home/search', {
                    startDate: data.startDate.format('YYYY-MM-DD'),
                    endDate: data.endDate.format('YYYY-MM-DD'),
                    agencia: {
                        id: data.agencia.id.option.id
                    },
                });

                this.$store.commit('home/setVehicles', response.data);

                this.$router.push('/listar-veiculos');
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        disabledDate(current) {
            return current && current < dayjs().startOf('day');
        },

        changeStartDate(current) {
            this.disabledGeneric = false;
            const now = new Date(dayjs().format('YYYY-MM-DD'));
            const currentSelected = new Date(current.format('YYYY-MM-DD'));
            const diffTime = Math.abs(currentSelected - now);
            this.addDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            this.data.endDate = dayjs().set('date', current.$D >= 28 ? current.$D + 3 : current.$D + 1)
                .set('month', current.$D >= 28 ? current.$d.getMonth() + 1 : current.$d.getMonth() + 0)
                .set('year', current.$d.getFullYear());
            this.disabledEndDate(this.addDays);
        },

        disabledEndDate(current) {
            return current && current < dayjs().endOf('days').add(this.addDays - 1, 'day');
        },

        changeEndDate(current) {
            this.data.endDate = dayjs().set('date', current.$D).set('month', current.$d.getMonth()).set('year', current.$d.getFullYear());
        },

        clearForm() {
            this.$refs['form'].clearValidate();

            this.$store.commit('home/clearForm', {
                startDate: null,
                endDate: null,
                agencia: {
                    id: null
                },
                devolution: {
                    id: null
                }
            });
        },
    },
}
</script>
