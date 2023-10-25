<template>
    <a-result status="404" title="404" sub-title="Pagina não encontrada!">
        <template #extra>
            <router-link to="/dashboard">
                <a-button type="primary">Voltar</a-button>
            </router-link>
        </template>
    </a-result>
</template>