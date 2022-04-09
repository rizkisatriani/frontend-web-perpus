<script>
import axios from "axios";
export default {
  name: "Modal",
  data() {
    return {
      judul: "",
      nama_pengarang: "",
      penerbit: "",
      tahun_terbit: "",
      stock: "",
      file:null
    };
  },
  props: {
    data: {
      type: Object,
      description: "Card title",
    },
  },
  methods: {
    close(){
      this.$emit("close");
      this.judul="";
      this.nama_pengarang="";
      this.penerbit="";
      this.tahun_terbit="";
      this.stock="";
      this.cover="";
      document.getElementById("file-input").value = "";
    },
    uploadImage(event) {
      this.file=event.target.files[0];
    },
    add(){
      if(this.data.type==='edit'){
        this.edit();
        return false;
      }
    const URL = "http://192.168.43.219:443/api/addBuku";
      let data = new FormData();
      data.append("judul", this.judul);
      data.append("nama_pengarang", this.nama_pengarang);
      data.append("penerbit", this.penerbit);
      data.append("tahun_terbit", this.tahun_terbit);
      data.append("stock", this.stock);
      data.append("cover", this.file);
      axios.post(URL, data).then((response) => {
        console.log(response);
      this.judul="";
      this.nama_pengarang="";
      this.penerbit="";
      this.tahun_terbit="";
      this.stock="";
      this.cover="";
      document.getElementById("file-input").value = "";
      this.$emit("close");
      });
    },
    edit(){
    const URL = "http://192.168.43.219:443/api/editBuku";
      let data = new FormData();
      data.append("judul", this.judul);
      data.append("nama_pengarang", this.nama_pengarang);
      data.append("penerbit", this.penerbit);
      data.append("tahun_terbit", this.tahun_terbit);
      data.append("stock", this.stock);
      data.append("cover", this.file);
      data.append("id", this.data.id);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
      this.judul="";
      this.nama_pengarang="";
      this.penerbit="";
      this.tahun_terbit="";
      this.stock="";
      this.cover="";
      document.getElementById("file-input").value = "";
      this.$emit("close");
      });
    }
  },
  created() {
    if(this.data.type==='edit'){
      this.judul=this.data.judul;
      this.nama_pengarang= this.data.nama_pengarang;
      this.penerbit= this.data.penerbit;
      this.tahun_terbit= this.data.tahun_terbit;
      this.stock= this.data.stock;
    }
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
          <slot name="header"> Buku </slot>
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
                >Nama Pengarang</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="nama_pengarang"
                  id="nama"
                  placeholder="Silahkan tulis Nama Pengarang"
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
                  placeholder="Silahkan tulis nama Penerbit"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Stock</label
              >
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control"
                  v-model="stock"
                  id="nama"
                  placeholder="Silahkan tulis jumlah stock"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Tahun Terbit</label
              >
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control"
                  v-model="tahun_terbit"
                  id="nama"
                  placeholder="Silahkan tulis Tahun Terbit"
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Cover</label
              >
              <div class="col-sm-9">
                <input
                reff
                  type="file"
                  accept="image/*"
                  @change="uploadImage($event)"
                  id="file-input"
                />
              </div>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
          <button
            type="button"
            class="btn-green"
            @click="add"
            aria-label="Close modal"
          >
            Simpan
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
