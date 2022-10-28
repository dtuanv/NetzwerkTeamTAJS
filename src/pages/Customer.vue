<template>
  <q-page>
    <div class="flex justify-center q-mt-lg">
      <q-card style="width:60%">
        <q-card-section>
          <div class="flex justify-center text-h5">Information</div>
        </q-card-section>
        <q-card-actions>
          <div  style="width:100%">
            <div>
              <q-input v-model="customer.numClients"  label="Anzahl der Clients"></q-input>

            </div>
            <div class="row">
            <q-input v-model="customer.name"  label="Name" class="col-4"></q-input>
              <div class="col-2"></div>
              <q-input v-model="customer.numHosts"  label=" Anzahl der Hosts" class="col-6"></q-input>
            </div>

            <q-btn type="submit" icon-right="cloud_upload" color="positive" label="Submit" dense class=" q-mt-lg float-right" ></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
    <div>An</div>
  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
const customer = ref({})
export default {
  setup(){


    return{
      customer,
    }
  }
}

</script>
