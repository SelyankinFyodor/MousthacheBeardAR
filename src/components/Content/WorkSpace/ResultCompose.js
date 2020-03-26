import React from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';

const ResultCompose = ({ImageURl, mustacheUrl, nose, lips})=>{
    const [image1]=useImage(ImageURl);
    const [image2]=useImage(mustacheUrl.png);
    
    var m_angle, m_height, m_width, new_width, new_height, m_x, m_y;

    if (!!image2) {
        m_width = image2.width;
        m_height = image2.height;
    }
    
    m_angle = 0;
    new_width = m_width;
    new_height = m_height;
    if (!!lips && !!nose) {
        console.log("start calculate moustache position");
        // angle
        m_angle = Math.atan((lips[6].y - lips[0].y) / (lips[6].x - lips[0].x));
        m_angle = (m_angle) * 180 / 3.14;


        // width
        new_width = (m_width * (lips[6].x - lips[0].x) / 
                        (m_width * Number(mustacheUrl.config["default"]["3_x"]) - 
                            m_width * Number(mustacheUrl.config["default"]["1_x"])
                        )
                    );
        // height
        new_height = (m_height * (lips[6].y - nose[3].y) / 
                        (m_height * Number(mustacheUrl.config["default"]["3_y"]))
                     );
        // x
        m_x = lips[3].x + (new_width / 2) * Math.cos(m_angle) - (new_height * mustacheUrl.config["default"]["2_y"]) * Math.sin(m_angle);

        // y
        m_y = lips[3].y + (new_width / 2) * Math.sin(m_angle) + (new_height * mustacheUrl.config["default"]["2_y"]) * Math.cos(m_angle);

        console.log("angle", m_angle);
        console.log("m_width", m_width);
        console.log("m_height", m_height);

        console.log("lips[3].y", lips[3].y);
        console.log("nose[1].y", nose[1].y);
        console.log("m_y", m_y);
        console.log("prev_Y", nose[1].y);
        console.log("(m_width / 2) * Math.sin(m_angle)", (m_width / 2) * Math.sin(m_angle));
        console.log("(m_height * mustacheUrl.config * Math.cos(m_angle)", (m_height * mustacheUrl.config["default"]["2_y"]) * Math.cos(m_angle));
        
        console.log("lips[3].x", lips[3].x);
        console.log("nose[1].x", nose[1].x);
        console.log("m_x", m_x);
        console.log("(m_width / 2) * Math.cos(m_angle)", (m_width / 2) * Math.cos(m_angle));
        console.log("(m_height * mustacheUrl.config * Math.cos(m_angle)", (m_height * mustacheUrl.config["default"]["2_y"]) * Math.sin(m_angle));
        console.log("prev_X", lips[3].x -(lips[6].x - lips[0].x)*0.75);
        

    }
    
    return (
        <div>
            {!!image1 ?
                <Stage width={image1.width} height={image1.height}>
                    <Layer>
                        <Image image={image1}/>
                        {!!nose && !!lips ? <Image image={image2}
                                                   height={new_height}
                                                   y={m_y}
                                                   rotation={m_angle}
                                                   width={new_width}
                                                   x={m_x}/> : null}
                    </Layer>
                </Stage>
                : null
            }
        </div>
    );
};
export default ResultCompose;
