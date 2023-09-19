<template>
    <div class="container-main">
        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="search" :hideRequiredMark="true">

            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Agência retirada" name="agencia">
                        <a-select size="large" v-model:value="data.agencia.id" placeholder="Selecione uma agï¿½ncia"
                            :options="agencies" :field-names="{ label: 'nome', value: 'nome' }" labelInValue showSearch
                            @change="changeAgency" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data retirada" name="startDate">

                        <a-date-picker v-model:value="data.startDate" format="DD-MM-YYYY" :locale="locale" size="large"
                            :disabled-date="disabledDate" style="width: 100%;" :allowClear="false" @change="changeTeste" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Agência devolução" name="devolution">

                        <a-select size="large" v-model:value="data.devolution.id" placeholder="Selecione uma agï¿½ncia"
                            :options="agencies" :field-names="{ label: 'nome', value: 'nome' }" :disabled="disabledGeneric"
                            labelInValue showSearch />
                    </a-form-item>
                </a-col>
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data devolução" name="endDate"
                        :rules="[{ required: true, message: 'Campo Data devolução ï¿½ obrigatï¿½rio' }]">
                        <!-- :disabled="disabledGeneric" -->
                        <a-date-picker :value="data.endDate" format="DD-MM-YYYY" :locale="locale" size="large"
                            :disabled-date="disabledEndDate" style=" width: 100%" :allowClear="false" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-button type="primary" html-type="submit" :disabled="disabledGeneric">CONTINUAR</a-button>
        </a-form>
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
            testando: null,
            teste: null,
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

        this.$store.dispatch('home/all');
    },

    methods: {
        changeAgency() {
            this.disabledStartDate = false;
        },

        changeStartDate() {
            this.disabledGeneric = false;
        },
        async search(data) {
            try {

                await this.$store.dispatch('home/search', {
                    startDate: data.startDate.format('YYYY-MM-DD'),
                    endDate: data.endDate.format('YYYY-MM-DD'),
                    agencia: {
                        id: data.agencia.id.option.id
                    },
                });

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        disabledDate(current) {
            return current && current < dayjs().endOf('day').day(+1);
        },

        changeTeste(current) {
            const date1 = new Date(dayjs().format('YYYY-MM-DD'));
            const date2 = new Date(current.format('YYYY-MM-DD'));
            const diffTime = Math.abs(date2 - date1);
            this.testando = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            this.data.endDate = current.format('DD-MM-YYYY')

            this.disabledEndDate(this.testando);
        },
        disabledEndDate(current) {
            return current && current < dayjs().endOf('days').day(this.testando + 1);
        }
    },
}
</script>
