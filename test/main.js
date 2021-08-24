const app = document.querySelector('#app')
const modal = document.querySelector('#colorModal')
const modalTitle = document.querySelector('#colorModalTitle')
const modalColor = document.querySelector('#colorModalColor')
const modalText = document.querySelector('#colorModalText')
const modalButton = document.querySelector('#colorModalClose')

const element = (name, classList) => {const el=document.createElement(name);el.classList.add(classList);return el}

const div = (classList) => element('div',classList)
const h1 = (classList) => element('h1', classList)
const h3 = (classList) => element('h3', classList)
const text = (classList) => element('span', classList)

const entries = (object) => Object.entries(object)

const gradientInline = (colorArray) => `linear-gradient(135deg, ${colorArray.join()})`

const openModal = (text, color, isGradient) => {
    const isColor = isGradient ? false : true

    const isDarkColor = jebcolors.functions.isDarkColor
    const averageColor = jebcolors.functions.averageColor

    const borderColor = isDarkColor(isColor ? color : averageColor(color)) ? 'white' : 'black'

    app.classList.add('blur')

    modal.style.background = isColor ? color : gradientInline(color)
    modal.style.borderColor = borderColor

    modalTitle.innerHTML = text
    modalTitle.style.color = borderColor

    modalColor.innerHTML = color
    modalColor.style.color = borderColor

    modalText.style.color = borderColor

    modalButton.style.color = borderColor
    modalButton.style.borderColor = borderColor
    modalButton.onclick = closeModal

    modal.classList.remove('d-none')
}

const closeModal = () => {
    modal.classList.add('d-none')
    app.classList.remove('blur')
}

const createContent = async () => {
    try{
        if(typeof jebcolors === 'undefined'){
            const _h1_ = h1()
            _h1_.innerHTML = 'No se encontró window.jebcolors, ¿segur@ que existe bundle.js?'
            app.append(_h1_)
            return
        }

        const allColors = jebcolors.colors

        entries(allColors).forEach(entry => {
            const [colorGroupName, colorGroup] = entry
            
            if(colorGroupName === '__esModule') return

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_h1_ = h1()
            const _total_h3_ = h3()

            _name_h1_.innerHTML = colorGroupName
            _total_h3_.innerHTML = `${Object.keys(colorGroup).length} colors`
            _main_div_.append(_name_h1_, _total_h3_)

            entries(colorGroup).forEach(entry => {
                const [colorName, color] = entry

                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = `${colorName}`
                _name_white_.innerHTML = `${colorName}`

                _color_div_.append(_name_black_,_name_white_)
                _color_div_.style.backgroundColor = color
                _color_div_.onclick = () => {
                    openModal(colorName, color, false)
                }

                _container_div_.append(_color_div_)
            })

            _main_div_.append(_container_div_)
            app.append(_main_div_)
        })

        const allGradients = jebcolors.gradients

        entries(allGradients).forEach(entry => {
            const [gradientGroupName, gradientGroup] = entry

            if(gradientGroupName === '__esModule') return

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_h1_ = h1()
            const _total_h3_ = h3()

            _name_h1_.innerHTML = gradientGroupName
            _total_h3_.innerHTML = `${Object.keys(gradientGroup).length} gradients`
            _main_div_.append(_name_h1_)
            _main_div_.append(_total_h3_)

            entries(gradientGroup).forEach(entry => {
                const [gradientName, gradient] = entry

                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = gradientName
                _name_white_.innerHTML = gradientName

                _color_div_.append(_name_black_,_name_white_)
                _color_div_.style.background = gradientInline(gradient)
                _color_div_.onclick = () => {
                    openModal(gradientName, gradient, true)
                }

                _container_div_.append(_color_div_)
            })

            _main_div_.append(_container_div_)
            app.append(_main_div_)
        })  
    }
    catch(err){
        const _main_div_ = div()
        const _h1_ = h1()
        _h1_.innerHTML = `There is an error in the jsons: ${err}`
        _main_div_.append(_h1_)
        app.append(_main_div_)
    }
}
createContent()