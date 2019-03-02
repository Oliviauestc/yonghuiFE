<template>
  <div class="user-container">
    <div class="user-info">
      <div class="avatar">
        <open-data class="avatar-img" type="userAvatarUrl"></open-data>
      </div>
      <span class="nickname">
        <open-data type="userNickName"></open-data>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      nickName: '',
      avatarUrl: ''
    }
  },
  methods: {
  },
  mounted () {
    // this.getUserInfo()
  },
  created () {
  },
  onLoad () {
  },
  onShow () {
    console.log('我的onshow%%%%%%%%%%%%%%%%')
  }
}
</script>

<style scoped>
.user-container {
  padding: 2%;
}
.user-info {
  width: 95%;
  height: 50px;
  padding: 2%;
  border: 1px solid #F8F8F8;
  border-radius: 4px;
  background-color: #F8F8F8;
}
.avatar {
  float: left;
}
.avatar .avatar-img {
  display: inline-block;
  width: 50px;
  height: 50px;
  /*border: 1px solid blue;*/
  /*border-radius: 50%;*/
}
.nickname {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}
</style>
