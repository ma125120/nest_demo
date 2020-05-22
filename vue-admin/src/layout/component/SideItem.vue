<template>
  <el-submenu
    :index="menu.path"
    v-if="menu.children && menu.children.length > 0"
  >
    <template slot="title">
      <i :class="`el-icon-${icon}`" v-if="icon"></i>
      <div slot="title">{{ menu.title }}</div>
    </template>
    <div v-for="item in menu.children" :key="item.path">
      <SideItem :menu="item"></SideItem>
    </div>
  </el-submenu>

  <el-menu-item :index="menu.path" v-else @click.native="to(menu.path)">
    <i :class="`el-icon-${icon}`" v-if="icon"></i>
    <div>{{ menu.title }}</div>
  </el-menu-item>
</template>

<script>
export default {
  name: "SideItem",
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    icon() {
      return this.menu.meta && this.menu.meta.icon;
    }
  },
  methods: {
    to(path) {
      // console.log(path);
      // this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss"></style>
