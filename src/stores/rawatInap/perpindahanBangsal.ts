import { defineStore } from 'pinia';

import { apiRawatInapGet } from '@/utils/apiHandler';


export const useRawatInapStore = defineStore({
    id: 'rawatInap',
    state: () => ({}),
    getters: {},
    actions: {
        async getPerpindahanBangsal({
        q = '',
        dpjp = '',
        }, payload = {}
        ) {
        return apiRawatInapGet(
            `/perpindahan-bangsal?q=${q}&dpjp=${dpjp}`, payload
        );
        },
    },
})