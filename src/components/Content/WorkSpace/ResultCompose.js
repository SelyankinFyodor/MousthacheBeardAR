import React from 'react'
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const ResultCompose = ({ImageURl, mustacheUrl, nose, lips})=>{
    const [image1]=useImage(ImageURl);
    const [image2]=useImage(mustacheUrl);
    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Image image={image1}/>
                    {!!nose && !!lips ? <Image image={image2}
                                               height={lips[0].y - nose[0].y}
                                               y={nose[2].y}
                                               width={lips[6].x - lips[0].x}
                                               x={lips[3].x -(lips[6].x - lips[0].x) /2}/> : null}
                </Layer>
            </Stage>
        </div>
    );
};
export default ResultCompose;
