<template>
    <h1>DASHBOARD</h1>
    <v-container class="petInfoContainer">
        <h3>Your Pets</h3>
        <v-btn>+ Add Pet</v-btn>
        <v-card>
        <v-tabs
            v-model="tab"
            bg-color="rgb(38, 39, 48)"
            align-tabs="center"
        >
            <v-tab value="one">Maple</v-tab>
            <v-tab value="two">Tigger</v-tab>
            <v-tab value="three">Marley</v-tab>
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <pet-details />
                </v-tabs-window-item>
                <v-tabs-window-item value="two">
                    <pet-details />
                </v-tabs-window-item>
                <v-tabs-window-item value="three">
                    <pet-details />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import PetDetails from '@/components/PetDetails.vue';

export default {
  components: { PetDetails },
    data: () => ({
      tab: null,
    }),
  }
</script>

<style scoped>
    h1 {
        text-align: center;
        color: rgb(38, 39, 48);
        letter-spacing: 5px;
    }
    .petInfoContainer {
        height: fit-content;
    }
</style>

