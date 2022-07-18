<template>
  <div class="content">
    <div class="container-fluid">
      <div class="justify-content-center row">
        <div class="col-md-10">
          <div style="margin-bottom: 48px;font-size: 20px;font-weight: 600;">Request buku</div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Judul</label
            >
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="judul"
                id="nama"
                placeholder="Silahkan tulis Judul"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Nama pengarang</label
            >
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="nama_pengarang"
                id="nama"
                placeholder="Silahkan tulis Nama pengarang"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Penerbit</label
            >
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="penerbit"
                id="nama"
                placeholder="Silahkan tulis Penerbit"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Tahun terbit</label
            >
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="tahun_terbit"
                id="nama"
                placeholder="Silahkan tulis Tahun terbit"
              />
            </div>
          </div>
          <button type="button"
          @click="add()"
          class="btn-green float-lg-right" aria-label="Close modal">
            Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "src/globalVariable.js";
export default {
  data() {
    return {
      judul: "",
      nama_pengarang: "",
      penerbit: "",
      tahun_terbit: ""
    };
  },
  methods: {
    add() {
      const URL = BASE_URL+"/api/request";
      let data = new FormData();
      data.append("judul", this.judul);
      data.append("nama_pengarang", this.nama_pengarang);
      data.append("penerbit", this.penerbit);
      data.append("tahun_terbit", this.tahun_terbit);
      axios.post(URL, data ).then((response) => {
      this.judul= "";
      this.nama_pengarang= "";
      this.penerbit= "";
      this.tahun_terbit= "";
      });
    }
  }
}
</script>
,<style scoped>
.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
