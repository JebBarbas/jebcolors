const app = document.querySelector('#app')

const div = (classList) => {const el=document.createElement('div');el.classList.add(classList);return el}
const h1 = (classList) => {const el=document.createElement('h1');el.classList.add(classList);return el}
const h3 = (classList) => {const el=document.createElement('h3');el.classList.add(classList);return el}
const text = (classList) => {const el=document.createElement('span');el.classList.add(classList);return el}

const createContent = async () => {
    try{
        const result = await fetch('./colors.json')
        const allColors = await result.json()

        for(const colorGroup in allColors){
            if(colorGroup === '__esModule') continue

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_h1_ = h1()
            const _total_h2_ = h3()

            _name_h1_.innerHTML = colorGroup
            _total_h2_.innerHTML = `${Object.keys(allColors[colorGroup]).length} colors`
            _main_div_.append(_name_h1_, _total_h2_)

            for(color in allColors[colorGroup]){
                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = color
                _name_white_.innerHTML = color

                _color_div_.append(_name_black_,_name_white_)
                _color_div_.style.backgroundColor = allColors[colorGroup][color]

                _container_div_.append(_color_div_)
            }

            _main_div_.append(_container_div_)
            app.append(_main_div_)
        }  

        const result_2 = await fetch('./gradients.json')
        const allGradients = await result_2.json()

        for(const gradientGroup in allGradients){
            if(gradientGroup === '__esModule') continue

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_h1_ = h1()
            const _total_h2_ = h3()

            _name_h1_.innerHTML = gradientGroup
            _total_h2_.innerHTML = `${Object.keys(allGradients[gradientGroup]).length} gradients`
            _main_div_.append(_name_h1_)
            _main_div_.append(_total_h2_)

            for(gradient in allGradients[gradientGroup]){
                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = gradient
                _name_white_.innerHTML = gradient

                _color_div_.append(_name_black_,_name_white_)
                _color_div_.style.background = `linear-gradient(135deg, ${allGradients[gradientGroup][gradient].join()})`

                _container_div_.append(_color_div_)
            }

            _main_div_.append(_container_div_)
            app.append(_main_div_)
        }  
    }
    catch(err){
        const _main_div_ = document.createElement('div')
        const _h1_ = document.createElement('h1')
        _h1_.innerHTML = `There is an error in the jsons`
        _main_div_.append(_h1_)
        app.append(_main_div_)
    }
}
createContent()