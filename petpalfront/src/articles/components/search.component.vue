<script>
import {PetService} from "@/pets/services/pet.service.js";
import {Article} from "@/articles/models/article.entity.js";

export default {
  name: 'app-search',
  name: 'app-search',
  data() {
    return {
      searchTerm: '',
      articles: [],
      allArticles: [],
      petService: new PetService(),
    }
  },
  methods: {
    buildArticleListFromResponseData(articles) {
      return articles.map(article => new Article(article.id, article.title, article.content, article.imagePath, article.author, article.authorImage, article.date));
    },
    getArticles() {
      this.petService.getArticles()
          .then(response => {
            let articles_json = response.data;
            this.allArticles = this.buildArticleListFromResponseData(articles_json);
            this.articles = [...this.allArticles];
            console.log(this.articles);
          })
          .catch(error => {
            console.error(error);
          });
    },
    searchArticles() {
      if (this.searchTerm === '') {
        this.articles = [...this.allArticles];
      } else {
        this.articles = this.allArticles.filter(article =>
            article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },
    async viewArticleDetails(id) {
      try {
        const article = await this.petService.getArticleById(id);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getArticles();
  },
};
</script>

<template>
  <input type="text" v-model="searchTerm" @input="searchArticles" placeholder="Search articles">
  <div class="articles">
    <router-link v-for="article in articles" :key="article.id" :to="{ name: 'article-detail', params: { id: article.id } }" class="card">
      <img :src="article.imagePath" alt="Article photo">
      <div class="card-body">
        <h2>{{ article.title }}</h2>
        <div class="author-info">
          <img :src="article.authorImage" alt="Author photo" class="author-image">
          <h3>{{ article.author }}</h3>
        </div>
        <p>{{ article.content }}</p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  margin-top: 8vh;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.card {
  flex: 0 0 30%;
  margin-bottom: 16px;
  text-decoration: none; /* Remove the default underline of router-link */
}

.card img {
  width: 100%;
  height: auto;
}

.card-body p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
}

.author-info h3 {
  margin: 0;
}
</style>