<template>
    <a-result status="404" title="404" sub-title="Pagina n�o encontrada!">
        <template #extra>
            <router-link to="/dashboard">
                <a-button type="primary">Voltar</a-button>
            </router-link>
        </template>
    </a-result>
</template>