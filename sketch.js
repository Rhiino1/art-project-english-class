let angle = 0;
let maxD;

let creatingOff = -50
let boxW = 24
let movZ = 0

let noiseText;
let noiseVelocity;

let colorCheckbox;
let RemStrokeCheckbox;
let strokeWithColorsCheckbox;
let strokeCheckbox;

let randomMode;

function setup() {
    createCanvas(600, 600, WEBGL);
    ortho(-400, 400, 400, -400, -1000, 1000);
    endZ = height + creatingOff
    endX = width + creatingOff
    maxD = dist(0, 0, 200, 200);

    noiseText = createP()
    noiseText.style('color', 'white')
    noiseText.html('Change noise velocity')
    noiseVelocity = createSlider(5, 10, 5)

    colorCheckbox = createCheckbox('Moving colors', false);
    colorCheckbox.style('color', 'white')

    RemStrokeCheckbox = createCheckbox('Remove stroke', false);
    RemStrokeCheckbox.style('color', 'white')
    strokeWithColorsCheckbox = createCheckbox('Stroke with colors', false);
    strokeWithColorsCheckbox.style('color', 'white')
    strokeCheckbox = createCheckbox('Move alpha channel of stroke', false);
    strokeCheckbox.style('color', 'white')

    randomMode = createCheckbox('Sinusoidal mode', false);
    randomMode.style('color', 'white')
}

function draw() {
    background(100);
    rotateX(PI / 4)
    rotateY(PI / 3)


    if (randomMode.checked()) {
        for (let z = 0; z < height; z += boxW) {
            for (let x = 0; x < width; x += boxW) {
                push();
                let d = dist(x, z, width / 2, height / 2);
                let offset = map(d, 0, maxD, -PI, PI);
                let a = angle + offset;
                let h = floor(map(sin(a), -1, 1, 100, 300));

                let iColor = map(z, -creatingOff, endZ, 0, 255)
                let jColor = map(x, -creatingOff, endX, 0, 255)

                let alpha = 255
                if (colorCheckbox.checked()) {
                    alpha = map(mouseX, 0, width, 0, 255)
                }

                let r = iColor
                let g = abs((iColor + jColor) - 255)
                let b = jColor
                fill(r, g, b, alpha)

                let moveStroke = 1
                if (strokeCheckbox.checked()) {
                    moveStroke = map(mouseY, 0, height, 0, 1)
                }
                strokeWeight(moveStroke)

                if (strokeWithColorsCheckbox.checked()) {
                    stroke(r, g, b)
                } else {
                    stroke(1)
                }

                if (RemStrokeCheckbox.checked()) {
                    noStroke()
                }

                translate(x - width / 2, 0, z - height / 2);
                box(boxW, h, boxW);
                //rect(x - width / 2 + w / 2, 0, w - 2, h);
                pop();
            }
        }

        angle -= noiseVelocity.value() / 100;
    } else {
        let zoff = movZ
        for (let z = -creatingOff; z < endZ; z += boxW) {
            let xoff = 0
            for (let x = -creatingOff; x < endX; x += boxW) {
                push()



                let h = map(noise(xoff, zoff), 0, 1, 0, 300)

                let iColor = map(z, -creatingOff, endZ, 0, 255)
                let jColor = map(x, -creatingOff, endX, 0, 255)


                let moveStroke = 1
                if (strokeCheckbox.checked()) {
                    moveStroke = map(mouseY, 0, height, 0, 1)
                }
                strokeWeight(moveStroke)

                let alpha = 255
                if (colorCheckbox.checked()) {
                    alpha = map(mouseX, 0, width, 0, 255)
                }

                let r = iColor
                let g = abs((iColor + jColor) - 255)
                let b = jColor
                fill(r, g, b, alpha)

                if (strokeWithColorsCheckbox.checked()) {
                    stroke(r, g, b)
                } else {
                    stroke(1)
                }

                if (RemStrokeCheckbox.checked()) {
                    noStroke()
                }

                translate(x - width / 2, 0, z - height / 2);
                // normalMaterial();
                box(boxW, h, boxW)
                pop()

                xoff += 0.2
            }
            zoff += 0.2
        }
        movZ += noiseVelocity.value() / 1000;
    }

}