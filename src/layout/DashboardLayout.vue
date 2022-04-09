<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link> -->
      <sidebar-link to="/admin/Buku">
        <i class="nc-icon nc-notes"></i>
        <p>Buku</p>
      </sidebar-link>
      <sidebar-link to="/admin/Anggota">
        <i class="nc-icon nc-circle-09"></i>
        <p>Anggota</p>
      </sidebar-link>
      <sidebar-link to="/admin/Peminjaman">
        <i class="nc-icon nc-cart-simple"></i>
        <p>Pinjaman</p>
      </sidebar-link>
      <sidebar-link to="/admin/Pengembalian">
        <i class="nc-icon nc-time-alarm"></i>
        <p>Pengembalian</p>
      </sidebar-link>
      <sidebar-link to="/admin/Perpanjang">
        <i class="nc-icon nc-refresh-02"></i>
        <p>Perpanjang</p>
      </sidebar-link>

      <!-- <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
