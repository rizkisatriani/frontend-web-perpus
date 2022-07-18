<template>
  <div class="main">
    <!-- Sign up form -->
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Register</h2>
            <form method="POST" class="register-form" id="register-form">
              <div class="form-group">
                <label for="name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  v-model="nik"
                  type="text"
                  name="nik"
                  id="nik"
                  placeholder="NIK pengguna"
                />
              </div>
              <div class="form-group">
                <label for="name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  v-model="nama"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nama pengguna"
                />
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email pengguna"
                />
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  v-model="no_hp"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="No.Hp pengguna"
                />
              </div>
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  v-model="password"
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Password"
                />
              </div>
              <!-- <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div> -->
              <div class="form-group form-button">
                <input
                  name="signup"
                  id="signup"
                  class="form-submit"
                  value="Register"
                  @click="register()"
                />
              </div>
            </form>
          </div>
          <div class="signup-image">
            <figure>
              <img src="@/assets/images/signup-image.jpg" alt="sing up image" />
            </figure>
            <router-link to="/login" class="signup-image-link"
              >Sudah punya akun</router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { BASE_URL } from "src/globalVariable.js";
import axios from "axios";
export default {
  data() {
    return {
      nik: "",
      email: "",
      nama: "",
      no_hp: "",
      password: "",
      showpass: false,
    };
  },
  created() {
    if (localStorage.getItem("login")) {
      this.$router.push("/admin/overview");
    }
  },
  methods: {
    register() {
      axios({
        method: "post",
        url: BASE_URL + "/api/register",
        data: {
          nik: this.nik,
          password: this.password,
          name: this.nama,
          email: this.email,
          no_hp: this.no_hp,
          level: 1,
        },
      })
        .then(async (res) => {
          console.log(res.data);
           alert(
            "Proses registrasi telah dikirim tunggu hingga konfirmasi admin."
          );
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e);
          alert("Informasi", "Nik yang anda masukan sudah terdaftar.");
        });
    },
  },
};
</script>
