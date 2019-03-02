const cart = {
  state: {
    cartItems: []
  },

  mutations: {
    ADD_CART: (state, item) => {
      let items = state.cartItems
      let flag = 0
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
          flag = 1
          state.cartItems[i].count++
          break
        }
      }
      if (flag === 0) {
        item.count = 1
        state.cartItems.push(item)
      }
    },
    MOVE_OUT: (state, item) => {
      let items = state.cartItems
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
          state.cartItems[i].count--
          if (state.cartItems[i].count === 0) {
            state.cartItems.splice(i, 1)
          }
          break
        }
      }
    }
  },

  actions: {
    // 加入购物车
    Add ({ commit }, item) {
      commit('ADD_CART', item)
    },
    MoveOut ({ commit }, item) {
      commit('MOVE_OUT', item)
    }
  }
}

export default cart
