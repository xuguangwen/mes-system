/*
 * @Author: xgw 
 * @Date: 2018-12-24 14:53:33 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-04 15:55:56
 */


 <template>
  <div class="my-3">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="分页记忆1" name="first">
        <case1></case1>
      </el-tab-pane>
      <el-tab-pane label="分页记忆2" name="second">
        <case2></case2>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import case1 from "./case1";
import case2 from "./case2";
export default {
  name: "tabelIndex",
  components: {
    case1,
    case2
  },
  data() {
    return {
      activeName2: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
