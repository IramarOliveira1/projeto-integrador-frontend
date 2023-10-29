<template>
    <div class="container-main">
        <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="filter" :hideRequiredMark="true" v-if="this.$store.getters['user/getUser'].role === 'ADMIN'">
            <a-form-item label="FILTRAR FATURAMENTO POR PERIODO" name="date"
                :rules="[{ required: true, message: 'Campo filtrar � obrigat�rio!' }]">
                <a-range-picker v-model:value="data.date" :disabled-date="disabledDate" @change="onChange"
                    @openChange="onOpenChange" @calendarChange="onCalendarChange" size="large" format="DD-MM-YYYY"
                    :locale="locale" />
            </a-form-item>
            <div class="button-filter-dashboard">
                <a-button type="primary" html-type="submit" size="large">CONTINUAR</a-button>
                <a-button type="primary" @click="all" size="large" v-if="buttonFilter">Limpar Filtro</a-button>
            </div>
        </a-form>

        <div id="donut" v-if="this.$store.getters['user/getUser'].role === 'ADMIN'">
            <h3 style="margin-top: 20px;">Faturamento mensal do ano atual por 12 meses.</h3>
            <apexchart ref="chart" type="bar" height="350" :options="barHorizontalOptions" :series="barHorizontal" />
        </div>
        <div id="bar" style="margin-bottom: 20px;">
            <h3>Quantidade de veiculo alugado por mes</h3>
            <apexchart ref="chart" type="bar" height="350" :options="barOptions" :series="bar" />
        </div>
    </div>
</template>

<script>

import axios from '../../services/api.js';

import VueApexCharts from "vue3-apexcharts";

import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            locale,
            data: {
                date: [],
                value: [],
                hackValue: []
            },
            barHorizontal: [
                {
                    name: 'donut',
                    data: []
                },
            ],
            barHorizontalOptions: {
                tooltip: {
                    y: {
                        title: {
                            formatter: function () {
                                return ''
                            }
                        }
                    }
                },
                colors: ['#009688', '#E91E63', '#3F51B5', '#607D8B', '#FF5722', '#8BC34A', '#FFC107', '#03A9F4', '#00BCD4', '#F44336', '#9E9E9E', '#795548'],
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#000']
                    },

                },
                plotOptions: {
                    bar: {
                        expandOnClick: false,
                        horizontal: false,
                        distributed: true,
                    }
                },
                chart: {
                    type: 'pie',
                    toolbar: {
                        show: false
                    }
                },
                responsive: [
                    {
                        breakpoint: 1000,
                        options: {
                            plotOptions: {
                                bar: {
                                    horizontal: true
                                }
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ],
                labels: [],
            },
            bar: [
                {
                    name: 'bar',
                    data: []
                }
            ],
            barOptions: {
                colors: ['#3F51B5'],
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        size: 200
                    }
                },
                chart: {
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
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

                this.barHorizontal[0].data = [];
                this.barHorizontalOptions.labels = [];

                const arr = [];

                response.data.map(index => {
                    arr.push(`${index.month} - ${index.year}`);
                    this.barHorizontal[0].data.push(index.valueTotal);
                })

                this.barHorizontalOptions = { labels: arr };

                this.$store.commit('generic/setFilterExits', false);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async filter() {
            try {
                const response = await axios.post('/dashboard/filter', {
                    start: this.data.date[0].format('DD-MM-YYYY'),
                    end: this.data.date[1].format('DD-MM-YYYY')
                });

                this.barHorizontal[0].data = [];
                this.barHorizontalOptions.labels = [];

                const arr = [];

                response.data.map(index => {
                    arr.push(`${index.month} - ${index.year}`);
                    this.barHorizontal[0].data.push(index.valueTotal);
                })

                this.barHorizontalOptions = { labels: arr };

                this.data.date = null;

                this.$store.commit('generic/setFilterExits', true);
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },
        async index() {
            try {
                const response = await axios.get(`/dashboard/${this.$store.getters['user/getUser'].id}`);

                response.data.map(index => {
                    this.bar[0].data.push((index.amountTotal));
                    this.barOptions.labels.push(`${index.month} - ${index.year}`);
                });

            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
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
