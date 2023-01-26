<template>
  <div class="drop-zone" id="notes">
    <article v-for="post in posts" v-bind:key="post.id">
      <div id="post" @click="openTask(post.id)">
        <p id="text" class="box">
          {{ post.title.rendered }}
        </p>
        <!-- <p id="text">{{ post.id }} : {{ post.title.rendered }}</p> -->
      </div>
    </article>

    <ShowPost v-if="showpost" @closeTask="closeTask" :pos="idpost" />

    <input
      id="create"
      type="text"

      v-model="formCreateTask.title"
      placeholder="Create task"
    />
    <button class="custom-btn btn-2" v-on:click="createTask()">Add task</button>
  </div>
</template>

<script>
import WPapi from "@/api/WPapi.js";
import ShowPost from "@/components/ShowPost.vue";

export default {
  props: ["cat"],
  components: {
    ShowPost,
  },
  data() {
    return {
      posts: [],
      showpost: false,
      idpost: "",
      formCreateTask: {
        title: "",
        status: "publish",
        categories: this.cat,
      },
    };
  },

  mounted() {
    WPapi.getAllPosts(this.cat)
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    createTask() {
      WPapi.postTask(this.formCreateTask).then(
        function (response) {
          window.location.reload();
          console.log(response);
        }.bind(this)
      );
      this.$toast.success(`New task created`);
    },
    openTask(id) {
      this.idpost = id;
      this.showpost = true;
    },
    closeTask() {
      this.pos = "";
      this.showpost = false;
      location.reload();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@556&display=swap");

#post {
  background: rgb(255, 255, 255);
  /* margin: 1em 0; */
  border-radius: 5px;
  text-align: center;
  /* box-shadow: 5px 5px 5px red; */
  font-family: "Dancing Script", cursive;
}
#create {
  border-radius: 5px;
  text-align: center;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  border: none;
}

.box {
  cursor: move;
}

#post :hover {
  cursor: pointer;
}

/* BUTTON ADD TASK */
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
