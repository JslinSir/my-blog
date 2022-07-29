customElements.define('my-head-card',
    class extends HTMLElement {
        static get observedAttributes() {
            return ['name', 'des', 'avatar'];
        }

        constructor() {
            super()

            // 获取插槽内容
            const template = document.getElementById('my-template-head-card')
            const templateContent = template.content

            this.shadowRootDom = this.attachShadow({ mode: 'open' })
            this.shadowRootDom.appendChild(
                templateContent.cloneNode(true)
            );
        }

        render(attrName) {
            const curentEl = this.shadowRootDom.querySelector(`.${attrName}`)
            switch (attrName) {
                case 'name':
                    curentEl.innerText = this.name
                    break;
                case 'avatar':
                    curentEl.setAttribute('src', this.avatar)
                    break;
                case 'des':
                    curentEl.innerText = this.des
                    break;
            }
        }

        get name() {
            return this.getAttribute('name');
        }

        get des() {
            return this.getAttribute('des');
        }

        get avatar() {
            return this.getAttribute('avatar');
        }

        connectedCallback(){
         // 给头像 slot 添加 点击事件
         this.shadowRootDom.querySelector('.attrName').addEventListener('click',function(){
             alert('点了头像')
         })
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
            this.render(attrName)

        }
    }
);

