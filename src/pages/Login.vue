<template>
  <div class="main">
    <section class="sign-in">
      <div class="container">
        <div class="signin-content">
          <div class="signin-image">
            <figure>
              <img src="@/assets/images/signup-image.jpg" alt="sing up image" />
            </figure>
            <a href="#" class="signup-image-link">Create an account</a>
          </div>

          <div class="signin-form">
            <h2 class="form-title">Login</h2>
            <div method="POST" class="register-form" id="login-form">
              <div class="form-group">
                <label for="your_name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  type="text"
                  name="your_name"
                  v-model="nik"
                  id="your_name"
                  placeholder="Your NIK"
                />
              </div>
              <div class="form-group">
                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="your_pass"
                  v-model="password"
                  id="your_pass"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <input type="checkbox"
                  @click="showPass()"
                  >Tampilan password
              </div>
              <div class="form-group form-button">
                <div
                  name="signin"
                  id="signin"
                  class="form-submit"
                  value="Log in"
                  @click="login()"
                >
                  Login
                </div>
              </div>
            </div>
            <!-- <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> -->
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
      password: "",
      showpass:false,
    };
  },
  created() {
    if (localStorage.getItem("login")) {
      this.$router.push("/admin/overview");
    }
  },
  methods:{
    login(){
      let data = new FormData();
      data.append("nik", this.nik);
      data.append("password", this.password);
      data.append("level", '1');
      axios.post(`${BASE_URL}/api/login`, data )
        .then(async (res) => {
      localStorage.setItem('login', JSON.stringify(res.data));
      this.$router.push("/admin/overview");
        })
        .catch((e) => {
         alert('data user yang anda pakai salah')
        });
    },
    showPass(){
      var x = document.getElementById("your_pass");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }
  }
};
</script>
