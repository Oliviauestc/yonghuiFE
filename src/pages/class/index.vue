<template>
  <div class="class-wrap">
    <div class="nav-left">
      <ul>
        <li v-for="(item, index) in list" :key="index" class="nav-item" :class="curNav == item.id ? 'active' : ''" @tap="selectClass" :data-id="item.id" :data-index="index">{{item.value}}</li>
      </ul>
    </div>
    <div class="main-container">
      <div v-for="(item, index) in curClass" :key="index" class="goods-item">
        <div class="goods-img">
          <img :src="baseUrl + item.imgUrl">
        </div>
        <div class="goods-detail">
          <div>{{item.goodsName}}</div>
          <div class="goods-detail_bottom">
            <span class="special-price">￥{{item.price}}</span>
            <span class="add-icon" @tap="addToCart(item.goodsId)">+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      curNav: 0,
      list: [],
      curClass: []
    }
  },
  computed: {
  },
  methods: {
    initClass () {
      this.$get({'url': '/class'}).then((res) => {
        this.list = res.data
        this.curNav = res.data[0].id
        this.$get({'url': `/class?classId=${this.curNav}`}).then((res) => {
          this.curClass = res.data
        })
      })
    },
    selectClass (e) {
      const id = e.target.dataset.id
      this.curNav = id
      this.$get({'url': `/class?classId=${this.curNav}`}).then((res) => {
        this.curClass = res.data
      })
    },
    addToCart (id) {
      var userId = wx.getStorageSync('openid')
      this.$post({'url': '/cart', data: { 'type': 'add', 'goodsId': id, 'userId': userId }}).then((res) => {
        if (res) {
          console.log('添加成功！')
        }
      })
    }
  },
  created () {
  },
  mounted () {
    this.initClass()
  }
}
</script>

<style>
.class-wrap {
  display: flex;
  height: 100%;
}
.nav-left {
  overflow: scroll; 
  height: 100%;
  width: 25%;
  position: fixed;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.main-container {
  height: 100%;
  width: 75%;
  /*border:1px solid yellow;*/
  padding-top: 10px;
  padding-left: 5%;
  margin-left: 25%;
}
.nav-item {
  border:1px solid #D0D0D0;
  border-top:0px;
  background-color: #F8F8F8;
  height: 50px;
  display:flex;
  flex-direction:column;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
.active {
  background-color: #ffffff;
  border-right:0px;
}
.goods-item {
  height: 100px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.goods-img {
  display: inline-block;
  width: 40%;
  height: 100%;
}
.goods-img img {
  width: 100%;
  height: 100%;
}
.goods-detail {
  display: inline-block;
  float: right;
  width: 50%;
  height: 100%;
  position: relative;
}
.goods-detail_bottom {
  width: 100%;
  position: absolute;
  bottom: 5px;
  color: #ff6633;
}
.add-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ff6633;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  color: #ffffff;
  position: absolute;
  right: 5px;
}
</style>
