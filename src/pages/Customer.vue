<template>
  <q-page>
    <div class="flex justify-center">
      <q-card style="width:60%">
        <q-card-section>
          <div class="flex justify-center text-h5">Information</div>
        </q-card-section>
        <q-card-actions>
          <div  style="width:100%">
            <div>
              <q-input  label="Anzahl der Clients"></q-input>

            </div>
            <div class="row">
            <q-input label="Name" class="col-4"></q-input>
              <div class="col-2"></div>
              <q-input label=" Anzahl der Hosts" class="col-6"></q-input>
            </div>

            <q-btn type="submit" icon-right="cloud_upload" color="positive" label="Submit" dense class=" q-mt-lg float-right" ></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
