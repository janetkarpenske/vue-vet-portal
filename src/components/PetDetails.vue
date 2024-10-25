<template>
    <div>
        <b>Name</b> {{ petDetails.upName }}
        <br>
        <b>Species</b> {{ petDetails.upSpecies }}
        <br>
        <b>Sex</b> {{ petDetails.upSex }}
        <br>
        <b>Owner Email/Username</b> {{ petDetails.upOwner }}
        <br>
        <router-link :to="'/petdetails/'+petDetails.upDocumentID">View Full Details</router-link>

        <div v-if="count == true">
            <p>Only show data here if user is an employee</p>
        </div>
    </div>
</template>

<script setup>
import { userStore } from '@/store/userStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter();
    const userStoreRef = userStore();

    const props = defineProps(['petDetails'])
    const count = computed(()=> userStoreRef.getUserIsAdmin);
</script>
