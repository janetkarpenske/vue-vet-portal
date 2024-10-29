<template>
    <h1>{{ petData.pet.upName }}'s Details</h1>
    <b>Name</b> {{ petData.pet.upName }}
    <br>
    <b>Species</b> {{ petData.pet.upSpecies }}
    <br>
    <b>Sex</b> {{ petData.pet.upSex }}
    <br>
    <b>Owner Email/Username</b> {{ petData.pet.upOwner }}
    <br>
    <v-btn
        @click="handleDeletePet"
    >
        Delete Pet
    </v-btn>
    <v-btn
        @click="petData.isEditPetModalOpen = true"
    >
        Edit Pet Details
    </v-btn>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { doc, getDoc, deleteDoc } from "firebase/firestore";
    import { onBeforeMount, onMounted } from 'vue';
    import { DB } from '@/firebase/config';

    const route = useRoute();
    const router = useRouter();
    const petData = reactive({
    pet:'',
    petid: '',
    isEditPetModalOpen: false,
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
            petData.petid = route.params.petid;
        } else {
            alert("No such pet exists");
        }
    }
    catch(error) {
        console.log(error);
    }
}
const handleDeletePet = async() => {
    try{
        await deleteDoc(doc(DB, "userPets", petData.petid));
        router.push('/dashboard');
    }
    catch(error) {
        console.log(error);
    }
}
const handleEditPet = async() => {
    try{
        //await deleteDoc(doc(DB, "userPets", petData.petid));
        //router.push('/dashboard');
    }
    catch(error) {
        console.log(error);
    }
}
</script>

<style scoped>
</style>