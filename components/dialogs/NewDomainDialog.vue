<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span>
                    <v-icon class="mr-2">domain</v-icon>Novo Domínio
                </span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="domain" label="Domínio"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.stop="accept">Salvar</v-btn>
                <v-btn color="error" flat @click.stop="cancel">Desistir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        isopen: Boolean
    },
    data() {
        return {
            dialog: false,
            domain: ''
        }
    },
    methods: {
        accept() {
            this.$axios
                .$post('/virtual-domains', {
                    name: this.domain
                })
                .then(resp => {
                    console.log(resp.data)
                    this.$emit('accept', resp.data)
                })
        },
        cancel() {
            this.$emit('cancel')
        }
    },
    created() {
        this.dialog = this.isopen
    },
    watch: {
        isopen() {
            // changes from parent
            this.dialog = this.isopen
        },
        dialog() {
            // changes from child
            if (!this.dialog) {
                this.cancel()
            }
        }
    }
}
</script>
