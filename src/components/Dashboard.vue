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
        max-width="1200px"
        prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete."
        title="Register a Pet"
      >
      <v-card-text>
        <v-row dense>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Pet name*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                hint="example of helper text only on focus"
                label="Additional Names"
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Canine','Feline','Equine','Misc']"
                label="Species"
                auto-select-first
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Breed*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
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
import { collection, query, where, getDocs } from 'firebase/firestore'

//options API
export default {
  components: { PetDetails },
    data: () => ({
      tab: 0,
      items: [],
      userPets: [],
      isAddPetModalOpen: false,
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

        handleAddPet(){
            console.log(this.tab)
            this.isAddPetModalOpen = false;
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

