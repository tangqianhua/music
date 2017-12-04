import { mapGetters } from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    mounted() {
        this.handleListBottom(this.playList)
    },
    activated() {
        this.handleListBottom(this.playList)
    },
    watch: {
        'playList' (val) {
            this.handleListBottom(val)
        }
    },
    methods: {
        handleListBottom() {
            throw new Error('没有定义handleListBottom方法~')
        }
    }
}