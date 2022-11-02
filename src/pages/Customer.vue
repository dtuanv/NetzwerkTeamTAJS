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
                <!-- <div>
                  <q-input
                    v-model="customer.numClients"
                    label="Anzahl der Clients"
                  ></q-input>
                </div> -->
                <div class="row">
                  <q-input class="col-4" v-model="ipAddress" label="IP "></q-input>
                  <div class="col-2"></div>
                  <q-input class="col-4" v-model="companyName" label="Firma "></q-input>
                </div>

                <div v-for="(customer, index) in customers" :key="index">

                  <div class="row">
                    <q-input
                      v-model="customer.name"
                      :label="customer.labelName"
                      class="col-4"
                    ></q-input>
                    <div class="col-2"></div>
                    <q-input
                      v-model="customer.numHosts"
                      :label="customer.labelNumHost"
                      class="col-4"
                    ></q-input>
                    <q-btn
                      class=""
                      flat
                      icon="delete"
                      color="negative"
                      v-show="index > 0"
                      @click="removeInput(index)"
                    ></q-btn>
                  </div>

                  <div class="row">
                    <div class="col-6 q-mt-lg q-ml-lg">
                      <q-btn
                        dense
                        label="CHECK IP :"
                        @click="
                          check(ipAddress, customer.numHosts, index),
                            (notShow_dialog = false)
                        "
                      ></q-btn>
                    </div>
                  </div>
                </div>

                <div>
                  <q-btn
                    class="q-mt-sm"
                    dense
                    color="positive"
                    icon="add_circle"
                    @click="addInput()"
                  >
                  </q-btn>
                </div>

                <div>
                  <!-- <div class="col-6 q-mt-lg q-ml-lg">
                    <q-btn
                      dense
                      label="CHECK IP :"
                      @click="
                        check(customer.ip, customer.numHosts), (notShow_dialog = false)
                      "
                    ></q-btn>
                  </div> -->

                  <div class="col-5">
                    <q-btn
                      type="submit"
                      icon-right="cloud_upload"
                      color="positive"
                      label="Submit"
                      dense
                      class="q-mt-lg float-right"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>

<!-- <div>customers: {{customers[1]}}</div> -->

    <!-- v-if="result_dialog" style="width: 60%" -->
  </q-page>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { mathIp } from "src/ipCalculate/logicCalculateIp";

const checkBoolean = ref("show Check");

const netzs = [{ label: "Name 1: " }];
const ipAddress = ref("");
const companyName = ref("");
const customers = ref([{ labelName: "Name", labelNumHost: "Anzahl der Hosts" }]);
export default {
  setup() {
    const $q = useQuasar();
    const mathIpi = new mathIp();
    // mathIpi.checkIp(ipAddress.value);

    // console.log("checkIp: ",checkIp(customer.ip))
    console.log("checkIp: ", ipAddress.value);
    // console.log("checkIp mathIp: ", mathIpi.checkIp(ipAddress));
    // console.log("checkIp mathIp: ip ", mathIpi.checkIp("192.165.1.1"));
    // if (mathIpi.checkIp(customer.ip)) {
    //   console.log("check");
    //   checkBoolean = "TRUE";
    // }

    // checkIp(customer.ip.value)

    return {
      result_dialog: ref(false),
      notShow_dialog: false,
      customers,
      companyName,
      ipAddress,
      addInput() {
        this.customers.push({
          labelName: "Name",
          labelNumHost: "Anzahl der Hosts",
        });
      },
      removeInput(index) {
        this.customers.splice(index, 1);
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("this.customers.length", this.customers.length);
      console.log("this.customers", this.customers);
      for (var i = 0; i < this.customers.length; i++) {
        var hostNum = this.customers[0].numHosts;
        this.check(this.ipAddress, hostNum, 0);
        console.log("i: ", i);
        if (i > 0) {
          // console.log("this.customers[i].broadcast.split('.')", this.customers[i-1].broadcast.split('.'));
          // console.log("this.customers[i].broadcast.split('.')",this.customers[i].broadcast.split('.'))
          var broadcastArr = this.customers[i - 1].broadcast.split(".");
          console.log("broadcastArr ", broadcastArr);
          var endBroadcast = (parseInt(broadcastArr[3]) + 1).toString();
          broadcastArr[3] = endBroadcast;
          var firstIp = broadcastArr.join(".");
          console.log("firstIp", firstIp);
          //     const mathIpi = new mathIp();

          //  var suffix =   mathIpi.findSuffix(this.customers[i].numHosts)
          //     console.log("Suffixxxxxx: " ,suffix)
          this.check(firstIp, this.customers[i].numHosts, i);
        }

        // console.log("for",this.customers[i].numHosts, " i: ",i)
      }

      console.log("Cusj in submit", customers.value);
    },

    check(ip, hostNum, index) {
      const mathIpi = new mathIp();

      var suffix = mathIpi.findSuffix(hostNum);
      console.log("Suffixxxxxx: ", suffix);
      if (mathIpi.checkIp(ip)) {
        // mathIp.findBroadcast(27,ip)
        const mathIpi2 = new mathIp();
        this.customers[index].broadcast = mathIpi2
          .findBroadcast(suffix, ip)
          // .findBroadcast(parseInt(hostNum) + 2, ip)
          .join(".");
        this.customers[index].wildcard = mathIpi2.findWildCard(
          mathIpi2.findNetzMaskeInAList(suffix)
          // mathIpi2.findNetzMaskeInAList(parseInt(hostNum) + 2)
        );
        const netzmask = mathIpi.findNetzMaskeInAList(suffix);
        // const netzmask = mathIpi.findNetzMaskeInAList(parseInt(hostNum) + 2);

        this.customers[index].netzmask = netzmask.join(".");
        if (this.notShow_dialog != true) {
          this.result_dialog = true;
        }
        // console.log("customers ", customers.value)
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
