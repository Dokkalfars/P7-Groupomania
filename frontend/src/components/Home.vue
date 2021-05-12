<!-- composant pour le logo Maison, qui renvoie a la page principale ( " Stream " ) -->

<template>
    <header class="container">
        <div class="row">
            <nav class="col-12">
               <router-link to="/Stream" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel w-100">  Accueil </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "Home"
}
</script>