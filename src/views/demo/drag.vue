<template>
  <div class="drag">
    <div class="dragBox color-white" @mousedown="move">
      move方法拖拽
    </div>
    <div class="dragBox2 color-success" v-drag>
      自定义指令拖拽
    </div>
  </div>
</template>
<script>
export default {
  name: "drag",
  data() {
    return {
      positionX: 0,
      positionY: 0
    };
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        let odiv = el; //获取当前元素
        odiv.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;

          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  methods: {
    move(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      console.log('clientX:',e.clientX,odiv.offsetLeft)
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.drag {
  position: relative;
  .dragBox {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 200px;
    height: 200px;
    background-color: #666;
  }
  .dragBox2 {
    position: absolute;
    top: 100px;
    left: 340px;
    width: 200px;
    height: 200px;
    background-color: red;
  }
}
</style>

