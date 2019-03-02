<template>
  <div class="container">
    <div v-for="(item, index) in orderItems" :key="index" class="goods-item">
      <div class="goods-select">
        <input type="checkbox" @tap="handleBuyList(item.goodsId)">
      </div>
      <div class="goods-img">
        <img :src="baseUrl + item.imgUrl">
      </div>
      <div class="goods-detail">
        <div>{{item.goodsName}}</div>
        <div class="goods-detail_bottom">
          <span class="special-price">￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderItems: []
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
  onLoad (options) {
    var userId = wx.getStorageSync('openid')
    var orderId = options.orderId
    this.$get({'url': `/order?userId=${userId}&orderId=${orderId}`}).then((res) => {
      this.orderItems = res.data
    })
  }
}
</script>

<style scoped>
.container {
  /*border:1px solid red;*/
}
.bottom_nav {
  /*border:1px solid red;*/
  width:100%;
}
</style>
