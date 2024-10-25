<template>
    <h1>Pet Full Details</h1>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { doc, getDoc } from "firebase/firestore";
    import { onBeforeMount, onMounted } from 'vue';
    import { DB } from '@/firebase/config';

    const route = useRoute();
    const petData = reactive({
    pet:''
  });

    onMounted(()=>{
        getPetInfo();
    })

const getPetInfo = async() => {
try{
    const docRef = doc(DB, "userPets", route.params.petid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        petData.pet = docSnap.data();
    } else {
    alert("No such pet exists");
    }
}
catch(error){
    console.log(error);
}
  }
</script>

<style scoped>
</style>