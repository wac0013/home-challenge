<template>
  <div class="p-d-flex p-jc-center p-ai-center" id="main-content">
    <Card
      id="card"
      class="p-sm-12 p-md-8 p-lg-6 p-xl-4"
      style="max-width: 400px;"
    >
      <template v-slot:content>
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </template>
      <!--<router-view></router-view>-->
    </Card>
    <Toast position="top-left" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Card from "primevue/card";
import Toast from "primevue/toast";

@Options({
  components: {
    Card,
    Toast
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
})
export default class ScanItens extends Vue {
  mounted() {
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
body,
html,
#main-content,
#app {
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}
</style>
