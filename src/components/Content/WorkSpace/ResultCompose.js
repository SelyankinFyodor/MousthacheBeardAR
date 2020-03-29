import React, {useEffect, useState} from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';

const ResultCompose = ({ImageURl, mustacheUrl, nose, lips})=>{
    const [image1]=useImage(ImageURl);
    const [image2]=useImage(mustacheUrl);
    const [scale, setScale]=useState(1);
    const [stageX, setStageX]=useState(0);
    const [stageY, setStageY]=useState(0);
    const [measure, setMeasure]=useState(1);

    const handleWheel = e => {
        e.evt.preventDefault();
        const scaleBy = 0.99;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });
        setScale(newScale);
        setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
        setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
    };

    const dragStart = ()=> {
        // setDragging(true)
    };

    const dragEnd = e => {
        // setDragging(false);
        setStageX(e.target.x());
        setStageY(e.target.y());
    };

    const stageSize = 800;

    useEffect(
        ()=>{
            const get_coefficient = (img) =>{
                if (!img) return 1;
                return stageSize/(img.height > img.width ? img.height : img.width);
            };
            setMeasure(get_coefficient(image1));
        },[image1]
    );

    return (
        <div>
            {!!image1 ?
                <Stage
                    width={stageSize}
                    height={stageSize}
                    onWheel={handleWheel}
                    draggable
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}
                    scaleX={scale}
                    scaleY={scale}
                    x={stageX}
                    y={stageY}
                >
                    <Layer>
                        <Image
                            image={image1}
                            height={image1.height*measure}
                            width={image1.width*measure}
                        />
                        {!!nose && !!lips ?
                            <Image image={image2}
                                   height={measure*(lips[0].y - nose[0].y)}
                                   y={measure*nose[1].y}
                                   width={measure*(lips[6].x - lips[0].x)*1.5}
                                   x={measure*(lips[3].x -(lips[6].x - lips[0].x)*0.75)}/>
                                   : null}
                    </Layer>
                </Stage>
                : null
            }
        </div>
    );
};
export default ResultCompose;
