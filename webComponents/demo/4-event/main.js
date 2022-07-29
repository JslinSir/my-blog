/**
 * 事件 传递
 */

const template = document.createElement('template')
template.innerHTML = `
 <div class="pop-modal-box">
 <slot>点我</slot>
 <div class="pop-modal">
  <div class="close">X</div>
  <div class="pop-modal-content"> 这是描述~</div>

 </div>
</div>`

const style = document.createElement('style')
style.textContent = `
.pop-modal-box {
  position: relative;
  cursor: pointer;
}

.pop-modal {
  position: absolute;
  padding: 20px 10px;
  min-width: 100px;
  background: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  border-radius: 10px;
  display: none;
}  
.close{
  font-size:12px;
  color:#666;
  text-align: right;
  margin-bottom: 10px;
  z-index:2;
}     
`

class MyEventComponent extends HTMLElement {

  static get observedAttributes() {
    return ['popdes']
  }

  constructor(...args) {
    super(...args)

    const templateContent = template.content
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(style) // 填充样式
    this.shadowRoot.appendChild(
      templateContent.cloneNode(true)
    )

    // 添加事件
    this.shadowRoot.querySelector('.pop-modal-box').addEventListener('click',()=>{
      this.show()
    })

    this.shadowRoot.querySelector('.close').addEventListener('click',(ev)=>{
      ev.stopPropagation() //阻止冒泡
      this.hide()
    })
  }

  render() {
    this.shadowRoot.querySelector('.pop-modal-content').innerHTML = this.popdes
  }

  get popdes(){
    return this.getAttribute('popdes')
  }


  show(){
    this.shadowRoot.querySelector('.pop-modal').style.display = 'block'
    // 分发事件
    this.dispatchEvent(new CustomEvent('statusChange',{detail:{ status:true }}))
  }

  hide(){
    this.shadowRoot.querySelector('.pop-modal').style.display = 'none'
    this.dispatchEvent(new CustomEvent('statusChange',{detail:{status:false}}))
  }


  connectedCallback() {
    console.log('%cconnectedCallback 触发**  将元素插入DOM时调用 ** ', 'color: green')
    // 自定义组件挂载之后，插入 文案
    this.render()
  }

  disconnectedCallback() {
    console.log('%cdisconnectedCallback 触发**  每次从DOM中删除元素时调用 ** ', 'color: red')
  }

  adoptedCallback() {
    console.log('adoptedCallback 触发**  将自定义元素移动到新文档时调用 ** ')
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('------   attributeChangedCallback 触发**  属性变化时调用 **  --------')
    console.table([
      {
        name: 'attrName',
        value: attrName,
      },
      {
        name: 'oldVal',
        value: oldVal,
      },
      {
        name: 'newVal',
        value: newVal,
      }
    ])
    // 如果监听到的属性值 是  data-name 触发更新 render
    if (attrName === 'popdes') {
      this.render()
    }

  }
}

window.customElements.define('my-event-component', MyEventComponent)