<template>
    <div class="container-main">
        <!-- <h1>Olá {{ this.$store.getters.getUserLogin.name }}</h1> -->


        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="filter" :hideRequiredMark="true">
            <!-- <div class="filter"> -->
            <a-range-picker v-model:value="data.date" :disabled-date="disabledDate" @change="onChange"
                @openChange="onOpenChange" @calendarChange="onCalendarChange" />



            <!-- </div> -->

            <a-button type="primary" html-type="submit">CONTINUAR</a-button>
        </a-form>


        <div id="chart">
            <h3>Faturamento mensal do ano atual por 12 meses.</h3>
            <apexchart ref="chart" type="donut" width="500" :options="chartOptions" :series="series"></apexchart>
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
            series: [],
            chartOptions: {
                xaxis: {
                    title: {
                        text: 'Month'
                    }
                },
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

                response.data.map(index => {
                    this.series.push(index.valueTotal);
                    this.chartOptions.labels.push(`${index.month} - ${index.year}`);
                })

            } catch (error) {
                console.log(error);
            }
        },
        async index() {
            try {
                const response = await axios.get(`/dashboard/${this.$store.getters.getUserLogin.id}`);

                console.log(response);

                // response.data.map(index => {
                //     this.series.push(index.valueTotal);
                //     this.chartOptions.labels.push(`${index.month} - ${index.year}`);
                // })

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

                this.series = [];
                this.chartOptions.labels = [];

                response.data.map(index => {
                    this.chartOptions.labels.push(`${index.month} - ${index.year}`);
                    this.series.push(index.valueTotal);
                })

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
