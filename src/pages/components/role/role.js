// pages/role/role.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userIdx : null,
    userInfo: {
      type: null,
      value: '',
      observer: function(newVal, oldVal){
        console.log("newVal:", newVal, " oldVal:", oldVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     gun_img: 'http://127.0.0.1:8080/img/flag/gun.png',
     knife_img: 'http://127.0.0.1:8080/img/flag/knife.png',
     leaf_img: 'http://127.0.0.1:8080/img/flag/leaf.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickRole: function(){
      console.log(" click")
    }
  }
})
