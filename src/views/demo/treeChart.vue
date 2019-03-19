<template>
  <div class="treeChart">
    <label>
      切换为横向
      <input type="checkbox" v-model="landscape" value="1">
    </label>
    <TreeChart :json="data" :class="{landscape: landscape.length}" @click-node="clickNode" />
  </div>
</template>
<script>
import TreeChart from "./components/TreeChart";
export default {
  name: 'app',
  components: {
    TreeChart
  },
  data() {
    return {
      landscape: [],
      data: {
        name: 'root',
        image_url: "https://static.refined-x.com/avat.jpg",
        children: [
          {
            name: 'children1',
            image_url: "https://static.refined-x.com/avat1.jpg"
          },
          {
            name: 'children2',
            image_url: "https://static.refined-x.com/avat2.jpg",
            mate: {
              name: 'mate',
              image_url: "https://static.refined-x.com/avat3.jpg"
            },
            children: [
              {
                name: 'grandchild',
                image_url: "https://static.refined-x.com/avat.jpg"
              },
              {
                name: 'grandchild2',
                image_url: "https://static.refined-x.com/avat1.jpg"
              },
              {
                name: 'grandchild3',
                image_url: "https://static.refined-x.com/avat2.jpg"
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    clickNode: function(node){
      // eslint-disable-next-line
      console.log(node)
    }
  }
}
</script>
<style lang="scss" scoped>
.treeChart{
  padding: 20px;
}
</style>
