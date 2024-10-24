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
            :key="pet.upName"
            :value="pet.key">{{ pet.upName }}</v-tab>
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
            </v-tabs-window>
        </v-card-text>
        </v-card>
    </v-container>
    <div class="text-center pa-4">
    <v-dialog
        v-model="isAddPetModalOpen"
        width="auto"
    >
      <v-card
        width="60vw"
        prepend-icon="mdi-update"
        text=""
        align="center"
        title="Register a Pet"
      >
      <v-card-text>
        <v-row dense>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="addPetFormData.petName"
                label="Pet name*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="addPetFormData.additionalNames"
                hint="Add any nicknames or alternate names"
                label="Additional Names"
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="addPetFormData.age"
                label="Age*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="addPetFormData.sex"
                label="Sex*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-autocomplete
                v-model="addPetFormData.species"
                :items="['Canine','Feline','Equine','Misc']"
                label="Species*"
                auto-select-first
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="addPetFormData.breed"
                label="Breed*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="addPetFormData.color"
                label="Color*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Close"
            color="black"
            variant="plain"
            @click="isAddPetModalOpen = false"
          ></v-btn>

          <v-btn
            color="rgb(54, 56, 80)"
            text="Save"
            variant="tonal"
            @click="handleAddPet"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PetDetails from '@/components/PetDetails.vue';
import { userStore } from '@/store/userStore';
import { DB } from '@/firebase/config';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore'

//options API
export default {
  components: { PetDetails },
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
            upSex: doc.data().upSex
        };
        this.userPets.push(pet);
        });
        },

        async handleAddPet(){
            //Note: 3rd string param sets a custom id. Ommitting auto generates the id
            await setDoc(doc(DB, "userPets"), {
            upBreed: this.addPetFormData.breed,
            upName: this.addPetFormData.petName,
            upOwner: this.user.email,
            upSex: "Male",
            upSpecies: this.addPetFormData.species,
            upUserID: this.user.uid
            });
            this.resetAddPetFormData();
            this.isAddPetModalOpen = false;
        },

        resetAddPetFormData(){
            this.addPetFormData.breed = "";
            this.addPetFormData.petName = "";
            this.addPetFormData.species = "";
            this.addPetFormData.additionalNames = "";
            this.addPetFormData.color = "";
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

