import React from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';

const ResultCompose = ({ImageURl, mustacheUrl, nose, lips})=>{
    const [image1]=useImage(ImageURl);
    const [image2]=useImage(mustacheUrl);
    return (
        <div>
            {!!image1 ?
                <Stage width={image1.width} height={image1.height}>
                    <Layer>
                        <Image image={image1}/>
                        {!!nose && !!lips ? <Image image={image2}
                                                   height={(lips[0].y - nose[0].y)}
                                                   y={nose[1].y}
                                                   width={(lips[6].x - lips[0].x)*1.5}
                                                   x={lips[3].x -(lips[6].x - lips[0].x)*0.75}/> : null}
                    </Layer>
                </Stage>
                : null
            }
        </div>
    );
};
export default ResultCompose;
