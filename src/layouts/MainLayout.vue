<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: burlywood;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
        Netzwerk App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >


    <q-item  clickable v-ripple to="/customer/0" >
            <q-item-section avatar>
              <q-icon name="book_online" />
            </q-item-section>

            <q-item-section > KUNDEN </q-item-section>
          </q-item>
          <q-item  clickable v-ripple to="/admin">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section > ADMIN </q-item-section>
          </q-item>



    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Customer',
    caption: 'quasar.dev',
    icon: 'school',
    to: '/customer'
  },





]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
