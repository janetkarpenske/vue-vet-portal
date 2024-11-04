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
        title="Editing Info"
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
            @click="handleEditPet"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
    import { reactive, ref, computed, onMounted } from 'vue';
    import { DB } from '@/firebase/config';
    import { userStore } from '@/store/userStore';
    import { collection, query, where, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'

    const emit = defineEmits(['modal-closed','pet-updated']);
    const props = defineProps(['isEditPetModalOpen','petid','existingPet','user']);
    const isModalOpen = computed(() => props.isEditPetModalOpen)

    const data = reactive({
    petid: '',
    userid: '',
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

    onMounted(()=>{
      if(props.existingPet?.upName != null){
        data.addPetFormData.petName = props.existingPet.upName ?? "";
        data.addPetFormData.additionalNames = props.existingPet.upAdditionalNames ?? "";
        data.addPetFormData.sex = props.existingPet.upSex ?? "";
        data.addPetFormData.age = props.existingPet.upAge ?? "";
        data.addPetFormData.species = props.existingPet.upSpecies ?? "";
        data.addPetFormData.breed = props.existingPet.upBreed ?? "";
        data.addPetFormData.color = props.existingPet.upColor ?? "";
        data.userid = props.existingPet.upUserID;
        data.petid = props.petid;
      }
    })

const emitCloseModal = () => {
    emit('modal-closed');
  }
const handleEditPet = async() => {
            await setDoc(doc(DB, "userPets", data.petid), {
            upBreed: data.addPetFormData.breed,
            upName: data.addPetFormData.petName,
            upAdditionalNames: data.addPetFormData.additionalNames,
            upAge: data.addPetFormData.age,
            upColor: data.addPetFormData.color,
            upOwner: props.user.email,
            upSex: data.addPetFormData.sex,
            upSpecies: data.addPetFormData.species,
            upUserID: props.user.uid
            });
            resetFormData();
            //emit that a pet was edited - close modal and reload pet data in parent component
            emit('pet-updated');

  }
  const resetFormData = () => {
            data.addPetFormData.breed = "";
            data.addPetFormData.petName = "";
            data.addPetFormData.species = "";
            data.addPetFormData.additionalNames = "";
            data.addPetFormData.color = "";
            data.petid = "";
  }

</script>

<style scoped>
h1, .header {
    color: rgb(54, 58, 66);
    text-align: center;
}
</style>
