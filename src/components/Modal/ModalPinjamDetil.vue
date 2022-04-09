<script>
import axios from "axios";
import { BASE_URL } from "src/globalVariable.js";
export default {
  name: "Modal",
  data() {
    return {
      id: "",
      denda: "",
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
    };
  },
  props: {
    data: {
      type: Object,
      description: "Card title",
    },
  },
  computed: {
    dendaCur() {
      var formatter = new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(this.denda);
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getDetil() {
      const URL = BASE_URL + "/api/getDetilPeminjaman?id=" + this.data.id;
      axios.get(URL).then((res) => {
        this.denda = res.data.denda;
        this.id = res.data.data[0].id;
        this.params.data = [];
        this.params.data.push([
          "No",
          `Judul`,
          `Nama Pengarang`,
          `Penerbit`,
          `Tahun Terbit`,
        ]);
        for (let i = 0; i < res.data.data.length; i++) {
          this.params.data.push([
            i + 1,
            `${res.data.data[i].judul}`,
            `${res.data.data[i].nama_pengarang}`,
            `${res.data.data[i].penerbit}`,
            `${res.data.data[i].tahun_terbit}`,
          ]);
        }
      });
    },
    kembalikan() {
      const admin=JSON.parse(localStorage.getItem("login"));
      const URL = BASE_URL + "/api/pengembalian";
      let data = new FormData();
      data.append("id", this.data.id);
      data.append("admin", admin.data.id);
      data.append("denda", this.denda);
      axios.post(URL, data ).then((response) => {
        this.$emit("close");
      });
    },
  },
  created() {
    this.getDetil();
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> Data buku yang dipinjam </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <h2>Denda : {{ dendaCur }}</h2>
            <vue-table-dynamic :params="params">
            </vue-table-dynamic>
          </slot>
        </section>

        <footer class="modal-footer">
          <button type="button"
          @click="kembalikan()"
          class="btn-green" aria-label="Close modal">
            Kembalikan
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  height: 600px;
  width: 50%;
  margin: auto;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
