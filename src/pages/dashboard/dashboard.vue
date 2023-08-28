
<template>
    <div>
        <h1>{{ this.$store.state.user.data.name }}</h1>
    </div>
</template>


<script>

import axios from '../../services/api.js';

export default {
    data() {
        return {
            data: {
                user: {}
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
                console.log(error);
            }
        }
    }
}
</script>