<template>
    <div class="container">
        <div class="image-login h-screen">
            <img src="../../assets/images/login.png" alt="">
        </div>
        <div class="form-login d-flex justify-center w-50 align-center h-screen">
            <v-form @submit.prevent>
                <v-sheet width="300" class="mx-auto" color="#F8F9FC">
                    <h3 class="mb-2">LOGO DA EMPRESA</h3>

                    <v-text-field label="Email" type="email" variant="underlined" v-model="email" clearable
                        :rules="[() => !!email || 'Campo email é obrigatório']" />

                    <v-text-field label="Senha" type="password" variant="underlined" v-model="password"
                        :rules="[() => !!password || 'Campo senha é obrigatório']" />

                    <router-link to="/recuperar-senha" class="d-flex justify-end align-end text-caption mb-2 link-forgot">
                        esqueceu sua senha?
                    </router-link>

                    <v-btn class="w-100 mt-2" color="indigo-darken-3" type="submit">Entrar</v-btn>

                    <div class="d-flex justify-end align-end text-caption mt-2">
                        <span class="mr-1">não tem cadastro?</span>
                        <router-link to="/cadastro">
                            <strong>clique aqui</strong>
                        </router-link>
                    </div>
                </v-sheet>
            </v-form>
        </div>
    </div>
</template>

<script>
import './login.css'
import login from './login.js';
export default login;
</script>