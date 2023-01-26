<template>
  <div>
    <div id="edit">
      <div id="com-space"></div>
      <div>
        <button class="custom-btn btn-6" v-on:click="ModifyTask()">
          Update task
        </button>
      </div>
      <label id="title">Title</label>
      <input class="title" type="text" v-model="formEditTask.title" />
      <div>
        <label>Description</label>
        <input class="content" type="textarea" v-model="formEditTask.content" />
      </div>
      <div>
        <label>Categories</label>
        <select v-model="formEditTask.categories">
          <option
            v-bind:value="categorie.id"
            v-for="categorie in categories"
            v-bind:key="categorie.id"
          >
            {{ categorie.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import WPapi from "@/api/WPapi.js";

export default {
  props: ["idedit", "r_title", "r_content"],
  data() {
    return {
      categories: [],
      formEditTask: {
        title: this.r_title,
        content: this.r_content,
        categories: "",
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
    ModifyTask() {
      WPapi.editTask(this.idedit, this.formEditTask).then(
        function (response) {
          window.location.reload();
          console.log(response);
        }.bind(this)
      );
      this.$toast.success(`Task succesfully edited`);
    },
  },
};
</script>

<style scoped>
#edit {
  /* font-weight: bold; */
  margin-bottom: 10px;
}

.title {
  width: 500px;
}

.content {
  width: 80%;
  height: 100px;
}

#edit label {
  width: 90px;
}
#com-space {
  height: 1px;
  width: 100%;
  margin: auto;
  margin-bottom: 0.5em;
  background-color: rgb(116, 42, 212);
  border-radius: 5px;
}
</style>
