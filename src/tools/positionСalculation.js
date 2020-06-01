/**
 * calculating position of beard and moustache
 * @param {object} measure - coef
 * @param args
 * @param {Array<{x:number, y:number}>} args.nose - nose coordinates
 * @param {Array<{x:number, y:number}>} args.lipsUp - up lips coordinates
 * @param {Array<{x:number, y:number}>} args.lipsDown - down lips coordinates
 * @param {Array<{x:number, y:number}>} args.oval - face border
 * @returns {{beard: *,
 * moustache: {width: number, x: number, angle: number, y: number, height: number}}}
 */
const position = (measure ,{nose, lipsUp, lipsDown, oval})=>{
    /**
     * moustache position calculating
     * @returns {{width: number, x: number, angle: number, y: number, height: number}}
     */
    const getMoustachePos = () => {
        let rel = Math.abs(oval[15].x - nose[4].x) / Math.abs(oval[1].x - nose[0].x)
        let angle = Math.atan(
            (lipsUp[6].y - lipsUp[0].y)/(lipsUp[6].x - lipsUp[0].x) +
            (nose[4].y - nose[0].y)/(nose[4].x - nose[0].x)/2)

        const getWidth = () =>{
            let width_mul_coefficient = 1.3;
            return width_mul_coefficient * measure * Math.sqrt(
                Math.max(
                    4*(lipsUp[3].x - lipsUp[0].x)*(lipsUp[3].x - lipsUp[0].x)+4*(lipsUp[3].y - lipsUp[0].y)*(lipsUp[3].y - lipsUp[0].y),
                    4*(lipsUp[6].x - lipsUp[3].x)*(lipsUp[6].x - lipsUp[3].x)+4*(lipsUp[6].y - lipsUp[3].y)*(lipsUp[6].y - lipsUp[3].y)
                )
            );
        };

        const getHeight = () => {
            let height_mul_coefficient = 3.5;
            return height_mul_coefficient * measure * Math.sqrt(
                Math.max((lipsUp[3].y - nose[2].y)*(lipsUp[3].y - nose[2].y) + (lipsUp[3].x - nose[2].x)*(lipsUp[3].x - nose[2].x))
            );
        };

        let width = getWidth();
        let height = getHeight()

        const getX = () => {
            let x_height_add_coefficient = 0
            let x_width_add_coefficient = 0
            // full face
            if (rel < 2  && rel > 0.5){
                if (angle > 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }
                else if (angle < 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }
                return measure * ((nose[2].x))
                    - width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
            // face turned left
            else if (rel >= 2){
                if (angle > 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }
                else if (angle < 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }

                return measure * ((nose[2].x))
                    - width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
            // face turned right
            else if (rel <= 0.5){
                if (angle > 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = -0.5
                }
                else if (angle < 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = -0.5
                }

                return measure * ((nose[2].x))
                    + width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
        }

        const getY = () => {
            let y_height_add_coefficient = 0
            let y_width_add_coefficient = 0
            // full face
            if (rel < 2  && rel > 0.5){
                if (angle > 0){
                    y_height_add_coefficient = 0.15
                    y_width_add_coefficient = 0.5
                }
                else if (angle < 0){
                    y_height_add_coefficient = 0.05
                    y_width_add_coefficient = 0.5
                }

                return measure * ((nose[2].y + lipsUp[3].y)/2)
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
            // face turned left
            else if (rel >= 2){
                if (angle > 0){
                    y_height_add_coefficient = 0.2
                    y_width_add_coefficient = 0.3
                }
                else if (angle < 0){
                    y_height_add_coefficient = 0.2
                    y_width_add_coefficient = 0.6
                }

                return measure * ((nose[2].y + lipsUp[3].y)/2)
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
            // face turned right
            else if (rel <= 0.5){
                let y_height_add_coefficient
                let y_width_add_coefficient
                if (angle > 0){
                    y_height_add_coefficient = 0.25
                    y_width_add_coefficient = 0.25
                }
                else if (angle < 0){
                    y_height_add_coefficient = -0.09
                    y_width_add_coefficient = 0
                }

                return measure *((nose[2].y + lipsUp[3].y)/2)
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
        }

        return {
            angle: angle*(180/Math.PI),
            width: width,
            height: height,
            y: getY(),
            x: getX()
        }
    }

    /**
     * beard position calculating
     * @returns {{width: number, x: number, angle: number, y: number, height: number}}
     */
    const getBeardPos = ()=>{
        let rel = Math.abs(oval[15].x - nose[4].x) / Math.abs(oval[1].x - nose[0].x)
        let angle = Math.atan((
            (lipsDown[0].y - lipsDown[6].y)/(lipsDown[0].x - lipsDown[6].x)
            + (oval[7].y - oval[9].y)/(oval[7].x - oval[9].x)
            + (oval[15].y - oval[1].y)/(oval[15].x - oval[1].x)
            + (oval[14].y - oval[2].y)/(oval[14].x - oval[2].x)
            + (oval[13].y - oval[3].y)/(oval[13].x - oval[3].x)
        )/5)

        const getHeight = () => {
            if (rel < 2 && rel > 0.5){
                let height_mul_coefficient = 6
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
            else if (rel >= 2){
                let height_mul_coefficient = 6
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
            else if (rel <= 0.5){
                let height_mul_coefficient = 6
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
        }

        const getWidth = () => {
            console.log((oval[15].x - oval[1].x)/(oval[9].x - oval[7].x))
            if (rel < 2 && rel > 0.5){
                let width_mul_coefficient = 3.1
                return width_mul_coefficient * measure*(oval[9].x - oval[7].x)
            }
            else if (rel >= 2){
                let width_mul_coefficient = 2.9
                return width_mul_coefficient * measure*(oval[9].x - oval[7].x)
            }
            else if (rel <= 0.5){
                let width_mul_coefficient = 2.9
                return width_mul_coefficient * measure*(oval[9].x - oval[7].x)
            }
        }

        let width = getWidth()
        let height = getHeight()

        const getY = () => {
            let y_height_add_coefficient
            let y_width_add_coefficient
            //full face
            if (rel < 2 && rel > 0.5){
                if (angle > 0){
                    y_height_add_coefficient = 0.19
                    y_width_add_coefficient = 0.5
                }
                else if (angle < 0){

                    y_height_add_coefficient = 0.15
                    y_width_add_coefficient = 0.5
                }
                return measure*(oval[7].y + oval[8].y + oval[9].y)/3
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
            //turn left
            else if (rel >= 2){

                if (angle > 0){
                    y_height_add_coefficient = 0.1
                    y_width_add_coefficient = 0.3
                }
                else if (angle < 0){
                    y_height_add_coefficient = 0.15
                    y_width_add_coefficient = 0.3
                }

                return measure * oval[7].y
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
            //turn right
            else if (rel <= 0.5){
                if (angle > 0){
                    y_height_add_coefficient = 0.25
                    y_width_add_coefficient = -0.2
                }
                else if (angle < 0){
                    y_height_add_coefficient = 0
                    y_width_add_coefficient = -0.3
                }

                return measure * oval[9].y
                    - height * Math.cos(angle) * y_height_add_coefficient
                    - width * Math.sin(angle) * y_width_add_coefficient
            }
        }

        const getX = ()=> {
            let x_height_add_coefficient
            let x_width_add_coefficient
            //full face
            if (rel < 2 && rel > 0.5){
                if (angle > 0){
                    x_height_add_coefficient = 0.2
                    x_width_add_coefficient = 0.5
                }
                else if (angle < 0) {
                    x_height_add_coefficient = 0.4
                    x_width_add_coefficient = 0.5
                }
                return measure*oval[8].x
                    - width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
            //turn left
            else if (rel >= 2){
                if (angle > 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }
                else if (angle < 0) {
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.4
                }
                return measure*oval[7].x
                    - width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
            //turn right
            else if (rel <= 0.5){

                if (angle > 0){
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.5
                }
                else if (angle < 0) {
                    x_height_add_coefficient = 0
                    x_width_add_coefficient = 0.57
                }
                return measure*oval[8].x
                    - width * Math.cos(angle) * x_width_add_coefficient
                    + height * Math.sin(angle) * x_height_add_coefficient
            }
        }

        let y = getY()
        let x = getX()
        return {
            angle: angle*(180/Math.PI),
            width: width,
            height: height,
            y: y,
            x: x
        }
    }

    return ({
        moustache:getMoustachePos(),
        beard: getBeardPos()
    })
}


export default position
