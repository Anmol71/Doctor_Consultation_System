<template>
    <div class="body">
        <h1>
            DoctorDashboard
        </h1>
        <CreateKey/>
    </div>
</template>
<script>
import CreateKey from './CreateKey.vue';
export default{
    name:'DoctorDashboard',
    components:{
        CreateKey
    }
}

</script>

<style scoped>
.body{
    /* background-color: rgb(232, 176, 176); */
}
h1{
    padding-top: 100px;
    color: brown;
    padding-bottom: 100px;
}
</style>