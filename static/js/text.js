
$( document ).ready(function() {
    $.getScript("/static/js/palette_extractor.min.js");
    const PALETTE_COLORS_COUNT = 7;
    const IMAGE_MAX_WIDTH = 400;

    // in deze blok moet ik aanpassingen doen om beter paltte te krijgen, bijvoorbeeld maar voor elk afegbakkend segment van het kleur spectrum een kleur kiezen
    const paletteElement = document.querySelector(".palette");
    console.log(document.querySelector(".palette")) /** dit maakt een ul class waarin het palette terecht komt */
    const paletteElements =  [];
    let i = 0;
    while (i < PALETTE_COLORS_COUNT) {
        const li = document.createElement('li');
        paletteElement.appendChild(li);
        paletteElements.push(li);
        i++;
        // deze maakt een array aan met een aantal indexen dat wordt vastgeled door PALETTE_COLORS_COUNT. Na deze while loop is er een paletteElements array = [li, li, li, li, li] als PALETTE_COLORS COUNT gelijk is aan 5.
    }

    const complementaryHSLElement = document.querySelector(".complementaryHSL");
    console.log(document.querySelector(".complementaryHSL"))
    const complementaryHSLElements = [];
    let b = 0;
    while (b < PALETTE_COLORS_COUNT) {
        const li = document.createElement('li');
        complementaryHSLElement.appendChild(li);
        complementaryHSLElements.push(li);
        b++;
    }

    //const soortCombo = document.querySelector('.soortCombo');
    //const soortCombos = [];
    //let s = 0;
    //while (s < PALETTE_COLORS_COUNT) {
        //const li = document.createElement('li');
        //soortCombo.appendChild(li);
        //soortCombos.push(li);
        //s++;
    //}




    // maakt een canvas aan in de browser waar de afbeelding in terecht zal komen
    const canvas = document.createElement('canvas');
    console.log(canvas)
    const canvasContext = canvas.getContext('2d');
    document.body.appendChild(canvas);
    console.log(canvasContext)

    // deze werkt samen met <image ...> op lijn 33. De haalt de afbeelding binnen in de js script
    const imageInput = document.getElementById("image-input");
    console.log(imageInput)
    console.log(PaletteExtractor)


    const paletteExtractor = new PaletteExtractor();
    console.log(paletteExtractor)

    let inputFileReader = null;
    let image = null;

    imageInput/**[m]*/.addEventListener("change", (event) => {
        // constant input bevat lijn 33
        const input = /** @type {!Element} */ (event.target);
        console.log(input)
        // variable aangemaakt buiten add EventListener
        readInputFile(
            input,
            (dataUrl) => {
                image = new Image();
                image.onload = () => {
                    if (image.width < 1 || image.height < 1) {
                    return [];
                    }  /** de nieuwe afbeelding wordt ingelladen*/

                    // de eigenschappen van de fabeelding
                    const drawableRatio = image.width / image.height;
                    image.width = Math.min(IMAGE_MAX_WIDTH, image.width); /** als de breedte van de afbeelding kleiner is dan de max width dan wordt image width gebruikt dmv de Math.min(functie*/
                    image.height = parseInt(image.width / drawableRatio, 10);
                    canvas.width = image.width;
                    canvas.height = image.height;
                    canvasContext.drawImage(image, 0, 0, image.width, image.height); /** print de afbeelding op het scherm */

                    // data is a one-dimentional array containing data in the RBBA order (red, green, blue, alpha)
                    const data =
                        canvasContext.getImageData(0, 0, image.width, image.height)
                            .data;
                    //console.log(data)


                    // hexPalette zet data om naar hex pallette. class paletteExtractor in palete_extractor.js. processImageData zit in class dus roept alleen dit deel op.
                    const hexPalette =
                        paletteExtractor.processImageData(data, PALETTE_COLORS_COUNT);
                    console.log(hexPalette)
                    //console.log(paletteExtractor.selectSeeds_(e=7))
                    //console.log(paletteExtractor.clusterColors_())
                    //console.log(paletteExtractor)
                    //console.log(paletteExtractor.weights_)
                    const showinconsole1 = paletteExtractor.labs_[2];
                    console.log(showinconsole1)
                    const showincosole2 = paletteExtractor.weights_[2];
                    console.log(showincosole2)

                    //const showinconsole = paletteExtractor.seeds_;
                    //console.log(showinconsole)
                    const e = paletteExtractor.getHeaviestIndex_(paletteExtractor.weights_)
                    console.log(e)


                    //const showinconsole3 = paletteExtractor.seeds_[2];
                    //console.log(showinconsole3)


                    /**const color1 = paletteExtractor.labToRgb(paletteExtractor.seeds_[0][0],paletteExtractor.seeds_[0][1],paletteExtractor.seeds_[0][2]);
                    console.log(color1)
                    const color2 = paletteExtractor.labToRgb(paletteExtractor.seeds_[1][0],paletteExtractor.seeds_[1][1],paletteExtractor.seeds_[1][2]);
                    console.log(color2)
                    const color3 = paletteExtractor.labToRgb(paletteExtractor.seeds_[2][0],paletteExtractor.seeds_[2][1],paletteExtractor.seeds_[2][2]);
                    console.log(color3)
                    const color4 = paletteExtractor.labToRgb(paletteExtractor.seeds_[3][0],paletteExtractor.seeds_[3][1],paletteExtractor.seeds_[3][2]);
                    console.log(color4)
                    const color5 = paletteExtractor.labToRgb(paletteExtractor.seeds_[4][0],paletteExtractor.seeds_[4][1],paletteExtractor.seeds_[4][2]);
                    console.log(color5)*/

                    console.log(paletteElements)


                    let index = 0;
                    for(const paletteColorElem of paletteElements){
                        paletteColorElem.style.backgroundColor = hexPalette[index];
                        console.log(paletteColorElem)

                        console.log(paletteColorElem.style.backgroundColor)
                        index++;
                    }
                    console.log(paletteElements)
                    console.log(hexPalette[0])
                    console.log(paletteElements[0])



                    console.log(complementaryHSLElements)
                    let index1 = 0;
                    function hexToRgb(hex) {
                        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(result[1], 16),
                            g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                        } : null;}



                    console.log(complementaryHSLElements)
                    for (const complementaryHSLElem of complementaryHSLElements) {
                        const originalColor = hexPalette[index1];
                        const colorRGB = hexToRgb(originalColor);
                        function rgbToHSL(r,g,b) {
                            r /= 255, g /= 255, b /= 255;
                            var max = Math.max(r, g, b), min = Math.min(r, g, b);
                            var h, s, l = (max + min) / 2;

                            if(max == min){
                                h = s = 0; // achromatic
                            }else{
                                var d = max - min;
                                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                switch(max){
                                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                                    case g: h = (b - r) / d + 2; break;
                                    case b: h = (r - g) / d + 4; break;
                                }
                                h /= 6;
                            }

                            return [h, s, l];
                        }
                        console.log(rgbToHSL(colorRGB.r, colorRGB.g, colorRGB.b))
                        console.log(rgbToHSL(colorRGB.r, colorRGB.g, colorRGB.b)[0])
                        const colorHSLh = rgbToHSL(colorRGB.r, colorRGB.g, colorRGB.b)[0];
                        if (colorHSLh == 0.5) {
                            complementaryHSLh = 0;
                        }else if (colorHSLh < 0.5) { // onder de 180°?
                            complementaryHSLh = colorHSLh + 0.5;
                        }else {
                            complementaryHSLh = colorHSLh - 0.5;
                        }
                        console.log(complementaryHSLh)
                        const complementaryHSLs = rgbToHSL(colorRGB.r, colorRGB.g, colorRGB.b)[1];
                        const complementaryHSLl =rgbToHSL(colorRGB.r, colorRGB.g, colorRGB.b)[2];
                        function hslToRgb(h, s, l){
                            var r, g, b;

                            if(s == 0){
                                r = g = b = l; // achromatic
                            }else{
                                var hue2rgb = function hue2rgb(p, q, t){
                                    if(t < 0) t += 1;
                                    if(t > 1) t -= 1;
                                    if(t < 1/6) return p + (q - p) * 6 * t;
                                    if(t < 1/2) return q;
                                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                                    return p;
                                }
                                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                                var p = 2 * l - q;
                                r = hue2rgb(p, q, h + 1/3);
                                console.log(r)
                                g = hue2rgb(p, q, h);
                                console.log(g)
                                b = hue2rgb(p, q, h - 1/3);
                                console.log(b)
                            }

                            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                        }
                        const complementaryColorRGB = hslToRgb(complementaryHSLh, complementaryHSLs, complementaryHSLl)
                        console.log(complementaryColorRGB)
                        const complementary1R = complementaryColorRGB[0], complementary1G = complementaryColorRGB[1], complementary1B = complementaryColorRGB[2];
                        const complementaryColor1 = paletteExtractor.rgbToHex(complementary1R, complementary1G, complementary1B);
                        const q = 16*(16*Math.floor(complementary1R/16) + Math.floor(complementary1G/16)) + Math.floor(complementary1B/16);
                        console.log(q)
                        console.log(paletteExtractor.weights_[q])



                        if (paletteExtractor.weights_[q] == 0 || q == 4095) {

                            complementaryHSLElem.style.backgroundColor = null;
                            //soortCombo[index1] = null;
                            //soortCombos[index1].innerHTML = soortCombo[index1];


                        } else {

                            if (complementary1B < 60 && complementary1G < 60 && complementary1R < 60) {
                                complementaryHSLElem.style.backgroundColor = null;
                            } else {
                                complementaryHSLElem.style.backgroundColor = complementaryColor1;

                                //if (1/6 < colorHSLh < 2/6 || 4/6 < colorHSLh < 5/6 ) {

                                    //soortCombo[index1] = "rood-indigo";
                                    //soortCombos[index1].innerHTML = soortCombo[index1];

                                    //console.log(soortCombos)
                                //} else if ( 2/6 < colorHSLh <3/6 || 5/6 < colorHSLh < 1 ) {
                                    //soortCombo[index1] = "groen-magenta";
                                    //soortCombos[index1].innerHTML = soortCombo[index1];
                                    //console.log(soortCombos)
                                //} else {
                                    //soortCombo[index1] = "geel-blauw";
                                    //soortCombos[index1].innerHTML = soortCombo[index1];
                                    //console.log(soortCombos)
                                //}
                            }


                            /** hier tussen een functie die het spectrum opdeeld in 3 delen.  1ste deel 30°-90° en 210°-270°. 2de deel 90°-150° en 270°-330°. 3de deel 330°-30° en 150°-210°. Deze getallen moet ik omzetten van [0°-360°] naar [0-1]*/
                        }


                        index1++;
                    }
                };
                image.src = dataUrl;
            },
            (error) => {
                console.log(error);
            });
            // To allow uploading the same image twice.
            input.value = null;
    //);
    //}).trigger("change");


    });
    // einde code coor omgaan met file
    //}());
    //}
    /**
      * Loads input files.
      * @param {!Element} inputNode
      * @param {!Function} callbackSuccess
      * @param {!Function} callbackError
      */
    const readInputFile = function(inputNode, callbackSuccess, callbackError) {
        if (inputFileReader) {
            inputFileReader.onload = null;
            inputFileReader.onerror = null;
            inputFileReader.abort();
            inputFileReader = null;
        }
        if (inputNode.files && inputNode.files[0]) {
            inputFileReader = new FileReader();
            inputFileReader.onload = function(event) {
                callbackSuccess(event.target.result);
            };
            inputFileReader.onerror = callbackError;
            inputFileReader.readAsDataURL(inputNode.files[0]);
        }
    };
});