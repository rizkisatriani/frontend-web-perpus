<script>
import axios from "axios";
export default {
  name: "Modal",
  data() {
    return {
      name: "",
      email: "",
      no_hp: "",
      nik: "",
      level: ""
    };
  },
  props: {
    data: {
      type: Object,
      description: "Card title",
    },
  },
  methods: {
    close() {
      this.$emit("close");
      this.name= "";
      this.email= "";
      this.no_hp= "";
      this.nik= "";
    },
    uploadImage(event) {
      this.file = event.target.files[0];
    },
    add() {
      if (this.data.type === "edit") {
        this.edit();
        return false;
      }
      const URL = "http://192.168.43.219:443/api/addAnggota";
      let data = new FormData();
      data.append("name", this.name);
      data.append("email", this.email);
      data.append("no_hp", this.no_hp);
      data.append("nik", this.nik);
      data.append("level", this.level);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
      this.name= "";
      this.email= "";
      this.no_hp= "";
      this.nik= "";
        this.$emit("close");
      });
    },
    edit() {
      const URL = "http://192.168.43.219:443/api/editAnggota";
      let data = new FormData();
      data.append("name", this.name);
      data.append("email", this.email);
      data.append("no_hp", this.no_hp);
      data.append("nik", this.nik);
      data.append("id", this.data.id);
      data.append("level", this.level);
      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };
      axios.post(URL, data, config).then((response) => {
      this.name= "";
      this.email= "";
      this.no_hp= "";
      this.nik= "";
        this.$emit("close");
      });
    },
  },
  created() {
    if (this.data.type === "edit") {
      this.name = this.data.name;
      this.email = this.data.email;
      this.no_hp = this.data.no_hp;
      this.nik = this.data.nik;
      this.level = this.data.level=='anggota'?'1':'2';
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
          <slot name="header"> Anggota </slot>
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
                >Nama</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  id="nama"
                  placeholder="Silahkan tulis Nama"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Email</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="email"
                  id="nama"
                  placeholder="Silahkan tulis Email"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >No Hp</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="no_hp"
                  id="nama"
                  placeholder="Silahkan tulis No Hp"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Nik</label
              >
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control"
                  v-model="nik"
                  id="nama"
                  placeholder="Silahkan tulis Nik"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Jabatan</label
              >
              <div class="col-sm-9">
              <select
                  class="form-control"
                  v-model="level">
                <option disabled value="">Silahkan Piliha salah satu</option>
                <option value="1">Anggota</option>
                <option value="2">Admin</option>
              </select>
              </div>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
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
  height: 500px;
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
