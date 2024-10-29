<template>
<div class="text-center pa-4">
    <v-dialog
        v-model="isModalOpen"
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
                v-model="data.addPetFormData.petName"
                label="Pet name*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="data.addPetFormData.additionalNames"
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
                v-model="data.addPetFormData.age"
                label="Age*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="data.addPetFormData.sex"
                label="Sex*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-autocomplete
                v-model="data.addPetFormData.species"
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
                v-model="data.addPetFormData.breed"
                label="Breed*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="data.addPetFormData.color"
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
            @click="emitCloseModal"
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

<script setup>
    import { reactive, ref, computed } from 'vue';
    import { DB } from '@/firebase/config';
    import { userStore } from '@/store/userStore';
    import { collection, query, where, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'

    const emit = defineEmits(['modal-closed','pet-added']);
    const props = defineProps(['isAddPetModalOpen','user']);
    const isModalOpen = computed(() => props.isAddPetModalOpen)

    const data = reactive({
    pet:'',
    petid: '',
    addPetFormData: {
      petName:'',
      additionalNames:'',
      sex:'',
      age:'',
      species:'',
      breed:'',
      color:''
    }
  });

const emitCloseModal = () => {
    emit('modal-closed');
  }
const handleAddPet = async() => {
            await addDoc(collection(DB, "userPets"), {
            upBreed: data.addPetFormData.breed,
            upName: data.addPetFormData.petName,
            upOwner: props.user.email,
            upSex: data.addPetFormData.sex,
            upSpecies: data.addPetFormData.species,
            upUserID: props.user.uid
            });
            resetAddPetFormData();
            //emit that a pet was added - close modal and reload pets in parent component
            emit('pet-added');
  }
  const resetAddPetFormData = () => {
    console.log("Reached", data.addPetFormData)
            data.addPetFormData.breed = "";
            data.addPetFormData.petName = "";
            data.addPetFormData.species = "";
            data.addPetFormData.additionalNames = "";
            data.addPetFormData.color = "";
  }

</script>

<style scoped>
h1, .header {
    color: rgb(54, 58, 66);
    text-align: center;
}
</style>
