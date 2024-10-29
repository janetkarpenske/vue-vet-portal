<template>
    <h1>DASHBOARD</h1>
    <v-container class="petInfoContainer">
        <h3>Your Pets</h3>
        <v-btn @click="isAddPetModalOpen = true" id="addPet">+ Add Pet</v-btn>
        <v-card>
        <v-tabs
            v-model="tab"
            bg-color="rgb(38, 39, 48)"
            align-tabs="center"
        >
            <v-tab v-for="pet in userPets"
            :key="pet.upDocumentID"
            :value="pet.key">{{ pet.upName }}</v-tab>
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item 
                    v-for="pet in userPets"
                    :value="pet.key"
                    :key="pet.upDocumentID"
                    >
                    <pet-details 
                        :petDetails="pet"
                    />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
        </v-card>
    </v-container>
    <pet-details-form
      :isAddPetModalOpen="isAddPetModalOpen"
      :user="user"
      @modal-closed="isAddPetModalOpen = false"
      @pet-added="handlePetRefresh"
    />
</template>

<script>
import PetDetails from '@/components/PetDetails.vue';
import PetDetailsForm from '@/components/forms/PetDetailsForm.vue';
import { userStore } from '@/store/userStore';
import { DB } from '@/firebase/config';
import { collection, query, where, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'

//options API
export default {
  components: { PetDetails, PetDetailsForm },
    data: () => ({
      tab: 0,
      items: [],
      userPets: [],
      isAddPetModalOpen: false,
      user: null,
      addPetFormData: {
        petName:'',
        additionalNames:'',
        sex:'',
        age:'',
        species:'',
        breed:'',
        color:''
      }
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
            upSex: doc.data().upSex,
            upDocumentID: doc.id
        };
        this.userPets.push(pet);
        });
        },

        async handlePetRefresh(){
            this.isAddPetModalOpen = false;
            this.userPets = [];
            await this.getUserPets(this.user.uid)
        }
    },
    created() {
        const userStoreRef = userStore();
        let user = userStoreRef.getUser;
        if(user != null) {
            this.user = user;
            this.getUserPets(this.user.uid);
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

