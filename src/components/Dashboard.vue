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
            <v-tab v-for="pet in userPets"
            :key="pet.upName"
            :value="pet.key">{{ pet.upName }}</v-tab>
            <!-- <v-tab value="two">Tigger</v-tab>
            <v-tab value="three">Marley</v-tab> -->
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item 
                    v-for="pet in userPets"
                    :value="pet.key"
                    :key="pet.upName"
                    >
                    <pet-details 
                        :petDetails="pet"
                    />
                </v-tabs-window-item>
                <!-- <v-tabs-window-item value="two">
                    <pet-details />
                </v-tabs-window-item>
                <v-tabs-window-item value="three">
                    <pet-details />
                </v-tabs-window-item> -->
            </v-tabs-window>
        </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import PetDetails from '@/components/PetDetails.vue';
import { userStore } from '@/store/userStore';
import { DB } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore'

//options API
export default {
  components: { PetDetails },
    data: () => ({
      tab: null,
      items: [],
      userPets: []
    }),
    methods: {
        async getUserPets(userID) {
        const q = query(collection(DB, "userPets"), where("upUserID", "==", userID));

        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach((doc) => {

        const pet = {
            upName: doc.data().upName,
            upSpecies: doc.data().upSpecies,
            upUserID: doc.data().upUserID,
            upOwner: doc.data().upOwner,
            upSex: doc.data().upSex
        };
        this.userPets.push(pet);
        });
        }
    },
    created() {
        const userStoreRef = userStore();
        let user = userStoreRef.getUser;
        if(user != null) {
            this.getUserPets(user.uid);
        }
    }
  };
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

