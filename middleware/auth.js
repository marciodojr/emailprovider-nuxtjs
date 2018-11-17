export default function ({ store, error }) {
    if (!store.getters.isAuthenticated) {
        error({ statusCode: 403, message: 'Forbidden' })
    }
}
