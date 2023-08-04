<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary">
                <v-toolbar-title>My files</v-toolbar-title>
                <router-link to="/login">
                    <v-list-item title="Login" value="Login"></v-list-item>
                </router-link>
            </v-app-bar>
            <v-main />
        </v-layout>
    </v-card>
</template>