/*
 * @Author: xgw 
 * @Date: 2019-03-13 17:34:49 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-03-13 17:38:38
 */

<template>
  <div class="dndList">
    <div class="dndList-list">
      <h3>常用</h3>
      <draggable :list="list1" :options="{group:'article', disabled: disabled}"
                 @start="start22"
                 @end="end22"
                 class="dragArea11"
                 style="height: 100px">
        <div v-for="(element, index) in list1" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">{{element.name}}</div>
          <div>
            <i class="el-icon-delete" @click="handleDel(index, element.id)"></i>
          </div>
        </div>
      </draggable>
    </div>
    <div style="width: 100%; height: 10px; background-color: #bfbfbf"></div>
    <div class="dndList-list">
      <h3>所有</h3>
      <draggable :list="list2" :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable', sort: false}"
                 @end="end"
                 class="dragArea">
        <div v-for="element in list2" :key="element.id"
             :class="{undraggable : element.flag}"
             class="list-complete-item">
          <div class="list-complete-item-handle2"> {{element.name}}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>
 
<script>
import draggable from 'vuedraggable'
 
export default {
  name: 'DndList',
  components: { draggable },
  watch: {
  },
  data () {
    return {
      falgs: 'article',
      disabled: false,
      list1: [],
      list2: [{id: 1, name: 1}, {id: 2, name: 2}, {id: 3, name: 3}, {id: 4, name: 4}, {id: 5, name: 5}, {id: 6, name: 6}, {id: 7, name: 7}, {id: 8, name: 8}, {id: 9, name: 9}, {id: 10, name: 10}]
    }
  },
  computed: {
  },
  methods: {
    end (ev) {
      if (ev.to.className === 'dragArea11') {
        this.$set(this.list2[ev.oldIndex], 'flag', true)
      }
    },
    start22 (event) {
      this.falgs = '222222'
    },
    end22 (ev) {
      this.falgs = 'article'
    },
    handleDel (index, id) {
      this.list1.splice(index, 1)
      let q = this.list2.find((value, index, arr) => {
        return value.id === id
      })
      this.$set(q, 'flag', false)
    }
  }
}
</script>
 
<style rel="stylesheet/scss" lang="scss" scoped>
 
  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 5px 12px;
    display: inline-block;
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }
 
  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }
 
  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }
  .undraggable {
    background-color: red;
  }
 
  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
</style>
