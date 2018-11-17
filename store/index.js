import Vuex from 'vuex'
import Cookie from 'js-cookie'

export default () => new Vuex.Store({
    state: () => ({
        token: null
    }),
    actions: {
        autenticateUser(vuexContext, authData) {
            return this.$axios
                .$post('/user/login', authData)
                .then(response => {
                    vuexContext.commit('setToken', response.data.token)
                    Cookie.set('jwttoken', response.data.token)
                })
        },
        initAuth(vuexContext, req) {

            var token = null

            if (req) {

                if (!req.headers.cookie) {
                    return
                }

                let cookieLine = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwttoken'))
                if (cookieLine) {
                    token = cookieLine.split('=')[1]
                }
            } else {
                token = Cookie.get('jwttoken')

            }

            if (token) {
                vuexContext.commit('setToken', token)
            }
        },
        logout(vuexContext) {
            vuexContext.commit('setToken', null)
            Cookie.remove('jwttoken')
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            this.$axios.setToken(token, 'Bearer')
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token != null
        }
    }
});
