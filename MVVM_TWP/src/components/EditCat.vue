<template>
  <div id="bg">
    <div class="edit">
      <input type="text" placeholder="Nouveau nom" v-model="formEditCat.name" />
      <button class="custom-btn btn-7" v-on:click="ModifyCat()">EDIT</button>
    </div>
  </div>
</template>

<script>
import WPapi from "@/api/WPapi.js";

export default {
  props: ["cat"],
  data() {
    return {
      formEditCat: {
        name: "",
      },
    };
  },

  methods: {
    ModifyCat() {
      WPapi.editCat(this.cat, this.formEditCat).then(
        function (response) {
          window.location.reload();
        }.bind(this)
      );
      this.$toast.info(`Edit cat title success`);
    },
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
};
</script>

<style scoped>
input {
  margin: auto;
  border-style: none;
}

.edit {
  font-weight: bold;
  text-align: center;
}
</style>
