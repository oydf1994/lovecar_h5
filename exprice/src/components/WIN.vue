<template>
  <div id="win">
    <table class="table table-striped" v-show="flag">
      <thead>
        <tr>
          <th>序号</th>
          <th>号码</th>
          <th>押注</th>
          <th>盈利</th>
          <th>胜利</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.number">
          <td>{{item.number}}</td>
          <td><img src="./../assets/car.png" alt="" class="car">{{item.lottery}}</td>
          <td class="win">￥{{item.chip}}</td>
          <td>{{item.profit}}</td>
          <td>
            <div v-show="item.win">
              <el-button type="primary"  @click="Judge(item,true)">赢</el-button>
              <el-button type="danger"  @click="Judge(item,false)">输</el-button>
            </div>
            <div v-show="!item.win" :class="item.text == '赢'?'wins':'errs'">
             {{item.text}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      flag: false,
      initial: 0
    };
  },
  methods: {
    Judge (item, flag) {
      item.win = false;
      let num = item.number - 0 + 1 >= 10 ? "0" : "00";
      if (flag) {
        let win = {
          number: num + (item.number - 0 + 1),
          lottery: this.win(),
          chip: this.initial,
          profit: this.initial * (item.number - 0 + 1),
          win: true,
          text: ""
        };
        this.list.push(win);
        item.text = "赢";
      } else {
        let win = {
          number: num + (item.number - 0 + 1),
          lottery: this.win(),
          chip: item.chip * 2 - 0 + (this.initial - 0),
          win: true,
          text: "",
          profit: this.initial * (item.number - 0 + 1)
        };
        this.list.push(win);
        item.text = "输";
      }
    },
    win () {
      let win = Math.floor(Math.random() * 10 + 1);
      let firstsd = Math.floor(Math.random() * 10 + 1) % 2;
      if (win < 10) {
        win = "0" + win;
      }
      firstsd == 0 ? '双' : '单'
      console.log(firstsd)
      return win + firstsd;
    },
    open () {
      this.$prompt("请输入基数", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message({
              type: "info",
              message: "请重新输入"
            });
            this.open();
            return false;
          }
          this.flag = true;
          this.initial = value;
          let win = {
            number: "001",
            lottery: this.win(),
            chip: value,
            profit: value,
            win: true,
            text: ""
          };
          this.list.push(win);
          this.$message({
            type: "success",
            message: "你的基数是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
          this.open();
        });
    }
  },
  mounted () {
    this.open();
  }
};
</script>

<style scoped>
th,
td {
  text-align: center;
  line-height: 40px;
}
.win {
  color: red;
}
.car {
  width: 20px;
}
.wins {
  color: #0099ff;
}
.errs {
  color: #cc3333;
}
</style>
