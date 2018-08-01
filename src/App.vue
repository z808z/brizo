<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" :to="{ name: 'home'}">Brizo - SPA</router-link>
        </div>
      </div>
    </nav>
    <main>
      <section class="section">
        <div class="container">
          <router-view></router-view>
        </div>
      </section>
    </main>
  </div>
</template>