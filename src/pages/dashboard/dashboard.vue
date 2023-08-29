
<template>
    <div>
        <h1>TUDO CERTINHO</h1>
    </div>


    <a-button @click="all">
        esqueceu sua senha?
    </a-button>
</template>


<script>

import axios from '../../services/api.js';

export default {
    data() {
        return {
            data: {
                user: {},
            }
        }
    },

    mounted() {
        this.all()
    },
    methods: {
        async all() {
            try {

                await axios.get('user/all');

            } catch (error) {
                this.$notification.notification(error.response.status, 'token invalido');
            }
        }
    }
}
</script>