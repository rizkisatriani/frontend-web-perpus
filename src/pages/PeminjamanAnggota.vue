<template>
  <div class="content">
    <div class="container-fluid">
      <router-link
        v-if="user.level===2"
        class="btn btn-fill btn-sm btn-primary"
        to="/admin/BuatPeminjaman"
      >
        Buat Peminjaman
      </router-link>
      <router-link
      v-if="user.level===1"
        class="btn btn-fill btn-sm btn-primary"
        to="/admin/BuatPeminjamanAnggota"
      >
        Buat Peminjaman Anggota
      </router-link>
      <div class="justify-content-center row">
        <div class="col-md-12">
          <vue-table-dynamic :params="params">
            <template v-slot:column-8="{ props }">
              <span class="cell--slot-2 d-flex">
                <button
                :class="[classStatus(props.rowData[8].data)]"
                  class="btn btn-fill btn-xs lg-6"
                  size="mini"
                >
                  {{textStatus(props.rowData[8].data)}}
                </button>
              </span>
            </template>
          </vue-table-dynamic>
        </div>
      </div>
    </div>
    <Modal v-if="isModalVisible" :data="dataModal" @close="closeModal" />
  </div>
</template>
<script>
import axios from "axios";
import Modal from "src/components/Modal/ModalAnggota.vue";
import { BASE_URL } from "src/globalVariable.js";
export default {
  data() {
    return {
      url: BASE_URL,
      isModalVisible: false,
      dataModal: {},
      params: {
        header: "row",
        data: [
          [
            "No",
            `name`,
            `email`,
            `no_hp`,
            `nik`,
            `Action`,
          ],
        ],
        border: true,
        enableSearch: true,
        sort: [0, 1],
        stripe: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
        columnWidth: [
          { column: 0, width: "5%" },
          { column: 1, width: "20%" },
          { column: 2, width: "10%" },
          { column: 3, width: "10%" },
          { column: 4, width: "20%" },
          { column: 6, width: "10%" },
        ],
        height: 500,
        rowHeight: 50,

        /*,
                        fixed: 0 */
      },
    };
  },
  components: {
    Modal,
  },
    computed:{
      user(){
      const admin=JSON.parse(localStorage.getItem("login"));
        return admin.data;
      }
    },
  mounted() {
    this.getData();
  },
  methods: {
    classStatus(status){
      switch (status) {
        case "0":
        return 'btn-danger';
          break;
        case "1":
       return 'btn-info';
          break;
        case "2":
        return 'btn-success';
          break;
        default:
        return 'btn-warning';
          break;
      }
    },
    textStatus(status){
      switch (status) {
        case "0":
        return 'Pending';
          break;
        case "1":
        return 'Sudah di acc';
          break;
        case "2":
        return 'Sudah di acc dan di perpajang';
          break;
        default:
        return 'Sudah di kembalikan';
          break;
      }
    },
    closeModal() {
      this.getData();
      this.isModalVisible = false;
    },
    getData() {
      axios({
        method: "get",
        url: `${BASE_URL}/api/getPeminjaman?id=${this.user.id}`,
      })
        .then(async (res) => {
          this.params.data = [];
          this.params.data.push([
            "No",
            `Nama Peminjam`,
            `Nik Peminjam`,
            `No Hp Peminjam`,
            `Nama Admin`,
            `Nik Admin`,
            `Tanggal Pinjam`,
            `No Peminjaman`,
            `Status`,
          ]);
          for (let i = 0; i < res.data.data.length; i++) {
           let statusPeminjaman=0;
           if(res.data.data[i].peminjaman!=='-'){
            statusPeminjaman=1;
           }else if(res.data.data[i].perpanjang!=='-'
           &&res.data.data[i].pengembalia==='-'){
            statusPeminjaman=2;
           }else if(res.data.data[i].perpanjang!=='-'
           &&res.data.data[i].pengembalia!=='-'){
            statusPeminjaman=3;
           }
            this.params.data.push([
              i + 1,
              `${res.data.data[i].name}`,
              `${res.data.data[i].nik}`,
              `${res.data.data[i].no_hp}`,
              `${res.data.data[i].peminjam_name}`,
              `${res.data.data[i].peminjam_nik}`,
              `${res.data.data[i].tanggal_pinjam}`,
              `${res.data.data[i].id}`,
              `${statusPeminjaman}`,
            ]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Acc(slotData) {
      if(slotData.rowData[8].data!=='-'){
        return false;
      }
      const peminjam = JSON.parse(localStorage.getItem("login"));
     const URL = `${BASE_URL}/api/AccPinjam`;
      let data = new FormData();
      data.append("peminjam", peminjam.data.id);
      data.append("id", slotData.rowData[7].data);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
      this.getData()
      });
    },
    Add() {
      this.dataModal = {
        type: "add",
      };

      this.isModalVisible = true;
    },
  },
};
</script>
