<template>
  <div>
    <table class="table table-striped" v-show="flag">
      <thead>
        <tr>
          <th>序号</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.number}}</td>
          <td>{{item.lottery}}</td>
          <td>{{item.chip}}</td>
          <td>{{item.profit}}</td>
          <td>
            <div v-show="item.win">
              <el-button type="primary"  @click="Judge(item,true)">是</el-button>
              <el-button type="danger"  @click="Judge(item,false)">否</el-button>
            </div>
            <div v-show="!item.win">
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
    }
  },
  methods: {
    Judge (item, flag) {
      item.win = false
      console.log(item.number.length)
      let num = item.number - 0 + 1 >= 10 ? '0' : '00'
      if (flag) {
        let win = {
          number: num + (item.number - 0 + 1),
          lottery: this.win(),
          chip: item.chip,
          profit: item.profit,
          win: true,
          text: '',
          profit: this.initial * (item.number - 0 + 1)
        }
        this.list.push(win)
        item.text = '是'
      } else {
        let win = {
          number: num + (item.number - 0 + 1),
          lottery: this.win(),
          chip: item.chip * 2 + (item.profit - 0),
          profit: item.profit,
          win: true,
          text: '',
          profit: this.initial * (item.number - 0 + 1)
        }
        this.list.push(win)
        item.text = '否'
      }
    },
    win () {
      let win = Math.ceil(Math.random() * 10)
      return win
    },
    open () {
      this.$prompt('请输入基数', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
        value
      }) => {
        if (value == null) {
          this.$message({
            type: 'info',
            message: '请重新输入'
          });
          this.open()
          return false
        }
        this.flag = true
        this.initial = value
        let win = {
          number: '001',
          lottery: this.win(),
          chip: value,
          profit: value,
          win: true,
          text: ''
        }
        this.list.push(win)
        this.$message({
          type: 'success',
          message: '你的基数是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
        this.open()
      });
    }
  },
  mounted () {
    this.open()
  }
}

</script>

<style scoped>
th,
td {
  text-align: center;
  line-height: 40px;
}
</style>
