import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import Buku from 'src/pages/Buku.vue'
import Login from 'src/pages/Login.vue'
import Anggota from 'src/pages/Anggota.vue'
import Peminjaman from 'src/pages/Peminjaman.vue'
import Perpanjang from 'src/pages/Perpanjang.vue'
import Pengembalian from 'src/pages/Pengembalian.vue'
import BuatPeminjaman from 'src/pages/BuatPeminjaman.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/login'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'login',
        component: Login,
        redirect: '/login'
      },
      {
        path: 'Buku',
        name: 'Buku',
        component: Buku
      },
      {
        path: 'Anggota',
        name: 'Anggota',
        component: Anggota
      },
      {
        path: 'Pengembalian',
        name: 'Pengembalian',
        component: Pengembalian
      },
      {
        path: 'Perpanjang',
        name: 'Perpanjang',
        component: Perpanjang
      },
      {
        path: 'Peminjaman',
        name: 'Peminjaman',
        component: Peminjaman
      },
      {
        path: 'BuatPeminjaman',
        name: 'BuatPeminjaman',
        component: BuatPeminjaman
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      // {
      //   path: 'maps',
      //   name: 'Maps',
      //   component: Maps
      // },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
