<template>
  <div>
    <head> </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <img
          class="picture"
          width="200px"
          src="@/assets/ZFTrello.svg"
          href="#"
        />
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Sig in</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Login</a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="divtest">
        <div
          class="cat"
          v-for="categorie in categories"
          v-bind:key="categorie.id"
        >
          <span>
            <button
              class="custom-btn btn-6"
              @click="showEditCatForm(categorie.id)"
            >
              Update
            </button>
            <button
              id="btn"
              @click="supprCat(categorie.id)"
              class="custom-btn btn-1"
            >
              delete
            </button>
          </span>

          <h1 id="titlecat" class="text">
            <strong>{{ categorie.name }}</strong>
          </h1>

          <!--Contenu des posts -->

          <div id="posts" class="posts">
            <PostsComponent :cat="categorie.id" />
          </div>
        </div>

        <div class="cat">
          <label><strong></strong></label>
          <input
            type="text"
            v-model="formCreateCat.name"
            placeholder="Add new category"
          />
          <button id="btnaddnewcat" class="custom-btn btn-2" v-on:click="createCat()"><span id="newcat" class="material-symbols-outlined">
playlist_add
</span>
</button>
        </div>
      </div>
    </body>
  </div>
  <div><Editform v-if="Editform" :cat="cat" /></div>
</template>

<script>
import WPapi from "@/api/WPapi.js";
import PostsComponent from "@/components/PostsComponent.vue";
import Editform from "@/components/EditCat.vue";

export default {
  components: {
    PostsComponent,
    Editform,
  },
  props: [],
  data() {
    return {
      Editform: false,
      categories: [],
      cat: "" /*Id catégorie*/,
      // test: "",
      formCreateCat: {
        name: "",
      },
    };
  },
  mounted() {
    WPapi.getCat()
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    // async createCat() {
    // await WPapi.postCat(this.formCreateCat).then.bind(this);
    // await WPapi.postCat(this.formCreateCat)
    //   .then((res) => {
    //     window.location.reload(), console.log(res);
    //   })
    //   .bind(this);
    // this.$toast.success(
    //   `Success ! New category created.`,
    //   this.$toast.TIME_LONG
    // );
    // },

    createCat() {
      WPapi.postCat(this.formCreateCat).then(
        function (response) {
          window.location.reload();
          this.$toast.success(`New cat Added`);
        }.bind(this)
      );
      // this.$router.push("/");
      // this.$router.go();
    },
    supprCat(id) {
      WPapi.deleteCat(id).then(
        function (response) {
          this.$toast.error(`Category successfully deleted`);
          window.location.reload();
        }.bind(this)
      );
      this.$toast.success(`Category succesfully deleted`);

    },
    showEditCatForm(id) {
      if (this.Editform === true) {
        this.Editform = false;
      } else {
        this.Editform = true;
        this.cat = id;
      }
    },
  },
};
</script>

<style>
/* IMPORT POLICE  */
@import url("https://fonts.googleapis.com/css2?family=Allerta&display=swap");
body {
  background-attachment: fixed;
  background-color: #34463d;
  background-image: url(https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
}

.picture {
  text-align: center;
  margin: auto;
}

#divtest {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.cat {
  flex-direction: column;

  /* background: #eeeee9 ; */
  background: rgb(0, 0, 0, 0.15);
 

  border-radius: 12px;
  /* box-shadow: 2px 2px 2px #EEEEE9; */

  width: 300px;
  text-align: left;
  margin: 1mm 1mm;
  padding: 2mm;
  overflow-wrap: break-word;
}
input {
  width: 150px;
  height: 32px;
}
#titlecat {
  text-align: center;
  font-size: 30px;
  font-family: "Allerta", sans-serif;
  text-decoration: underline;
  /* background: rgb(255, 255, 255); */
  text-align: center;
}

/* CUSTOM BUTTON */
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

/* BUTTON DELET  */
.btn-1 {
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  background: rgb(165, 68, 57);
  background: linear-gradient(
    0deg,
    rgb(255, 0, 0) 0%,
    rgba(251, 75, 2, 1) 100%
  );
}
.btn-1:hover {
  color: #f0094a;
  background: transparent;
  box-shadow: none;
}
.btn-1:before,
.btn-1:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #f0094a;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}
.btn-1:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.btn-1:hover:before,
.btn-1:hover:after {
  width: 100%;
  transition: 800ms ease all;
}

/* BUTTON UPDATE */

.btn-6 {
  /* background: rgb(247, 150, 192); */
  /* background: radial-gradient(
    circle,
    rgba(247, 150, 192, 1) 0%,
    rgba(118, 174, 241, 1) 100%
  ); */
  background: #1bbff1;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-6 span {
  position: relative;
  display: block;
  width: 100%;
  height: 70%;
}
.btn-6:before,
.btn-6:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-6:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-6:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-6:hover {
  background: transparent;
  color: #76aef1;
  box-shadow: none;
}
.btn-6:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6 span:before,
.btn-6 span:after {
  position: absolute;
  content: "";
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-6 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-6 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-6 span:hover:before {
  width: 100%;
}
.btn-6 span:hover:after {
  width: 100%;
}

/* CUSTOM BUTTON ADD CATEGORIES */

#btnaddnewcat{
  width: 45px;
  margin: -5px 5px;
  /* margin-left: 10px; */
}

#newcat{
  margin-left: -7px;
}


.btn-8 {
  z-index: 0;
  background: rgb(247, 150, 192);
  background: radial-gradient(
    circle,
    rgba(247, 150, 192, 1) 0%,
    rgba(118, 174, 241, 1) 100%
  );
  line-height: 42px;
  padding: px;
  border: none;
}
.btn-8 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-8:before,
.btn-8:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-8:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-8:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-8:hover {
  background: transparent;
  color: #76aef1;
  box-shadow: none;
}
.btn-8:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-8:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-8 span:before,
.btn-8 span:after {
  position: absolute;
  content: "";
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-8 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-8 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-8 span:hover:before {
  width: 100%;
}
.btn-8 span:hover:after {
  width: 100%;
}

.btn-8 {
  z-index: 0;
  background: rgb(247, 150, 192);
  background: radial-gradient(
    circle,
    rgba(247, 150, 192, 1) 0%,
    rgba(118, 174, 241, 1) 100%
  );
  line-height: 42px;
  padding: 7px;
  border: none;
}
.btn-8 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-8:before,
.btn-8:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-8:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-8:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-8:hover {
  background: transparent;
  color: #76aef1;
  box-shadow: none;
}
.btn-8:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-8:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-8 span:before,
.btn-8 span:after {
  position: absolute;
  content: "";
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
    -4px -4px 5px 0px rgba(255, 255, 255, 1),
    7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.btn-8 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-8 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: 0.5px;
  transition: all 500ms ease;
}
.btn-8 span:hover:before {
  width: 100%;
}
.btn-8 span:hover:after {
  width: 100%;
}


.btn-2 {
  background: rgb(22, 9, 240);
  background: linear-gradient(
    0deg,
    rgba(22, 9, 240, 1) 0%,
    rgba(49, 110, 244, 1) 100%
  );
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  /* padding: 5px; */

}
.btn-2:after {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  -webkit-transform: scale(0.1);
  transform: scale(0.1);
}
.btn-2:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-2:hover:after {
  background: rgb(0, 3, 255);
  background: linear-gradient(
    0deg,
    rgba(2, 126, 251, 1) 0%,
    rgba(0, 3, 255, 1) 100%
  );
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
