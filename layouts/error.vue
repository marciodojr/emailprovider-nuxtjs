<template>
    <v-layout column justify-center align-center>
        <v-flex xs12>
            <h1 class="display-4 text-xs-center font-weight-bold">{{error.statusCode}}</h1>
        </v-flex>
        <v-flex xs12>
            <p class="headline text-xs-center" v-if="error.statusCode === 404">Página não encontrada</p>
            <p class="headline text-xs-center" v-if="error.statusCode === 403">Área restrita</p>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['error'],
    layout: 'simple' // you can set a custom layout for the error page
}
</script>
