/**
 * 自定义 组件 
 */

class MyComponent extends HTMLElement {
    static get observedAttributes() {
      return ['data-name','draggable'];
    }
  
    constructor(...args) {
      console.log('--- 自定义组件初始化 ---')
      super(...args);
    }

    render(){
        this.innerHTML = `Hello： ${this.name}`
    }

    // 获取 name 值
    get name() {
        return this.getAttribute('data-name');
      }
  
    connectedCallback() {
        console.log('%cconnectedCallback 触发**  将元素插入DOM时调用 ** ','color: green')
        // 自定义组件挂载之后，插入 文案
        this.render()
    }
  
    disconnectedCallback() {
        console.log('%cdisconnectedCallback 触发**  每次从DOM中删除元素时调用 ** ','color: red')
    }
  
    adoptedCallback() {
        console.log('adoptedCallback 触发**  将自定义元素移动到新文档时调用 ** ')
    }
  
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('------   attributeChangedCallback 触发**  属性变化时调用 **  --------')
        console.table([
          {
            name:'attrName',
            value: attrName,
          },
          {
            name:'oldVal',
            value: oldVal,
          },
          {
            name:'newVal',
            value: newVal,
          }
        ])
        // 如果监听到的属性值 是  data-name 触发更新 render
        if(attrName === 'data-name'){
          this.render()
        }
   
    }
  }
  
  window.customElements.define('my-component', MyComponent)