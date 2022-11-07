<template>
  <q-page>
    <!-- <div>companys : {{ companys }}</div> -->
    <div v-for="(company, index) in companys" :key="index">
      <div>
        <q-card>
          <q-card-section>
          <div>
            <div class="text-h5 flex flex-center">Firma: {{ company.firmaName }}</div>

            <div>
              <q-btn icon="delete" class="float-right" color="negative" @click="deleteSubnetz(company.id)"></q-btn>
            </div>
            <div>
              <q-btn icon="edit" class="float-right" @click="editSubnetz(company.id)"></q-btn>
            </div>
          </div>
            <q-separator />
          </q-card-section>
          <q-card-actions>
            <div
              v-for="(subnet, index) in company.subnetzs.sort(
                (a, b) => b.numHosts - a.numHosts
              )"
              :key="index"
              class="col-12 flex flex-center"

            >
              <div>
                <!-- {{subnet}} -->
                <div class="row">
                  <div style="width: 235px;">Netzname : "{{ subnet.netzname }}"</div>
                  <div style="width: 235px;">IP : "{{ subnet.ipAddress }}"</div>
                  <div style="width: 255px;" >Broadcast : "{{ subnet.broadcast }}"</div>
                  <div class="">Anzahl der Hosts : "{{ subnet.numHosts }}"</div>
                  <!-- <div>
                broadcast : {{subnet.suffix}}
                </div> -->
                </div>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div><q-btn @click="dbModel_anzeigen=true" label="dbModel_anzeigen" @dblclick="dbModel_anzeigen=false">

    </q-btn></div>
    <div v-if="dbModel_anzeigen">
      <q-img  src="/img/123.png"></q-img>
    <q-img  src="/img/queryInSubnetz.png"></q-img>
    </div>

  </q-page>
</template>
<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";



import { useQuasar } from "quasar";
const companys = ref([]);
export default {

  setup() {
const router = useRouter();
const $q = useQuasar()

    axios.get("http://localhost:8989/allCompany").then((response) => {
      companys.value = response.data;
    });
    return {
      dbModel_anzeigen:ref(false),
      companys,
      editSubnetz(id){
     router.replace("customer/"+id)
    },
    deleteSubnetz(id){
     $q.dialog({
        title: 'Confirm',
        message: 'Möchten Sie wirklich diese Subnets löschen?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {

        axios.delete("http://localhost:8989/deleteCompany/"+id).then(() =>{
          companys.value.splice(id,1)

        })
      })

    }

    };
  },
  methods:{

  }
};
</script>
