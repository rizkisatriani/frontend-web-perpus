<template>
  <div class="content">
    <button
    v-if="peminjam.nama&&paramsBukuDipinjam.data.length>1"
      class="btn btn-fill btn-primary btn-sm lg-6 mr-1 float-right"
      size="mini"
      @click.stop="simpan()"
    >
      Simpan
    </button>
    <div v-if="!peminjam.nama" class="container-fluid">
      Data Anggota
      <div class="justify-content-center row">
        <div class="col-md-12">
          <vue-table-dynamic :params="params">
            <template v-slot:column-5="{ props }">
              <span class="cell--slot-2 d-flex">
                <button
                  v-if="!peminjam.nama"
                  class="btn btn-fill btn-success btn-xs lg-6 mr-1"
                  size="mini"
                  @click.stop="addPeminjam(props)"
                >
                  Pilih
                </button>
              </span>
            </template>
          </vue-table-dynamic>
        </div>
      </div>
    </div>
    <div v-if="peminjam.nama" class="container-fluid">
      Data Buku
      <div class="justify-content-center row">
        <div class="col-md-12">
          <vue-table-dynamic :params="paramsBuku">
            <template v-slot:column-7="{ props }">
              <span class="cell--slot-2 d-flex">
                <button
                  class="btn btn-fill btn-primary btn-xs lg-6 mr-1"
                  size="mini"
                  @click.stop="addBuku(props)"
                >
                  Tambah
                </button>
              </span>
            </template>
            <template v-slot:column-6="{ props }">
              <span class="cell--slot-2">
                <img
                  style="height: 20px"
                  :src="url + '/' + props.rowData[6].data"
                  alt=""
                />
              </span>
            </template>
          </vue-table-dynamic>
        </div>
      </div>
    </div>
    <hr />
    <div v-if="peminjam.nama" class="container-fluid">
      <div class="justify-content-center row">
        <div class="col-md-12 d-flex justify-content-between">
          Peminjam
          <button
            class="btn btn-fill btn-danger btn-xs lg-6"
            size="mini"
            @click.stop="cancelPinjam(props)"
          >
            Cancel
          </button>
        </div>
        <div class="col-md-12">Nama : {{ peminjam.nama }}</div>
        <div class="col-md-12">Nik : {{ peminjam.nik }}</div>
        <div class="col-md-12">Email : {{ peminjam.email }}</div>
      </div>
    </div>
    <div v-if="peminjam.nama" class="container-fluid">
      Data Buku Di Pinjam
      <div class="justify-content-center row">
        <div class="col-md-12">
          <vue-table-dynamic :params="paramsBukuDipinjam">
            <template v-slot:column-7="{ props }">
              <span class="cell--slot-2 d-flex">
                <button
                  class="btn btn-fill btn-danger btn-xs lg-6"
                  size="mini"
                  @click.stop="Delete(props)"
                >
                  Delete
                </button>
              </span>
            </template>
            <template v-slot:column-6="{ props }">
              <span class="cell--slot-2">
                <img
                  style="height: 20px"
                  :src="url + '/' + props.rowData[6].data"
                  alt=""
                />
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
      peminjam: {},
      url: BASE_URL,
      isModalVisible: false,
      dataModal: {},
      params: {
        header: "row",
        data: [["No", `name`, `email`, `no_hp`, `nik`, `Action`]],
        border: true,
        enableSearch: true,
        sort: [0, 1],
        stripe: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
        columnWidth: [
          { column: 0, width: "5%" },
          { column: 1, width: "25%" },
          { column: 2, width: "20%" },
          { column: 3, width: "20%" },
          { column: 4, width: "20%" },
          { column: 5, width: "7%" },
        ],
        height: 250,
        rowHeight: 30,
      },
      paramsBuku: {
        header: "row",
        data: [
          [
            "No",
            `Judul`,
            `Nama Pengarang`,
            `Penerbit`,
            `Stock`,
            `Tahun Terbit`,
            `Cover Buku`,
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
          { column: 0, width: "10%" },
          { column: 1, width: "20%" },
          { column: 2, width: "20%" },
          { column: 3, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
        ],
        height: 250,
        rowHeight: 30,

        /*,
                        fixed: 0 */
      },
      paramsBukuDipinjam: {
        header: "row",
        data: [
          [
            "No",
            `Judul`,
            `Nama Pengarang`,
            `Penerbit`,
            `Stock`,
            `Tahun Terbit`,
            `Cover Buku`,
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
          { column: 0, width: "10%" },
          { column: 1, width: "20%" },
          { column: 2, width: "20%" },
          { column: 3, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
          { column: 4, width: "10%" },
        ],
        height: 250,
        rowHeight: 30,
      },
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.getData();
    this.getDataBuku();
  },
  methods: {
    closeModal() {
      this.getData();
      this.isModalVisible = false;
    },
    getData() {
      axios({
        method: "get",
        url: `${BASE_URL}/api/getAnggota`,
      })
        .then(async (res) => {
          this.params.data = [];
          this.params.data.push([
            "No",
            `name`,
            `email`,
            `no_hp`,
            `nik`,
            `Action`,
          ]);
          for (let i = 0; i < res.data.data.length; i++) {
            this.params.data.push([
              i + 1,
              `${res.data.data[i].name}`,
              `${res.data.data[i].email}`,
              `${res.data.data[i].no_hp}`,
              `${res.data.data[i].nik}`,
              `${res.data.data[i].id}`,
            ]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDataBuku() {
      axios({
        method: "get",
        url: `${BASE_URL}/api/getBuku`,
      })
        .then(async (res) => {
          this.paramsBuku.data = [];
          this.paramsBuku.data.push([
            "No",
            `Judul`,
            `Nama Pengarang`,
            `Penerbit`,
            `Stock`,
            `Tahun Terbit`,
            `Cover Buku`,
            `Action`,
          ]);
          for (let i = 0; i < res.data.data.length; i++) {
            this.paramsBuku.data.push([
              i + 1,
              `${res.data.data[i].judul}`,
              `${res.data.data[i].nama_pengarang}`,
              `${res.data.data[i].penerbit}`,
              `${res.data.data[i].stock}`,
              `${res.data.data[i].tahun_terbit}`,
              `${res.data.data[i].cover_buku}`,
              `${res.data.data[i].id}`,
            ]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Edit(slotData) {
      this.dataModal = {
        type: "edit",
        id: slotData.rowData[5].data,
        name: slotData.rowData[1].data,
        email: slotData.rowData[2].data,
        no_hp: slotData.rowData[3].data,
        nik: slotData.rowData[4].data,
      };

      this.isModalVisible = true;
    },
    addPeminjam(slotData) {
      this.peminjam = {
        nama: slotData.rowData[1].data,
        email: slotData.rowData[2].data,
        nik: slotData.rowData[4].data,
        id: slotData.rowData[5].data,
      };
    },
    addBuku(slotData) {
      this.paramsBukuDipinjam.data.push([
        this.paramsBukuDipinjam.data.length,
        `${slotData.rowData[1].data}`,
        `${slotData.rowData[2].data}`,
        `${slotData.rowData[3].data}`,
        `${slotData.rowData[4].data}`,
        `${slotData.rowData[5].data}`,
        `${slotData.rowData[6].data}`,
        `${slotData.rowData[7].data}`,
      ]);
      let index = this.paramsBuku.data.findIndex((data) => {
        return data[7] === slotData.rowData[7].data;
      });
      this.paramsBuku.data.splice(index, 1);
    },
    Delete(slotData) {
      let index = this.paramsBukuDipinjam.data.findIndex((data) => {
        return data[7] === slotData.rowData[7].data;
      });
      this.paramsBukuDipinjam.data.splice(index, 1);
      this.paramsBuku.data.push([
        this.paramsBuku.data.length,
        `${slotData.rowData[1].data}`,
        `${slotData.rowData[2].data}`,
        `${slotData.rowData[3].data}`,
        `${slotData.rowData[4].data}`,
        `${slotData.rowData[5].data}`,
        `${slotData.rowData[6].data}`,
        `${slotData.rowData[7].data}`,
      ]);
    },
    cancelPinjam() {
      this.peminjam = {};
    },
    simpan() {
      let rawDataBuku=this.paramsBukuDipinjam.data;
      rawDataBuku.splice(0,1);
      const data_buku = JSON.stringify(rawDataBuku.map((data)=>{
        return {id:data[7]}
      }));
      const peminjam = JSON.parse(localStorage.getItem("login"));
      const user_id = this.peminjam.id;
    const URL = `${BASE_URL}/api/simpanPeminjaman`;
      let data = new FormData();
      data.append("data_buku", data_buku);
      data.append("peminjam", peminjam.data.id);
      data.append("user_id", user_id);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
      this.$router.push('Peminjaman')
      });
    },
  },
};
</script>
