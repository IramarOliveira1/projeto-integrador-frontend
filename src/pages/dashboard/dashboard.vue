<template>
    <div class="container-main">
        <!-- <h1>Ol� {{ this.$store.getters.getUserLogin.name }}</h1> -->


        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="filter" :hideRequiredMark="true">
            <!-- <div class="filter"> -->
            <h3>Filtrar faturamento por periodo</h3>
            <a-range-picker v-model:value="data.date" :disabled-date="disabledDate" @change="onChange"
                @openChange="onOpenChange" @calendarChange="onCalendarChange" size="large" format="DD-MM-YYYY" />
            <!-- </div> -->

            <a-button type="primary" html-type="submit" size="large">CONTINUAR</a-button>
            <a-button type="primary" @click="all" size="large" v-if="buttonFilter">Limpar Filtro</a-button>

        </a-form>


        <div id="chart">
            <h3>Faturamento mensal do ano atual por 12 meses.</h3>
            <apexchart ref="chart" type="donut" width="500" :options="donutOptions" :series="series[0].data" />

            <apexchart ref="chart" type="bar" height="350" :options="barOptions" :series="series[1].data" />
            {{ series[1].data }}
        </div>
    </div>
</template>

<script>

import axios from '../../services/api.js';

import VueApexCharts from "vue3-apexcharts";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            data: {
                date: [],
                value: [],
                hackValue: []
            },
            series: [
                {
                    name: 'donut',
                    data: []
                },
                {
                    name: 'bar',
                    data: []
                }
            ],
            donutOptions: {
                colors: ['#009688', '#E91E63', '#3F51B5', '#607D8B', '#FF5722', '#8BC34A', '#FFC107', '#03A9F4', '#00BCD4', '#F44336', '#9E9E9E', '#795548'],
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        size: 200
                    }
                },

                chart: {
                    type: 'pie',
                },
                labels: [],
            },

            barOptions: {
                colors: ['#009688', '#E91E63', '#3F51B5', '#607D8B', '#FF5722', '#8BC34A', '#FFC107', '#03A9F4', '#00BCD4', '#F44336', '#9E9E9E', '#795548'],
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        size: 200
                    }
                },
                chart: {
                    type: 'bar',
                },
                labels: [],
            },
        }
    },

    computed: {
        buttonFilter: {
            get() {
                return this.$store.getters['generic/getFilterExits'];
            },
        }
    },
    mounted() {
        this.all();
        this.index();
    },
    methods: {
        async all() {
            try {
                const response = await axios.get('/dashboard/all');

                this.donut = [];
                this.donutOptions.labels = [];

                const arr = [];

                response.data.map(index => {
                    arr.push(`${index.month} - ${index.year}`);
                    this.series[0].data.push(index.valueTotal);
                })

                this.donutOptions = { labels: arr };

                this.$store.commit('generic/setFilterExits', false);

            } catch (error) {
                console.log(error);
            }
        },
        async filter() {
            try {
                const response = await axios.post('/dashboard/filter', {
                    start: this.data.date[0].format('DD-MM-YYYY'),
                    end: this.data.date[1].format('DD-MM-YYYY')
                });

                this.donut = [];
                this.donutOptions.labels = [];

                const arr = [];

                response.data.map(index => {
                    arr.push(`${index.month} - ${index.year}`);
                    this.series[0].data.push(index.valueTotal);
                })

                this.donutOptions = { labels: arr };

                this.data.date = null;

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                console.log(error);
            }
        },
        async index() {
            try {
                const response = await axios.get(`/dashboard/${this.$store.getters.getUserLogin.id}`);

                response.data.map(index => {
                    // this.series[1].data.push(index.amountTotal);
                    this.barOptions.labels.push(`${index.month} - ${index.year}`);
                });

            } catch (error) {
                console.log(error);
            }
        },

        disabledDate(current) {
            if (!this.data.date || this.data.date.length === 0) {
                return false;
            }

            const tooLate = this.data.date[0] && current.diff(this.data.date[0], 'days') > 366;
            const tooEarly = this.data.date[1] && this.data.date[1].diff(current, 'days') > 366;
            return tooEarly || tooLate;
        },

        onOpenChange(open) {
            if (open) {
                this.data.date = [];
                this.data.hackValue = [];
            } else {
                this.data.hackValue = undefined;
            }
        },
        onChange(val) {
            this.data.value = val;
        },
        onCalendarChange(val) {
            this.data.date = val;
        }
    }
}
</script>
