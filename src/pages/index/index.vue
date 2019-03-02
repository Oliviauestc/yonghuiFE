<template>
  <div>
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="special-container">
      <div class="special-title">今日特价</div>
      <div class="special-list">
        <div class="special-item" v-for="(item, index) in specialList" :key="index">
          <div class="item-img">
            <img :src="baseUrl + item.imgUrl" style="width:100%;height:100%">
          </div>
          <div class="item-detail">
            <span>{{item.goodsName}}:</span>
            <span class="special-price">{{item.price}}</span>
            <span class="add-icon" @tap="addToCart(index)">+</span>
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
      key: '',
      userInfo: '',
      imgUrls: [
        '../../static/images/slider1.jpg',
        '../../static/images/slider2.jpg',
        '../../static/images/slider3.jpg'
      ],
      specialList: []
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getSpecialList () {
      this.$get({'url': '/class?type=onsale'}).then((res) => {
        this.specialList = res.data
      })
    },
    addToCart (index) {
      this.$store.dispatch('Add', this.specialList[index])
    },
    handleChange (detail) {
      this.current = detail.target.key
      wx.navigateTo({
        url: '/pages/counter/main'
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getSpecialList()
  }
}
</script>

<style scoped>
.container {
  /*border:1px solid red;*/
}
.swiper {
  /*border:1px solid red;*/
}
.special-container {
  padding:20px 0px;
}
.special-title {
  margin-left: 3.3%;
  margin-bottom: 20px;
}
.special-list {
  /*border: 1px solid red;*/
}
.special-item {
  display: inline-block;
  margin-left: 1%;
  width: 48%;
  height: 150px;
}
.item-img {
  width: 100%;
  height: 60%;
}
.item-detail {
  width: 100%;
  text-align: center;
  vertical-align: middle;
  height: 40%;
}
.special-price {
  color: green;
  font-weight: 700;
}
.add-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ff6633;
  border-radius: 10px;
  margin-left: 5px;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  color: #ffffff;
}
</style>
