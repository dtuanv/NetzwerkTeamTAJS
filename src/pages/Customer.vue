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
                    v-model="subnet.numClients"
                    label="Anzahl der Clients"
                  ></q-input>
                </div> -->
                <div class="row">
                  <q-input class="col-4" v-model="ipAddress" placeholder="edit me" label="IP "></q-input>
                  <q-icon name="close" @click="ipAddress = ''"></q-icon>
                  <div class="col-2"></div>
                  <q-input
                    class=""
                    v-model="hosts"
                    label="Suffix"
                    style="width: 57px"

                  ></q-input>

                  <q-btn
                    @click="findNumHostFromSuffix(hosts)"
                    label="Zur Hosts"
                    class="col-1 q-ml-sm"
                    color="positive"
                  ></q-btn>
                  <div class="col-3 q-ml-lg" style="align-self: self-end">
                    <div>Von: {{ suffixMinResult }} ,</div>
                    <div>Bis: {{ suffixMaxResult }}</div>
                  </div>
                </div>

                <div v-for="(subnet, index) in subnets" :key="index">
                  <div class="row">
                    <q-input
                      v-model="subnet.name"
                      :label="subnet.labelName"
                      class="col-4"
                    ></q-input>
                    <div class="col-2"></div>
                    <q-input
                      v-model="subnet.numHosts"
                      :label="subnet.labelNumHost"
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

                  <!-- <div class="row">
                    <div class="col-6 q-mt-lg q-ml-lg">
                      <q-btn
                        dense
                        label="CHECK IP :"
                        @click="
                          check(ipAddress, subnet.numHosts, index),
                            (notShow_dialog = false)
                        "
                      ></q-btn>
                    </div>
                  </div> -->
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
                        check(subnet.ip, subnet.numHosts), (notShow_dialog = false)
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

    <!-- <div>subnets: {{subnets[1]}}</div> -->

    <!-- v-if="result_dialog" style="width: 60%" -->
    <div class="flex justify-center q-mt-lg">
      <div style="width: 60%">
        <div
          class="col-12 flex flex-center text-h5"
          style="background-color: blanchedalmond"
        >
          Result
        </div>
        <div v-for="(subnet, index) in subnets" :key="index">
          <q-card class="q-mt-lg">
            <q-card-actions class="q-pl-lg">
              <div class="row col-12">
                <div class="col-6 q-mt-sm">Netzname : {{ subnet.name }}</div>
                <div class="col-5 q-mt-sm">Anzahl Hosts: {{ subnet.numHosts }}</div>
              </div>
              <div class="row col-12">
                <div class="col-6 q-mt-sm">Netzadresse : {{ subnet.ipAddress }}</div>
                <div class="col-5 q-mt-sm">Suffix : {{ subnet.suffix }}</div>
              </div>

              <div class="row col-12">
                <div class="col-6 q-mt-sm">Netzmask : {{ subnet.netzmask }}</div>
                <div class="col-5 q-mt-sm">broadcast : {{ subnet.broadcast }}</div>
              </div>
              <div>
                <div class="col-6 q-mt-sm">wildcard : {{ subnet.wildcard }}</div>
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
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

const checkBoolean = ref("show Check");

const netzs = [{ label: "Name 1: " }];
const ipAddress = ref("192.170.1.0");
const companyName = ref("");
const hosts = ref("");
const suffixMaxResult = ref(0);
const suffixMinResult = ref(0);
const subnets = ref([{ labelName: "Netzname", labelNumHost: "Anzahl der Hosts" }]);
export default {
  setup() {
    const $q = useQuasar();
    const mathIpi = new mathIp();
    // mathIpi.checkIp(ipAddress.value);

    // console.log("checkIp: ",checkIp(subnet.ip))
    // console.log("checkIp mathIp: ", mathIpi.checkIp(ipAddress));
    // console.log("checkIp mathIp: ip ", mathIpi.checkIp("192.165.1.1"));
    // if (mathIpi.checkIp(subnet.ip)) {
    //   console.log("check");
    //   checkBoolean = "TRUE";
    // }

    // checkIp(subnet.ip.value)

    return {
      result_dialog: ref(false),
      notShow_dialog: false,
      subnets,
      suffixMaxResult,
      suffixMinResult,
      hosts,
      companyName,
      ipAddress,
      addInput() {
        this.subnets.push({
          labelName: "Netzname",
          labelNumHost: "Anzahl der Hosts",
        });
      },
      removeInput(index) {
        this.subnets.splice(index, 1);
      },
    };
  },
  methods: {
    findNumHostFromSuffix(suffix) {
      var x = 32 - parseInt(suffix);
      this.suffixMaxResult = Math.pow(2, x) - 2;
      this.suffixMinResult = Math.pow(2, x - 1) - 1;
    },
    onSubmit() {
      this.subnets = this.subnets.sort((a, b) => b.numHosts - a.numHosts);
      this.subnets[0].ipAddress = this.ipAddress;

      for (var i = 0; i < this.subnets.length; i++) {
        var hostNum = this.subnets[0].numHosts;

        this.check(this.ipAddress, hostNum, 0);
        console.log("i: ", i);
        if (i > 0) {
          var broadcastArr = this.subnets[i - 1].broadcast.split(".");
          var checkNumEndBroadcast = parseInt(broadcastArr[3]);


          if (checkNumEndBroadcast == 255) {

            broadcastArr[3] = 0;
            broadcastArr[2] = parseInt(broadcastArr[2]) + 1;
          } else {
            var endBroadcast = (parseInt(broadcastArr[3]) + 1).toString();
            broadcastArr[3] = endBroadcast;
          }

          var firstIp = broadcastArr.join(".");

          this.subnets[i].ipAddress = firstIp;
          this.check(firstIp, this.subnets[i].numHosts, i);
        }

        // console.log("for",this.subnets[i].numHosts, " i: ",i)
      }

      console.log("Cusj in submit", subnets.value);
    },

    check(ip, hostNum, index) {
      const mathIpi = new mathIp();

      var suffix = mathIpi.findSuffix(hostNum);
      if (mathIpi.checkIp(ip)) {
        // mathIp.findBroadcast(27,ip)
        this.subnets[index].suffix = suffix;
        const mathIpi2 = new mathIp();
        this.subnets[index].broadcast = mathIpi2
          .findBroadcast(suffix, ip)
          // .findBroadcast(parseInt(hostNum) + 2, ip)
          .join(".");
        this.subnets[index].wildcard = mathIpi2.findWildCard(
          mathIpi2.findNetzMaskeInAList(suffix)
          // mathIpi2.findNetzMaskeInAList(parseInt(hostNum) + 2)
        );
        const netzmask = mathIpi.findNetzMaskeInAList(suffix);
        // const netzmask = mathIpi.findNetzMaskeInAList(parseInt(hostNum) + 2);

        this.subnets[index].netzmask = netzmask.join(".");
        if (this.notShow_dialog != true) {
          this.result_dialog = true;
        }
        // console.log("subnets ", subnets.value)
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
