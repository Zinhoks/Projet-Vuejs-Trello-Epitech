<template>
  <div>
    <div id="back">
      <div class="post">
        <span
          ><button id="btn" class="custom-btn btn-6" @click="closeTask">
            <span class="material-symbols-outlined"> undo </span>
          </button>
          <button id="close" @click="supprTask(pos)" class="custom-btn btn-1">
            DELET
          </button>
          <button
            id="close"
            @click="showEditTaskForm(pos)"
            class="custom-btn btn-6"
          >
            <span v-if="showedit">Close Update</span>
            <span v-else>Update Task</span>
          </button></span
        >
        <div>
          <p class="title">
            <strong>{{ title }}</strong>
          </p>
          // eslint-disable-next-line prettier/prettier
          <p class="description">{{ description.replace('</p>', '').replace('<p>', '') }}</p>
        </div>

        <EditTask
          v-if="showedit"
          :idedit="idedit"
          :r_title="title"
          :r_content="description.replace('</p>', '').replace('<p>', '')"
        />

        <div id="com-space"></div>
        <p>Comment :</p>
        <div>
          <span

            ><input placeholder="New Comment" class="inputcomment" type="text" v-model="formc.content" />
            <button id="addcomment" @click="createComment()"  class="custom-btn btn-3">
              <span class="material-symbols-outlined">
add_comment
</span></button>
</span>


          <span v-if="showeditC"
            ><input placeholder="Edit Comment" class="inputcomment" type="text" v-model="formedit.content" /><button
              @click="submiteditC(idcomment)"
              class="custom-btn btn-2" id="confirm"
            >
            <span class="material-symbols-outlined">
check
</span>
            </button></span
          >

          <div id="com" v-for="com in coms" v-bind:key="com.id">
            <button id="supprcomment" class="custom-btn btn-1" @click="supprComment(com.id)"><span class="material-symbols-outlined">
delete
</span></button> |
            <button id="editcomment" class="custom-btn btn-6" @click="editC(com.id)"><span class="material-symbols-outlined">
edit
</span></button>
            <p><span class="material-symbols-outlined">
person
</span>
{{ com.author_name }}
</p>
            

            <!-- V-html pour enlever les balises <p> sur le display -->
              <p v-html="com.content.rendered"></p>
              
            </div>

            <span v-if="showeditC"
              ><input type="text" v-model="formedit.content" /><button
                @click="submiteditC(idc)"
                class="custom-btn btn-6"
                id="confirm"
              >
                <span class="material-symbols-outlined"> check </span>
              </button></span
            >

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WPapi from "@/api/WPapi.js";
import EditTask from "@/components/EditTask.vue";

export default {
  components: {
    EditTask,
  },
  props: ["pos"],
  data() {
    return {
      description: "",
      title: "Loading ...",
      idedit: "",
      showedit: false,
      showeditC: false,
      idcomment: "",
      coms: [],
      formc: {
        content: "",
      },
      formedit: {
        content: "",
      },
    };
  },
  mounted() {
    WPapi.getPostSolo(this.pos)
      .then((response) => {
        this.title = response.data.title.rendered;
        this.description = response.data.content.rendered;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      }),
      WPapi.getAllComments(this.pos)
        .then((response) => {
          this.coms = response.data;
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
  },
  methods: {
    supprTask(id) {
      WPapi.deleteTask(id).then(
        function (response) {
          window.location.reload();
          console.log(response);
        }.bind(this)
      );
      this.$toast.success(`Task successfully deleted`);
    },
    closeTask() {
      this.$emit("closeTask");
    },
    showEditTaskForm(id) {
      if (this.showedit === true) {
        this.showedit = false;
      } else {
        this.showedit = true;
        this.idedit = id;
      }
    },
    createComment() {
      WPapi.postComment(this.pos, this.formc).then(
        function (response) {
          window.location.reload();
          console.log(response);
        }.bind(this)
      );
      this.$toast.success(`Comment posted !`);
    },
    supprComment(id) {
      WPapi.deleteComment(id).then(
        function (response) {
          window.location.reload();

          console.log(response);
        }.bind(this)
      );
      this.$toast.success(`Comment successfully deleted`);
    },
    editC(id) {
      this.showeditC = true;
      this.idcomment = id;
    },
    submiteditC(id) {
      WPapi.editComment(id, this.formedit).then(
        function (response) {
          window.location.reload();

          console.log(response);
        }.bind(this)
      );
      this.showeditC = false;
      this.idcomment = "";
      this.formedit = { content: "" };
      this.$toast.success(`Comment successfully edited`);

    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Allerta&display=swap");

#back {
  z-index: 2;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 0px);
  min-height: calc(100vh - 0px);
  /* background: rgba(0, 0, 0, 0.8); */
}

.inputcomment {
  width: 400px;
}

.title {
  padding-top: 20px;
  text-align: center;
  font-family: "Allerta", sans-serif;
  font-size: 40px;
}

#supprcomment {
  width: 45px;
  padding-top: 5px;
}

#editcomment {
  width: 45px;
}

#confirm {
  width: 45px;
}

#close {
  float: right;
}
.post {
  background: rgb(255, 255, 255);
  width: 70%;
  max-height: 900px;
  padding: 10px;
  margin: 10px 0;
  overflow-y: scroll;
}
#btn {
  margin: -5px 5px;
  margin-left: auto;
  width: 45px;
}
#addcomment {
  width: 45px;
}
#com-space {
  height: 1px;
  width: 100%;
  margin: auto;
  background-color: black;
  border-radius: 5px;
}
#com {
  background: rgb(184, 182, 182);
  margin: 0.9em;
  border-radius: 5px;
  color: white;
  padding: 30px;
}
#com a {
  color: red;
  cursor: pointer;
  /* text-decoration: underline; */
}

.btn-3 {
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
  padding: 5px;

}
.btn-3:after {
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
.btn-3:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-3:hover:after {
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
