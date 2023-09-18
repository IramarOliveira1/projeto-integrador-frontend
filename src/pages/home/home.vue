<template>
    <div class="container-home">

        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="search" :hideRequiredMark="true">

            <a-row :gutter="[8, 16]">
                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Agï¿½ncia" name="agencia"
                        :rules="[{ required: true, message: 'Campo agencia ï¿½ obrigatï¿½rio' }]">

                        <a-select size="large" v-model:value="data.agencia.id" placeholder="Selecione uma agï¿½ncia"
                            :options="agencies" :field-names="{ label: 'nome', value: 'id' }"></a-select>

                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data retirada" name="startDate"
                        :rules="[{ required: true, message: 'Campo data retirada ï¿½ obrigatï¿½rio' }]">

                        <a-date-picker v-model:value="data.startDate" format="DD-MM-YYYY" :locale="locale" size="large"
                            :disabled-date="disabledDate" />
                    </a-form-item>
                </a-col>

                <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                    <a-form-item label="Data devolução" name="endDate"
                        :rules="[{ required: true, message: 'Campo data devolução ï¿½ obrigatï¿½rio' }]">

                        <a-date-picker v-model:value="data.endDate" format="DD-MM-YYYY" :locale="locale" size="large"
                            :disabled-date="disabledDate" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-button type="primary" html-type="submit">Pesquisar</a-button>
        </a-form>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';
export default {

    data() {
        return {
            locale
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

        async search(data) {
            try {

                await this.$store.dispatch('home/search', {
                    startDate: data.startDate.format('YYYY-MM-DD'),
                    endDate: data.endDate.format('YYYY-MM-DD'),
                    agencia: {
                        id: data.agencia.id
                    },
                });

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        disabledDate(current) {
            return current && current < dayjs().endOf('day').day(0);
        }
    },
}
</script>
