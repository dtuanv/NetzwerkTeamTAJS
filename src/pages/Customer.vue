<template>
  <q-page>
    <div class="flex justify-center q-mt-lg">
      <div style="width: 60%">
        <q-card>
          <q-form @submit="onSubmit">
            <q-card-section>
              <div class="flex justify-center text-h5">Information</div>
            </q-card-section>
            <q-card-actions>
              <div style="width: 100%">
                <div>
                  <q-input
                    v-model="customer.numClients"
                    label="Anzahl der Clients"
                  ></q-input>
                </div>
                <div class="row">
                  <q-input v-model="customer.name" label="Name" class="col-4"></q-input>
                  <div class="col-2"></div>
                  <q-input
                    v-model="customer.numHosts"
                    label=" Anzahl der Hosts"
                    class="col-6"
                  ></q-input>
                </div>
                <q-input v-model="customer.ip" label="IP "></q-input>

                <q-btn
                  type="submit"
                  icon-right="cloud_upload"
                  color="positive"
                  label="Submit"
                  dense
                  class="q-mt-lg float-right"
                ></q-btn>
              </div>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>

    <div>
   <div>Antest::{{ customer.ip }}</div>
    <q-btn
      label="CHECK IP :"
      @click="check(customer.ip, customer.numHosts), (notShow_dialog = false)"
    ></q-btn>

    </div>

    <!-- v-if="ip_dialog" style="width: 60%" -->
    <div v-if="true" class="flex justify-center q-mt-lg">
      <q-card style="width: 60%" >
        <q-card-section>
          <div></div>
        </q-card-section>
        <q-card-actions>
          <div>
            <div>Natzmask: {{ customer.netzmask }}</div>

            <div>Wildcast: {{ customer.wildcard }}</div>

            <div>Broadcast : {{ customer.broadcast }}</div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { mathIp } from "src/ipCalculate/logicCalculateIp";
const customer = ref({
  WildCast: "",
});
const checkBoolean = ref("show Check");

const netzs = [{ label: "Name 1: " }];
export default {
  setup() {
    const $q = useQuasar();
    const mathIpi = new mathIp();
    mathIpi.checkIp(customer.ip);

    // console.log("checkIp: ",checkIp(customer.ip))
    console.log("checkIp: ", customer.ip);
    console.log("checkIp mathIp: ", mathIpi.checkIp(customer.ip));
    // console.log("checkIp mathIp: ip ", mathIpi.checkIp("192.165.1.1"));
    // if (mathIpi.checkIp(customer.ip)) {
    //   console.log("check");
    //   checkBoolean = "TRUE";
    // }

    // checkIp(customer.ip.value)

    return {
      customer,
      ip_dialog: ref(false),
      notShow_dialog: false,
    };
  },
  methods: {
    onSubmit() {
      this.notShow_dialog = true;
      this.check(this.customer.ip, this.customer.numHosts);
      console.log("customer ", customer.value);
    },

    check(ip, hostNum) {
      const mathIpi = new mathIp();
      if (mathIpi.checkIp(ip)) {
        // mathIp.findBroadcast(27,ip)
        const mathIpi2 = new mathIp();
        this.customer.broadcast = mathIpi2
          .findBroadcast(parseInt(hostNum) + 2, ip)
          .join(".");
        this.customer.wildcard = mathIpi2.findWildCard(
          mathIpi2.findNetzMaskeInAList(parseInt(hostNum) + 2)
        );
        this.customer.netzmask = mathIpi2.convertNetzMaskeToString(parseInt(hostNum) + 2);
        if (this.notShow_dialog != true) {
          this.ip_dialog = true;
        }

        // checkBoolean = "TRUE";
      } else {
        this.$q.notify({
          message: "Bitte geben Sie eine richtige IP Adreese ",
          icon: "announcement",
          color: "negative",
        });
        console.log("No check");
      }
    },
  },
  computed: {},
};
</script>
