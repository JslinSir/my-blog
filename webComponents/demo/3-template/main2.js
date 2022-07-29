// 直接通过 模板标签的形式 创建模板，然后插入 文档内容
const template = document.createElement('template')
template.innerHTML = `<div class="wrapper">test</div>`
// 通过 createElement 的方式 插入样式
 const style = document.createElement('style')
 style.textContent = `
          .wrapper {
            color: red;
          }`

// 通过 adoptedStyleSheet 的方式 添加样式
const style2 = new CSSStyleSheet()
style2.replaceSync(`.wrapper {font-weight:bold;font-size: 32px;}`)

class TemplateTestComponents extends HTMLElement {
 constructor() {
   super()
   const shadowRoot = this.attachShadow({ mode: "closed" })
   shadowRoot.appendChild(style)
   shadowRoot.adoptedStyleSheets = [style2]
   shadowRoot.appendChild(template.content.cloneNode(true))
 
   console.log(   shadowRoot.querySelector('.wrapper'))

 }
}
customElements.define('my-template-test', TemplateTestComponents)