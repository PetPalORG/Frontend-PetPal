<script>
import {PetService} from "@/pets/services/pet.service.js";

export default {
  name: 'detail-component',
  data() {
    return {
      article: null,
      petService: new PetService(),
    }
  },
  async created() {
    const id = this.$route.params.id;
    this.article = await this.petService.getArticleById(id);
  }
}
</script>

<template>
  <div class="article-detail" v-if="article">
    <h1 class="title">{{ article.title }}</h1>
    <div class="content">
      <div class="left-side">
        <div class="author-info">
          <img :src="article.authorImage" alt="Author photo">
          <div>
            <h3>{{ article.author }}</h3>
            <p>{{ article.date }}</p>
          </div>
        </div>
      </div>
      <div class="right-side">
        <img :src="article.image" alt="Article photo">
      </div>
    </div>
    <p class="paragraph">{{ article.content }}</p>
  </div>
</template>

<style scoped>
.article-detail {
  display: flex;
  flex-direction: column;
}

.title {
  margin-top: 10vh;
  font-size: 4rem;
  font-weight: bold;
  width: 100%;
  color: blue;
}

.content {
  display: flex;
  align-items: flex-start; /* Align items to the start */
  margin-top: 20px;
}

.left-side .author-info {
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

.right-side img {
  width: 100vh;
  height: auto;
  margin-left: 30vh;
}

.paragraph {
  text-align: justify;
  max-width: 60%;
  margin: 30px 0 0 450px;
  font-size: 1.5rem;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .title {
    font-size: 3rem;
  }

  .author-info img {
    width: 40px;
    height: 40px;
  }

  .right-side img {
    width: 70vh;
    margin-left: 15vh;
  }

  .paragraph {
    max-width: 80%;
    margin: 30px 0 0 100px;
    font-size: 1.2rem;
  }
}

@media (max-width: 800px) {
  .title {
    font-size: 2rem;
  }

  .author-info img {
    width: 30px;
    height: 30px;
  }

  .right-side img {
    width: 50vh;
    margin-left: 5vh;
  }

  .paragraph {
    max-width: 100%;
    margin: 30px 0 0 50px;
    font-size: 1rem;
  }
}
</style>