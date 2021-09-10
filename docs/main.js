const $ = (id) => document.querySelector(`#${id}`)

const app = $('app')
const colors = $('colors')
const gradients = $('gradients')
const modalBack = $('colorModalBack')
const modal = $('colorModal')
const modalTitle = $('colorModalTitle')
const modalColor = $('colorModalColor')
const modalText = $('colorModalText')
const modalButton = $('colorModalClose')
const txtSeed = $('txtSeed')
const btnRandom = $('btnRandom')
const txtColorOrCode = $('txtColorOrCode')
const txtColorOrCodeSuper = $('txtColorOrCodeSuper')
const btnRun = $('btnRun')
const consoleCode = $('consoleConsole')
const consoleResult = $('result')

const element = (name, classList) => {const el=document.createElement(name);el.classList.add(classList);return el}

const div = (classList) => element('div',classList)
const h1 = (classList) => element('h1', classList)
const h2 = (classList) => element('h2', classList)
const h3 = (classList) => element('h3', classList)
const text = (classList) => element('span', classList)

const entries = (object) => Object.entries(object)

const isBadKey = (key) => {
    const badKeys = ['__esModule','default']
    return badKeys.includes(key)
}

const linearGradient = (colorArray) => `linear-gradient(135deg, ${colorArray.join()})`

const openModal = (text, superC, isGradient) => {
    const isColor = isGradient ? false : true

    const borderColor = isColor ? superC.text : superC.averageColor.text

    app.classList.add('blur')

    modal.style.background = isColor ? superC.code : linearGradient(superC.codes)
    modal.style.borderColor = borderColor

    modalTitle.innerHTML = text
    modalTitle.style.color = borderColor

    modalColor.innerHTML = isColor ? superC.code : superC.codes
    modalColor.style.color = borderColor

    modalText.style.color = borderColor

    modalButton.style.color = borderColor
    modalButton.style.borderColor = borderColor
    modalButton.onclick = closeModal

    modalBack.classList.remove('d-none')
}

const closeModal = () => {
    modalBack.classList.add('d-none')
    app.classList.remove('blur')
}

const paint = (element, text, superC, isGradient) => {
    const isColor = isGradient ? false : true
    
    element.style.background = isColor ? superC.code : linearGradient(superC.codes)
    element.onclick = () => {
        openModal(text, superC, isGradient)
    }
}

const createContent = () => {
    try{
        if(typeof jebcolors === 'undefined'){
            const _h2_ = h2()
            _h2_.innerHTML = 'No se encontró window.jebcolors, ¿segur@ que existe bundle.js?'
            colors.append(_h2_)
            return
        }

        modalBack.onclick = () => {
            closeModal()
        }
        
        modal.onclick = (e) => {
            e.stopPropagation()
        }

        // eslint-disable-next-line no-undef
        const allColors = jebcolors.colors
        // eslint-disable-next-line no-undef
        const { supercolor, supergradient, Color, Gradient, megacolor } = jebcolors.superclasses

        entries(allColors).forEach(entry => {
            const [colorGroupName, colorGroup] = entry
            
            if(isBadKey(colorGroupName)) return

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_and_total_ = div('flex')
            const _name_h2_ = h2()
            const _total_h3_ = h3()

            _name_h2_.innerHTML = colorGroupName
            _total_h3_.innerHTML = `${Object.keys(colorGroup).length} colors`
            _name_and_total_.append(_name_h2_, _total_h3_)
            _main_div_.append(_name_and_total_)

            entries(colorGroup).forEach(entry => {
                const [colorName, color] = entry
                const superC = supercolor(color)

                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = `${colorName}`
                _name_white_.innerHTML = `${colorName}`

                _color_div_.append(_name_black_,_name_white_)

                paint(_color_div_,colorName, superC, false)                

                _container_div_.append(_color_div_)
            })

            _main_div_.append(_container_div_)
            colors.append(_main_div_)
        })

        // eslint-disable-next-line no-undef
        const allGradients = jebcolors.gradients

        entries(allGradients).forEach(entry => {
            const [gradientGroupName, gradientGroup] = entry

            if(isBadKey(gradientGroupName)) return

            const _main_div_ = div()
            const _container_div_ = div('grid')
            const _name_and_total_ = div('flex')
            const _name_h2_ = h2()
            const _total_h3_ = h3()

            _name_h2_.innerHTML = gradientGroupName
            _total_h3_.innerHTML = `${Object.keys(gradientGroup).length} gradients`
            _name_and_total_.append(_name_h2_, _total_h3_)
            _main_div_.append(_name_and_total_)

            entries(gradientGroup).forEach(entry => {
                const [gradientName, gradient] = entry
                const superG = supergradient(gradient)

                const _color_div_ = div('box')
                const _name_black_ = text()
                const _name_white_ = text('white')

                _name_black_.innerHTML = gradientName
                _name_white_.innerHTML = gradientName

                _color_div_.append(_name_black_,_name_white_)
                
                paint(_color_div_,gradientName, superG, true)

                _container_div_.append(_color_div_)
            })

            _main_div_.append(_container_div_)
            gradients.append(_main_div_)
        })  

        // Create randoms

        const changeSeeded = (e) => {
            const seededColor = $('seededColor')
            const seededGradient = $('seededGradient')

            const seed = e?.target?.value ?? ''
            const supercolor = Color.seed(seed)
            const supergradient = Gradient.seed(seed)

            paint(seededColor,`Seeded Color: ${seed}`, supercolor)
            paint(seededGradient,`Seeded Gradient: ${seed}`, supergradient, true)
        }

        const changeRandom = () => {
            const randomColor = $('randomColor')
            const randomGradient = $('randomGradient')

            const supercolor = Color.random()
            const supergradient = Gradient.random()

            paint(randomColor,'Random Color', supercolor)
            paint(randomGradient,'Random Gradient', supergradient, true)
        }
        
        txtSeed.addEventListener('input',changeSeeded)
        btnRandom.addEventListener('click',changeRandom)
        changeSeeded()
        changeRandom()

        // Create supercolors
        const updateSuperColors = (e) => {
            const colorOrCode = e?.target?.value ?? 'red'
            if(Color.test(colorOrCode).valid){
                const superC = supercolor(colorOrCode)

                const sColor = $('sColor')
                const sAlpha = $('sAlpha')
                const sSatPlus = $('sSatPlus')
                const sSatMinus = $('sSatMinus')
                const sLigPlus = $('sLigPlus')
                const sLigMinus = $('sLigMinus')
                const sRot = $('sRot')
                const sCompl = $('sCompl')
                const sNext = $('sNext')
                const sPrev = $('sPrev')
                const sNegative = $('sNegative')
                const sGrayscale = $('sGray')

                paint(sColor,'Color', superC)
                paint(sAlpha,'50% Transparent', {...superC, code: superC.alpha(50)})
                paint(sSatPlus, 'Saturated 1.5', superC.saturate(1.5))
                paint(sSatMinus, 'Desaturated 1.5', superC.desaturate(1.5))
                paint(sLigPlus,'Disabled', superC.disabled)
                paint(sLigMinus, 'Hover', superC.hover)
                paint(sRot, 'Half-Complementary', superC.rotate(90))
                paint(sCompl, 'Complementary', superC.complementary)
                paint(sNext, 'Next', superC.next(1))
                paint(sPrev, 'Previous', superC.previous(1))
                paint(sNegative, 'Negative', superC.negative)
                paint(sGrayscale, 'Grayscale', superC.grayscale)
            }
        }
        txtColorOrCodeSuper.addEventListener('input',updateSuperColors)
        updateSuperColors()

        // Create gradients
        const updateGradients = (e) => {
            const colorOrCode = e?.target?.value ?? 'red'
            if(Color.test(colorOrCode).valid){
                const megaC = megacolor(colorOrCode)

                const gColor = $('gColor')
                const gAnalogous = $('gAnalogous')
                const gComplementary = $('gComplementary')
                const gDarker = $('gDarker')
                const gLighter = $('gLighter')
                const gMonocromatic = $('gMonocromatic')
                const gNegative = $('gNegative')
                const gSplit = $('gSplit')
                const gTriadic = $('gTriadic')

                paint(gColor, 'Pure Colour', megaC)
                paint(gAnalogous, 'Analogous', megaC.gradientWithAnalogous, true)
                paint(gComplementary,'Complementary', megaC.gradientWithComplementary, true)
                paint(gDarker,'Darker', megaC.gradientWithDarker, true)
                paint(gLighter,'Lighter', megaC.gradientWithLighter, true)
                paint(gMonocromatic,'Monocromatic', megaC.gradientWithMonocromatic, true)                
                paint(gNegative,'Negative', megaC.gradientWithNegative, true)
                paint(gSplit,'Split Complementary', megaC.gradientWithSplitComplementary, true)
                paint(gTriadic,'Triadic', megaC.gradientWithTriadic, true)
            }
        }
        txtColorOrCode.addEventListener('input',updateGradients)
        updateGradients()

        btnRun.addEventListener('click',()=>{
            try{
                // eslint-disable-next-line no-undef
                const {Color, Gradient, supercolor, megacolor, supergradient, upgradecolor} = jebcolors.superclasses
                // eslint-disable-next-line no-undef
                const {colors, gradients} = jebcolors

                const lines = consoleCode.value.split('\n')
                consoleResult.innerHTML = ""

                const result = eval(lines.join(';'))
                consoleResult.innerHTML += result === undefined ? '' : `<div>${result}</div>`
            }
            catch(err){
                consoleResult.innerHTML = err
            }
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