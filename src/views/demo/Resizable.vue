/*
 * @Author: xgw 
 * @Date: 2019-01-16 20:34:01 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-08-09 16:37:57
 */
 <!--可变窗口-->
<template>
  <div class="resize-container flex-wrap" ref="domRoot">
    <div class="resize-item">
      <p class="move-handler header-content">
        <slot></slot>
      </p>
      <i class="icon-resize resize-handler"></i>
    </div>

    <div class="resize-item">
      <p class="move-handler header-content">
        <slot></slot>
      </p>
      <i class="icon-resize resize-handler"></i>
    </div>

    <div class="resize-item">
      <p class="move-handler header-content">
        <slot></slot>
      </p>
      <i class="icon-resize resize-handler"></i>
    </div>

    <div class="resize-item">
      <p class="move-handler header-content">
        <slot></slot>
      </p>
      <i class="icon-resize resize-handler"></i>
    </div>

    <div class="resize-item">
      <p class="move-handler header-content">
        <slot></slot>
      </p>
      <i class="icon-resize resize-handler"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "resizable",
  data() {
    return {
      operationType: "", // 当前的操作类型: move resize
      isTouchable: false, // 是否支持触摸事件
      movable: false, // 是否可移动
      resizable: false, // 是否可调节大小
      currentDom: null, // 当前操作的dom
      startWidth: 0, // 按下鼠标时的宽度
      startHeight: 0, // 按下鼠标时的高度
      startPositionX: 0, // 按下鼠标时的x轴位置
      startPositionY: 0, // 按下鼠标时的y轴位置
      startX: 0, // 按下鼠标时 鼠标的x轴坐标
      startY: 0, // 按下鼠标时 鼠标的y轴坐标
      movableMin: 0,
      mevableMax: 0,
      resizableMin: 0,
      resizableMax: 0
    };
  },
  props: {},
  mounted() {
    let domRoot = this.$refs.domRoot;
    let movableDomList = Array.prototype.slice.call(
      domRoot.querySelectorAll(".move-handler")
    );
    let resizableDomList = Array.prototype.slice.call(
      domRoot.querySelectorAll(".resize-handler")
    );

    // 开始事件是绑定在子元素上面的哦
    this.bindStartEvent(movableDomList, domRoot, "move");
    this.bindStartEvent(resizableDomList, domRoot, "resize");

    // 移动和结束事件是绑定在父元素上面的
    this.bindMoveEvent(domRoot);
    this.bindEndEvent(domRoot);
  },
  methods: {
    // 绑定开始事件
    bindStartEvent(elList, domRoot, type) {
      elList.forEach(el => {
        // 触摸开始
        el.addEventListener("touchstart", e => {
          this.isTouchable = true;
          this.handleStart(e, type);
        });

        // 鼠标按下
        el.addEventListener("mousedown", e => {
          if (!this.isTouchable) {
            this.isTouchable = false;
            this.handleStart(e, type);
          }
        });
      });
    },
    // 绑定结束事件
    bindEndEvent(domRoot) {
      // 触摸结束
      domRoot.addEventListener("touchend", e => {
        this.handleEnd(e, this.operationType);
      });

      // 鼠标弹起
      domRoot.addEventListener("mouseup", e => {
        this.handleEnd(e, this.operationType);
      });

      // 鼠标移出文档范围
      document.body.addEventListener("mouseout", e => {
        if (
          (!this.movable && this.operationType === "move") ||
          (!this.resizable && this.operationType === "resize")
        ) {
          this.handleEnd(e, this.operationType);
        }
      });
    },
    // 绑定移动事件
    bindMoveEvent(domRoot) {
      domRoot.addEventListener("mousemove", e => {
        this.handleInProgress(e);
      });
      domRoot.addEventListener("touchmove", e => {
        this.handleInProgress(e);
      });
    },
    // 操作开始 记录初始值
    handleStart(e, type) {
      e.preventDefault();
      this.operationType = type;
      this.currentDom = e.target.parentNode;
      // 记录初始状态
      this.startWidth = this.currentDom.offsetWidth;
      this.startHeight = this.currentDom.offsetHeight;
      this.startPositionX = parseInt(this.currentDom.style.marginLeft) || 0;
      this.startPositionY = parseInt(this.currentDom.style.marginTop) || 0;

      // 如果支持触摸
      if (this.isTouchable) {
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
      } else {
        this.startX = e.x;
        this.startY = e.y;
      }

      switch (type) {
        case "move":
          this.movable = true;
          break;
        case "resize":
          this.resizable = true;
          break;
      }

      // console.log(e, this.currentDom, this.startPositionX)
    },
    // 操作进行中
    handleInProgress(e) {
      // 阻止默认行为 获得更好的性能
      e.preventDefault();
      switch (this.operationType) {
        case "move":
          this.handleMove(e, this.currentDom);
          break;
        case "resize":
          this.handleResize(e, this.currentDom);
          break;
      }
    },
    // 处理移动
    handleMove(e, currentDom) {
      if (this.movable) {
        let endX = e.x;
        let endY = e.y;
        if (this.isTouchable) {
          endX = e.changedTouches[0].pageX;
          endY = e.changedTouches[0].pageY;
        }
        // 计算差值
        let diffX = endX - this.startX;
        let diffY = endY - this.startY;

        // 最终位置
        let endLeft = this.startPositionX + diffX;
        let endRight = this.startPositionY + diffY;

        if (endLeft >= 0) {
          currentDom.style.marginLeft = endLeft + "px";
        } else {
          currentDom.style.marginLeft = "0px";
        }

        if (endRight >= 0) {
          currentDom.style.marginTop = endRight + "px";
        } else {
          currentDom.style.marginTop = "0px";
        }

        // console.log(diffX, diffY, currentDom.offsetWidth)
      }
    },
    // 处理调节大小
    handleResize(e, currentDom) {
      if (this.resizable) {
        let endX = e.x;
        let endY = e.y;
        if (this.isTouchable) {
          endX = e.changedTouches[0].pageX;
          endY = e.changedTouches[0].pageY;
        }
        // 计算差值
        let diffX = endX - this.startX;
        let diffY = endY - this.startY;

        // 最终的高宽
        let endWidth = this.startWidth + diffX;
        let endHeight = this.startHeight + diffY;

        if (endWidth > 20) {
          currentDom.style.width = endWidth + "px";
        } else {
          currentDom.style.width = "20px";
        }

        if (endHeight > 20) {
          currentDom.style.height = endHeight + "px";
        } else {
          currentDom.style.height = "20px";
        }

        // console.log(diffX, diffY, currentDom.offsetWidth)
      }
    },
    // 操作结束
    handleEnd(e, type) {
      this.currentDom = null;
      switch (type) {
        case "move":
          this.movable = false;
          break;
        case "resize":
          this.resizable = false;
          break;
      }
      this.operationType = "";
    }
  }
};
</script>

<style scoped lang="scss">
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.resize-container {
  padding-left: 20px;
  padding-top: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  .resize-item {
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    width: 300px;
    height: 200px;
    background-color: cadetblue;
    .move-handler {
      margin: 0 0;
      padding: 0 0;
      height: 30px;
      background-color: bisque;
      position: relative;
      user-select: none;
      cursor: move;
    }
    .icon-resize {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 9;
      right: 0;
      bottom: 0;
      cursor: nwse-resize;
      user-select: none;
      background-color: red;
    }
  }
}
</style>