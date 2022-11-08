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
              <q-btn icon="delete" class="float-right" color="negative" @click="deleteSubnetz(company.id,index)"></q-btn>
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
    <div class="q-mt-lg"><q-btn @click="dbModel_anzeigen=true" label="dbModel_anzeigen" @dblclick="dbModel_anzeigen=false" color="positive">

    </q-btn></div>
    <div v-if="dbModel_anzeigen">
    <div class="flex flex-center text-h5" style="background-color: antiquewhite">DatenBank Modelle</div>
      <q-img  src="/img/123.png"></q-img>
    <q-img  src="/img/queryInSubnetz.png"></q-img>
    </div>
    <div>
      <q-btn class="q-mt-lg" @click="dbJoin_anzeigen=true" label="dbJoin_anzeigen" @dblclick="dbJoin_anzeigen=false" color="positive"></q-btn>
    </div>
    <div v-if="dbJoin_anzeigen">
    <div class="flex flex-center text-h5" style="background-color: antiquewhite">Join Query</div>
    <q-img src="/img/joinQuery.png"></q-img>
    <div  class="flex flex-center text-h5" style="background-color: antiquewhite">Join-Sort-Convert</div>
    <q-img src="/img/join_sort_convert.png"></q-img>
    </div>

    <!-- Join von 2 Tabelle -->
    <div >
      <q-btn class="q-mt-lg" @click="dbJoin2Tb_anzeigen=true" label="dbJoin2Tb_anzeigen" @dblclick="dbJoin2Tb_anzeigen=false" color="positive"></q-btn>
    </div>
    <div v-if="dbJoin2Tb_anzeigen">
    <div class="flex flex-center text-h5" style="background-color: antiquewhite">2 Join-Count-Sort</div>
    <q-img src="/img/2join_count_sort.png"></q-img>
    <div  class="flex flex-center text-h5" style="background-color: antiquewhite">2 Join-WHERE-Sort</div>
    <q-img src="/img/2join_sort_where_more_20.png"></q-img>
    </div>

    <!-- AVG_SUM_UPDATE_DELETE -->
    <div>
      <q-btn class="q-mt-lg" @click="avg_sum_anzeigen=true" label="avg_sum_anzeigen" @dblclick="avg_sum_anzeigen=false" color="positive"></q-btn>
    </div>
    <div v-if="avg_sum_anzeigen">
    <div class="flex flex-center text-h5" style="background-color: antiquewhite">Join-AVERAGE(Durschnitt)-Sort(DESC)</div>
    <q-img src="/img/AVG_SORT.png"></q-img>
    <div  class="flex flex-center text-h5" style="background-color: antiquewhite">Join-SUM-Sort(ASC)</div>
    <q-img src="/img/sum_sort.png"></q-img>

    <div  class="flex flex-center text-h5" style="background-color: antiquewhite">Update Value</div>
    <q-img src="/img/updateNewFirmaName.png"></q-img>
    <div  class="flex flex-center text-h5" style="background-color: antiquewhite">Delete Company</div>
    <q-img src="/img/testToRemove.png"></q-img>

    </div>
    <div class="q-mt-lg flex flex-center" style="color: blue;"> VIELEN DANKE FÜR IHRE AUFMERKSAMKEIT </div>
    <div class="q-mt-lg flex flex-center q-mb-lg" style="color: chocolate;" > TUAN_ANDRII_STEVEN_JULIAN </div>
  </q-page>
</template>
<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { WebApi } from "/src/apis/WebApi";


import { useQuasar } from "quasar";
const companys = ref([]);
export default {

  setup() {
const router = useRouter();
const $q = useQuasar()

    axios.get(`${WebApi.server}/allCompany`).then((response) => {
      companys.value = response.data;
    });
    return {
      dbJoin_anzeigen:ref(false),
      dbJoin2Tb_anzeigen:ref(false),
      dbModel_anzeigen:ref(false),
      avg_sum_anzeigen:ref(false),
      companys,
      editSubnetz(id){
     router.replace("customer/"+id)
    },
    deleteSubnetz(id,index){
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

        axios.delete(`${WebApi.server}/deleteCompany/`+id).then(() =>{
          companys.value.splice(id,1)

        })
        this.companys.splice(index,1)

      })

    }

    };
  },
  methods:{

  }
};
</script>
