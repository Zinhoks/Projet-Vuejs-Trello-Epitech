import axios from "axios";

const apiConnect = axios.create({
  baseURL: "http://localhost:8888/wordpress/index.php/wp-json/wp/v2",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  auth: {
    username: "francois",
    password: "AJmYR(%&YQ7U(u6yFf",
  },
});
export default {
  // GET
  // Affiche toutes les Catégories de l'api      nom précédent : getcategories
  getCat() {
    return apiConnect.get("/categories");
  },
  // Get tous les posts d'une catégorie         nom précédent : getposts
  getAllPosts(id) {
    return apiConnect.get(`/posts?categories=${id}`);
  },
  // Get un post par son ID       nom précédent : getpost
  getPostSolo(id) {
    return apiConnect.get(`/posts/${id}`);
  },
  // Get tous les commentaires d'un post       nom précédent : getcoms
  getAllComments(id) {
    return apiConnect.get(`/comments?post=${id}`);
  },

  // POST
  // Créer une catégorie      nom précédent : createCa
  postCat(form) {
    return apiConnect.post(`/categories`, form);
  },
  // Créer un post          nom précédent : createPo
  postTask(form) {
    return apiConnect.post(`/posts`, form);
  },
  // Créer un commentaire           nom précédent : comment
  postComment(id, form) {
    return apiConnect.post(`/comments?post=${id}`, form);
  },

  // UPDATE
  // Edit un post avec les infos du form          nom précédent : editPo
  editTask(id, form) {
    return apiConnect.put(`/posts/${id}`, form);
  },

  // Edit un commentaire          nom précédent : editCo
  editComment(id, form) {
    return apiConnect.put(`/comments/${id}`, form);
  },
  // Edit catégorie         nom : on garde le meme
  editCat(id, form) {
    return apiConnect.put(`/categories/${id}`, form);
  },

  // DELETE
  // Delete un post         nom précédent : deletePo
  deleteTask(id) {
    return apiConnect.delete(`/posts/${id}`);
  },
  // Delete un commentaire        nom précédent : deleteCo
  deleteComment(id) {
    return apiConnect.delete(`/comments/${id}`);
  },
  // Delete une categorie
  // Delete de tous les posts de la catégorie         nom précédent : deletepostcat    FONCTION UTILISEE NULLE PART
  deleteAllPostsFromCat(id) {
    return apiConnect.delete(`/posts?categories=${id}`);
  },
  // Delete de la catégorie                         nom précédent : deletecat
  deleteCat(id) {
    return apiConnect.delete(`/categories/${id}?force=true`);
  },

  // USER
  // créer user
  postUser(form) {
    return apiConnect.post(`/users`, form);
  },
};
