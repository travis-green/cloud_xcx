Component({
    externalClasses: ['i-class', 'i-class-mask', 'i-class-header'],
  
    options: {
      multipleSlots: true
    },
  
    properties: {
      visible: {
        type: Boolean,
        value: false
      },
      actions: {
        type: Array,
        value: []
      },
      maskClosable: {
        type: Boolean,
        value: true
      }
    },
  
    methods: {
      handleClickMask() {
        if (!this.data.maskClosable) return;
        this.handleClickCancel();
      },
      preventTouchmove() {},
      handleClickItem(e) {
        const dataset = e.currentTarget.dataset || ''
        this.triggerEvent('click', dataset)
        this.triggerEvent('cancel');
      },
  
      handleClickCancel() {
        this.triggerEvent('cancel');
      }
    }
  })
  