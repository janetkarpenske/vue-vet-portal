<template>
    <div>
        Name: {{ petDetails.upName }}
        <br>
        Species: {{ petDetails.upSpecies }}
        <br>
        Sex: {{ petDetails.upSex }}
        <br>
        Owner Email/Username: {{ petDetails.upOwner }}

    </div>
</template>

<script setup>
    const props = defineProps(['petDetails'])
</script>
