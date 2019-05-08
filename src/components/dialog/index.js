
import Supplier from './Supplier/index.js'
import Staff from './Staff/index.js'

const components = [
    Supplier,
    Staff
]

const install = function(Vue, opts = {}) {
    components.map(component => {
            Vue.component(component.name, component)
        })
    // 供应商
    Vue.prototype.$mesSupplier = Supplier
    Vue.prototype.$mesStaff = Staff
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default install