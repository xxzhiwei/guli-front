<template>
    <div>{{record.title}}</div>
</template>

<script>
import { getCourseById } from '../../api/course';

export default {
    data() {
        return {
            record: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const { id = '1348141723099459586' } = this.$route.params
            this.getCourseById(id)
        },
        async getCourseById(courseId) {
            const result = await getCourseById(courseId)
            if (result.isSuccess) {
                this.record = result.record
            }
        }
    }
};
</script>

<style>
</style>