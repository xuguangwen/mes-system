<template>
  <div class="drag">
    <div class="dragBox color-white"  @mousedown="mousedown">
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
        let _target = el;
        _target.onmousedown = event => {
          var event=event||window.event;
          var startx=event.clientX;
          var starty=event.clientY;
          var actualX=startx-_target.offsetLeft;
          var actualY=starty-_target.offsetTop;
          var ww=document.documentElement.clientWidth;
          var wh = window.innerHeight;
          if (event.preventDefault) {
            event.preventDefault();
        } else{
            event.returnValue=false;
        };
          document.onmousemove = e => {
            var event=e||window.event;
            var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
                return false;
            };
            //算出鼠标相对元素的位置
            var endx=event.clientX-actualX;
            var endy=event.clientY-actualY;
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            _target.style.left=endx+'px';
            _target.style.top=endy+'px';
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
    //解决拖拽过快div粘
    mousedown(event){
      var event=event||window.event;
        var _target = event.target
        var startx=event.clientX;
        var starty=event.clientY;
        var actualX=startx-event.target.offsetLeft;
        var actualY=starty-event.target.offsetTop;
        var ww=document.documentElement.clientWidth;
        var wh = window.innerHeight;
        if (event.preventDefault) {
            event.preventDefault();
        } else{
            event.returnValue=false;
        };
        document.onmousemove=function (ev) {
            var event=ev||window.event;
            var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
                return false;
            };
            var endx=event.clientX-actualX;
            var endy=event.clientY-actualY;
            _target.style.left=endx+'px';
            _target.style.top=endy+'px';
        }
        document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //之前问题的拖拽方法
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

