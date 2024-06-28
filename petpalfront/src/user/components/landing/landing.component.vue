<script>
export default {
  name: "landing",
  data() {
    return {
      services: [
        { img: "src/assets/images/landing_services2.png", tittle: "Perfiles de Mascota" },
        { img: "src/assets/images/landing_services1.png", tittle: "Gestionar Mascota" },
        { img: "src/assets/images/landing_services3.png", tittle: "Recursos" },
        { img: "src/assets/images/landing_services4.png", tittle: "Consejos" }
      ],
      feedback: [
        { img: "src/assets/images/landing_feedback1.png", name: "Anna & Tobby", opinion: "Increíble servicio y atención", color: "bg-red-100" },
        { img: "src/assets/images/landing_feedback2.png", name: "Christine & Tom", opinion: "La comunidad es muy comprensiva", color: "bg-cyan-100"},
        { img: "src/assets/images/landing_feedback3.png", name: "Sindy & Kitch", opinion: "Kitch se encuentra mejor que nunca", color: "bg-green-100"},
      ],
      authors: [
        { img: "src/assets/images/landing_author_Franksaldarriaga.png", name: "Mi nombre es Frank Salazar, "},
        { img: "src/assets/images/landing_author_Ian.png", name: "Mi nombre es Ian Macavilca, "},
        { img: "src/assets/images/landing_author_PaoloMartinez.png", name: "Mi nombre es Paolo Martinez, "},
        { img: "src/assets/images/landing_author_DanielMamani.png", name: "Mi nombre es Daniel Mamani, "},
        { img: "src/assets/images/landing_author_MichaelCarmelino.png", name: "Mi nombre es Michael Carmelino, "},

      ]
    };
  },
  mounted() {
    const sliders = [...document.querySelectorAll('.author__body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    let value;
    buttonNext.addEventListener('click', ()=>{
      changePosition(1);
    });
    buttonBefore.addEventListener('click', ()=>{
      changePosition(-1);
    });
    const changePosition = (add)=>{
      const currentTestimony = document.querySelector('.author__body--show').dataset.id;
      value = Number(currentTestimony);
      value+= add;
      sliders[Number(currentTestimony)-1].classList.remove('author__body--show');
      if(value === sliders.length+1 || value === 0){
        value = value === 0 ? sliders.length  : 1;
      }
      sliders[value-1].classList.add('author__body--show');
    }
  },
  methods:{
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },

  }
}
</script>

<template>
  <div class="p-card-content flex-auto">
    <header>
      <div class="card" id="landing_toolbar">
        <pv-toolbar style="border-radius: 0; padding: 1rem 1rem 1rem 1.5rem"
                    class="bg-yellow-200">
          <template #start>
            <div class="card bg-black-alpha-10 shadow-2 border-round align-items-center">
              <pv-image src="src/assets/images/landing_header_logo.png" alt="PetPal" width="200" />
            </div>
          </template>

          <template #end>
            <div class="flex align-items-center gap-2">
              <pv-button @click="goToLogin" label="Ingresar" severity="" size="small" />
              <pv-button @click="goToRegister" label="Registrarse" severity="" size="small"/>
            </div>
          </template>
        </pv-toolbar>
      </div>
    </header>

    <main>
      <section id="landing_welcome" class="card gap-8 bg-indigo-50 flex flex-column md:flex-row justify-content-center align-items-center gap-4 p-4">
        <section class="max-w-30rem bg-blue-100 p-4 border-round">
          <h1 class="text-center md:text-left">¡Conoce los cuidados para una mascota feliz!</h1>
          <p class="text-center md:text-left">El vínculo humano-mascota es una relación para toda la vida, y esta puede desarrollarse a múltiples niveles. Nuestra misión es ayudarte con el proceso.</p>
        </section>
        <div class="max-w-30rem p-4 flex justify-content-center md:justify-content-end">
          <img src="../../../assets/images/landing_welcomedog.png" alt="Imagen de mascota" class="rounded-image"
               style="background-color: #FFE55E;
               border-radius: 40% 75% 55% 75% / 62% 75% 40% 85%;
               margin-right: 0; /* Reset for mobile view */
               margin-top: 0; /* Reset for mobile view */
               }">
        </div>
      </section>

      <section id="landing_services" class="card">
        <div class="pruebas bg-yellow-100 p-4">

          <div class="pruebas-h1 text-center mb-4">
            <h1>Algunos de nuestros servicios</h1>
          </div>

          <div class="contenedor-prueba card gap-4 p-8">
            <div v-for="(service, index) in services" :key="index" class="slider surface-overlay shadow-2 relative overflow-hidden p-2">
              <pv-card style="width: 200px; height: 300px; ">
                <template #header>
                  <pv-image :src="service.img" width="100%" height="100%" class="object-cover"/>
                  <div class="overlay">
                    <h2>{{ service.tittle }}</h2>
                  </div>
                </template>
              </pv-card>
            </div>
          </div>

        </div>
      </section>

      <section id="landing_investigation" class="card gap-8 bg-indigo-50 flex flex-column md:flex-row justify-content-center align-items-center p-4">
        <div class="max-w-30rem p-4 flex justify-content-center md:justify-content-center">
          <img src="../../../assets/images/landing_investigation.png" alt="" class="investigation-image">
        </div>

        <div class="border-round max-w-30rem bg-blue-100 p-4">
          <h1>Los perros hablan, <br>pero solo a los que saben oir.</h1>
          <p>Desde sutiles gestos hasta ladridos llenos de significado, los perros tienen mucho que decirnos si estamos dispuestos a escuchar. Descubre cómo interpretar el lenguaje de tu mejor amigo de cuatro patas y fortalecer así vuestro vínculo único. ¿Quieres profundizar más en este tema?</p>
          <pv-button href="/#" class="cta">Aprender más</pv-button>
        </div>
      </section>

      <section id="video_section" class="card bg-cyan-50 flex flex-column justify-content-center align-items-center column-gap-8 p-4">
        <h1>About-the-product / About-the-team</h1>
        <div class="max-w-full border-round bg-blue-100 p-4 flex justify-content-center" style="gap: 20px;"> <!-- Ajusta el gap según necesites -->
          <iframe width="560" height="315" src="https://www.youtube.com/embed/XrjAILusm4k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/gfxE29PV4AI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </section>

      <section id="about-the-team">

      </section>

      <section id="landing_feedback" class = "feedback card bg-yellow-50">
        <div class="pruebas  p-4">
          <div class="pruebas text-center mb-4">
            <h1>Testimonios</h1>
          </div>

          <div class="grid card gap-4 p-8 justify-content-center">
            <pv-card v-for="(item, index) in feedback" :key="index" style="width: 400px; height: 600px;" class="list-none slider">
              <template #header  >
                <div :class="item.color" class="" >
                  <pv-image :src="item.img" width="100%" height="100%"/>
                </div>
              </template>
              <template #content>
                <h2>{{ item.name }}</h2>
                <p>{{ item.opinion }}</p>
              </template>
              <template #footer>
                <div class="rating">
                  <!-- Aquí puedes agregar la lógica de la calificación, si es necesario -->
                </div>
              </template>
            </pv-card>
          </div>
        </div>
      </section>

      <section id="landing_authors" class="bg-yellow-200">
        <div class="author__container container">
          <img src="../../../assets/images/landing_author_leftarrow.svg" class="author__arrow" id="before" alt="" @click="buttonBefore()" >

          <section class="author__body author__body--show" data-id="1">
            <div class="author__texts">
              <h2 class="subtitle">Mi nombre es Frank Salazar, <span class="author__course">Fundador de PetPal.</span></h2>
              <p class="author__review">Estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas</p>
            </div>
            <figure class="author__picture">
              <img src="../../../assets/images/landing_author_Franksaldarriaga.jpg" class="author__img" alt="">
            </figure>
          </section>

          <section class="author__body" data-id="2">
            <div class="author__texts">
              <h2 class="subtitle">Mi nombre es Ian Macavilca, <span class="author__course">Fundador de PetPal.</span></h2>
              <p class="author__review">Estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas</p>
            </div>
            <figure class="author__picture">
              <img src="../../../assets/images/landing_author_ian.png" class="author__img" alt="">
            </figure>
          </section>

          <section class="author__body" data-id="3">
            <div class="author__texts">
              <h2 class="subtitle">Mi nombre es Paolo Martinez, <span class="author__course">Fundador de PetPal.</span></h2>
              <p class="author__review">Estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas</p>
            </div>
            <figure class="author__picture">
              <img src="../../../assets/images/landing_author_PaoloMartinez.png" class="author__img" alt="">
            </figure>
          </section>

          <section class="author__body" data-id="4">
            <div class="author__texts">
              <h2 class="subtitle">Mi nombre es Daniel Mamani, <span class="author__course">Fundador de PetPal.</span></h2>
              <p class="author__review">Estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas</p>
            </div>
            <figure class="author__picture">
              <img src="../../../assets/images/landing_author_DanielMamani.jpg" class="author__img" alt="">
            </figure>
          </section>

          <section class="author__body" data-id="5">
            <div class="author__texts">
              <h2 class="subtitle">Mi nombre es Michael Carmelino, <span class="author__course">Fundador de PetPal.</span></h2>
              <p class="author__review">Estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas</p>
            </div>
            <figure class="author__picture">
              <img src="../../../assets/images/landing_author_MichaelCarmelino.png" class="author__img" alt="">
            </figure>
          </section>

          <img src="../../../assets/images/landing_author_rightarrow.svg" class="author__arrow" id="next" alt="" >
          </div>
      </section>

    </main>

    <footer>
      <div class="footer">
        <section class="footer__container container">
          <nav class="nav nav--footer">
            <h2 class="footer__title">Mantente al día con los cuidados para tus <br> mascota.</h2>

          </nav>

          <form action="https://api.web3forms.com/submit" method="POST">
            <div class="footer__inputs">
              <!-- Replace with your Access Key -->
              <input type="hidden" name="access_key" value="3067e5ad-39cf-43dd-b13f-cfc53661fa3d">
              <!-- Email -->
              <input type="hidden" name="subject" value="Boletín PetPal">
              <input type="hidden" name="from_name" value="PetPal.org">
              <input type="hidden" name="replyto" value="notify@petpal.org">
              <input type="hidden" name="name" value="PetPal Team" >
              <input type="hidden" name="message" value="¡Felicidades por subscribirte a nuestro boletín!">

              <input type="email" placeholder="Escribe tu e-mail:" class="footer__input" name="email">
              <!-- hCaptcha Spam Protection -->
              <div class="h-captcha" data-captcha="true"></div>

            </div>
            <br>
            <pv-button type="submit" :width="80" class="">Enviar</pv-button>
          </form>
        </section>

        <section class="card bg-black-alpha-40 p-1">
          <h2>Siguenos en las redes sociales:</h2>
          <div class="footer__social">
            <a href="#" class="footer__icons"><img src="../../../assets/images/landing_footer_facebook.webp" style="width: 30px;" alt=""></a>
            <a href="#" class="footer__icons"><img src="../../../assets/images/landing_footer_instagram.svg" style="width: 30px;" alt=""></a>
          </div>
        </section>
      </div>

    </footer>
  </div>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #ffcc00;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.scroll-to-top pv-button {
  padding: 0;
}

.scroll-to-top pv-button {
  font-size: 24px;
}

.pruebas h1 {
  width: 20%;
  text-align: left;
  margin-bottom: 30px;
  margin-top: 30px;
  margin-left: 8%;
  color: #000000;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 3px solid #124C5F;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(13, 7, 2, 0.8);
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 1s ease;
}

.overlay h2 {
  color: #fff;
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
}

.slider:hover .overlay {
  height: 100%;
  cursor: pointer;
}

.slider {
  transition: transform 0.2s ease-in-out;
}

.slider:hover {
  transform: scale(1.05);
}

.contenedor-prueba {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,23%)); /* Cada columna tiene un tamaño mínimo de 300px y ocupa un espacio igual */
  grid-auto-rows: 1fr; /* Todas las filas tendrán la misma altura */
  gap: 20px;
  justify-items: center; /* Centrar los elementos horizontalmente */
  align-items: center; /* Centrar los elementos verticalmente */
}

/* author */
.author__container{
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  gap: 1em;
  align-items: center;
}

.author__body{
  display: grid;
  grid-template-columns: 1fr max-content;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  grid-column: 2/3;
  grid-row: 1/2;
  opacity: 0;
  pointer-events: none;
}


.author__body--show{
  pointer-events: unset;
  opacity: 1;
  transition: opacity 1.5s ease-in-out;
}

.author__img{
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 30%;
}

.author__texts{
  max-width: 700px;
}

.author__course{
  background-color: royalblue;
  color: #fff;
  display: inline-block;
  padding: 5px;
}

.author__arrow{
  width: 90%;
  cursor: pointer;
}

/* Footer */

.footer{
  background-color: #ffffff;
  text-align: center;
  align-content: center;
  align-items: center;
}

.footer__title{
  font-weight: 300;
  font-size: 2rem;
  margin-bottom: 30px;
}

.footer__title {
  color: #000;
}


.footer__container{
  display: inline-block;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 60px;
}

.nav--footer{
  padding-bottom: 20px;
  display: grid;
  gap: 1em;
  grid-auto-flow: row;
  height: 100%;
}

.footer__inputs{
  margin-top: 10px;
  margin-left: 25%;
  width: 50%;
  display: flex;
  overflow: hidden;
  border: 0 solid #ccc;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}



.footer__input{
  background-color: #fff;
  height: 50px;
  display: block;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  border: none;
  margin-right: 16px;
  padding: 20px;
}

.footer__icons{
  margin-bottom: 10px;
}

@media(max-width:450px){
  .author__img{
    width: 90px;
    height: 90px;
  }

  .rounded-image {
    display: none;
  }

  .investigation-image {
    display: none;
  }


}


</style>
