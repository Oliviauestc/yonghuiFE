<template>
  <div class="cart-wrap">
    <div class="empty-cart" v-if="items.length === 0">
      <img :src="emptyCart">
      <div class="add-text">不剁手的日子好空虚</div>
      <div class="to-main" @tap="handleChange">去首页逛逛</div>
    </div>
    <div v-else class="notempty-cart">
      <div class="choose-all">
        <input type="checkbox">
        <span class="choose-all_right">满18元免运费</span>
      </div>
      <div v-for="(item, index) in items" :key="index" class="goods-item">
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
            <span class="button-group">
              <span class="add-icon" @tap="addToCart(item.goodsId)">+</span>
              <span>{{item.quantity}}</span>
              <span class="add-icon" @tap="minusFromCart(item.goodsId)">-</span>
            </span>
          </div>
        </div>
      </div>
      <div class="sum-money">
        <div class="show-money">
          <div>
            <span>商品合计:</span>
            <span class="text">￥{{totalPrice}}</span>
          </div>
          <p>运费{{totalPrice >= 18 ? 0 : 6}}元</p>
        </div>
        <div class="buy-button" @tap="toBuy">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyCart from '../../images/empty_cart.png'
export default {
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      userId: '',
      emptyCart,
      totalPrice: 0,
      selectedIds: [],
      items: []
    }
  },
  computed: {
  },
  methods: {
    addToCart (id) {
      this.$post({'url': '/cart', data: { 'type': 'add', 'goodsId': id, 'userId': this.userId }}).then((res) => {
        this.items = res.data
        this.sumPrice()
      })
    },
    minusFromCart (id) {
      this.$post({'url': '/cart', data: { 'type': 'minus', 'goodsId': id, 'userId': this.userId }}).then((res) => {
        this.items = res.data
        this.sumPrice()
      })
    },
    handleBuyList (id) {
      var index = this.selectedIds.indexOf(id)
      if (index === -1) {
        this.selectedIds.push(id)
      } else {
        this.selectedIds.splice(index, 1)
      }
      console.log('选中的id们', this.selectedIds)
      this.sumPrice()
    },
    sumPrice () {
      if (this.selectedIds.length) {
        this.totalPrice = 0
        for (let i = 0; i < this.items.length; i++) {
          if (this.selectedIds.indexOf(this.items[i].goodsId) !== -1) {
            console.log('计算的价格', this.items[i].goodsId)
            this.totalPrice = this.totalPrice + this.items[i].quantity * this.items[i].price
          }
        }
        this.totalPrice = this.totalPrice.toFixed(1)
      } else {
        console.log('未选中任何')
        this.totalPrice = 0
      }
    },
    handleChange () {
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    toBuy () {
      this.$post({'url': '/order', data: { 'selectedIds': JSON.stringify(this.selectedIds), 'userId': this.userId }}).then((res) => {
        console.log('订单编号', res.data)
        wx.navigateTo({
          url: `/pages/order/main?orderId=${res.data}`
        })
      })
    }
  },
  onShow () {
    this.userId = wx.getStorageSync('openid')
    this.$get({'url': `/cart?userId=${this.userId}`}).then((res) => {
      this.items = res.data
    })
    this.sumPrice()
  }
}
</script>

<style>
.cart-wrap {
  display: flex;
  height: 100%;
}
.empty-cart {
  width: 100%;
  height: 500px;
  text-align: center;
}
.empty-cart img{
  width: 300px;
  height: 300px;
}
.empty-cart .add-text{
  margin-bottom: 30px;
}
.empty-cart .to-main{
  width: 150px;
  margin: 0 auto;
  height: 30px;
  border: 1px solid #ff6633;
  background-color: #ffffff;
  line-height: 30px;
  color: #ff6633;
}
.notempty-cart {
  width: 100%;
  /*padding: 15px 15px 0px 15px;*/
}
.choose-all {
  border-bottom: 1px solid #cccccc;
  padding: 15px 15px 15px 15px;
  margin: 15px 0px;
}
.choose-all_right {
  float: right;
  color: #ff6633;
}
.goods-item {
  height: 100px;
  border-bottom: 1px solid #cccccc;
  padding: 15px 15px 15px 15px;
  margin-bottom: 20px;
}
.goods-select {
  display: inline-block;
  width: 10%;
  height: 100%;
  float: left;
  text-align: center;
  vertical-align: middle;
}
.goods-select input {
  margin-top:50%;
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
  width: 45%;
  height: 100%;
  position: relative;
}
.goods-detail_bottom {
  font-size:20px;
  width: 100%;
  position: absolute;
  bottom: 5px;
  color: #ff6633;
}
.button-group {
  float: right;
  margin-right: 10px;
}
.add-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #ff6633;
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  vertical-align: middle;
  line-height: 30px;
  color: #ffffff;
}
.sum-money {
  height: 50px;
  border-bottom: 1px solid #cccccc;
  padding: 15px 15px 15px 15px;
}
.show-money {
  float: left;
  width: 70%;
}
.show-money .text {
  font-size: 20px;
  font-weight: 700;
  color: #ff6633;
}
.buy-button {
  text-align: center;
  margin-left: 70%;
  width: 25%;
  height: 25px;
  border: 1px solid #ff6633;
  border-radius: 5px;
  background-color: #ff6633;
  color: #ffffff;
}
</style>
