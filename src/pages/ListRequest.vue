<template>
  <div class="content">
    <div class="container-fluid">
      <div class="justify-content-center row">
        <div class="col-md-12">
          <vue-table-dynamic :params="params">
            <template v-slot:column-5="{ props }">
              <span class="cell--slot-2 d-flex">
                <button
                  class="btn btn-fill btn-danger btn-xs lg-6"
                  size="mini"
                  @click.stop="Delate(props)"
                >
                  Delete
                </button>
              </span>
            </template>
          </vue-table-dynamic>
        </div>
      </div>
    </div>
    <ModalBuku v-if="isModalVisible" :data="dataModal" @close="closeModal" />
  </div>
</template>
<script>
import axios from "axios";
import ModalBuku from "src/components/Modal/ModalBuku.vue";
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
        height: 500,
        rowHeight: 100,

        /*,
                        fixed: 0 */
      },
    };
  },
  components: {
    ModalBuku,
  },
  mounted() {
    this.getData();
  },
  methods: {
    closeModal() {
      this.getData();
      this.isModalVisible = false;
    },
    getData() {
      axios({
        method: "get",
        url: `${BASE_URL}/api/getrequest`,
      })
        .then(async (res) => {
          this.params.data = [];
          this.params.data.push([
            "No",
            `Judul`,
            `Nama Pengarang`,
            `Penerbit`,
            `Tahun Terbit`,
            `Action`,
          ]);
          for (let i = 0; i < res.data.data.length; i++) {
            this.params.data.push([
              i + 1,
              `${res.data.data[i].judul}`,
              `${res.data.data[i].nama_pengarang}`,
              `${res.data.data[i].penerbit}`,
              `${res.data.data[i].tahun_terbit}`,
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
        id: slotData.rowData[7].data,
        judul: slotData.rowData[1].data,
        nama_pengarang: slotData.rowData[2].data,
        penerbit: slotData.rowData[3].data,
        tahun_terbit: slotData.rowData[4].data,
        stock: slotData.rowData[5].data,
      };

      this.isModalVisible = true;
    },
    Delate(slotData) {
      const URL = `${BASE_URL}/api/deleterequest`;
      let data = new FormData();
      data.append("id", slotData.rowData[5].data);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
        this.getData();
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
