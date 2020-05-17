/**
 *
 * @param measure
 * @param nose
 * @param lipsUp
 * @param lipsDown
 * @param oval
 * @returns {{beard: *,
 * moustache: {width: number, x: number, angle: number, y: number, height: number}}}
 */
export default (measure ,{nose, lipsUp, lipsDown, oval})=>{
    /**
     * moustache position calculating
     * @returns {{width: number, x: number, angle: number, y: number, height: number}}
     */
    const getMoustachePos = () => {
        let height_mul_coefficient = 4;
        let width_mul_coefficient = 1.5;
        let y_height_add_coefficient = 0.2
        let angle = Math.atan((lipsUp[6].y - lipsUp[0].y)/(lipsUp[6].x - lipsUp[0].x) + (nose[4].y - nose[0].y)/(nose[4].x - nose[0].x)/2)
        let width = width_mul_coefficient * measure * Math.sqrt(
            (lipsUp[6].x - lipsUp[0].x)*(lipsUp[6].x - lipsUp[0].x)+(lipsUp[6].y - lipsUp[0].y)*(lipsUp[6].y - lipsUp[0].y))
        let height =height_mul_coefficient * measure * Math.sqrt(
            (lipsUp[3].y - nose[2].y)*(lipsUp[3].y - nose[2].y) + (lipsUp[3].x - nose[2].x)*(lipsUp[3].x - nose[2].x))
        let y = measure * ((nose.reduce((sum, cur)=>{return sum + cur.y}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.y}, 0))/12)
            - height/2 * Math.cos(angle) * y_height_add_coefficient
            - width/2 * Math.sin(angle)
        let x = measure * ((nose.reduce((sum, cur)=>{return sum + cur.x}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.x}, 0))/12)
            - width/2 * Math.cos(angle)
            + height/2 * Math.sin(angle)
        return {
            angle: angle,
            width: width,
            height: height,
            y: y,
            x: x
        }
    }

    // beard position calculating
    const getBeardPos = ()=>{}

    return ({
        moustache:getMoustachePos(),
        beard: getBeardPos()
    })
}


