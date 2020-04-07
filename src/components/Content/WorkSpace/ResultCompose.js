import React, {useEffect, useState, useLayoutEffect} from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';


const ResultCompose = ({ImageURl, mustacheUrl, nose, lips})=>{
    const [image1]=useImage(ImageURl);
    const [image2]=useImage(mustacheUrl);

    //to adjust image size under stage
    const [measure, setMeasure]=useState(1);

    //for 'drag and drop' and 'zoom' features
    const [scale, setScale]=useState(1);
    const [stageX, setStageX]=useState(0);
    const [stageY, setStageY]=useState(0);

    //for mustache positioning
    const [moustacheX, setMoustacheX]=useState(0);
    const [moustacheY, setMoustacheY]=useState(0);
    const [moustacheHeight, setMoustacheHeight]=useState(10);
    const [moustacheWidth, setMoustacheWidth]=useState(10);
    const [mAngle, setMAngle]=useState(0);

    //to adapt to screen width
    const [stageSize, setStageSize]=useState(600);

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

    const dragStart = ()=> {};

    const dragEnd = e => {
        setStageX(e.target.x());
        setStageY(e.target.y());
    };

    useEffect(()=>{
        const get_coefficient = (img) =>{
            if (!img) return 1;
            return stageSize/(img.height > img.width ? img.height : img.width);
        };
        setMeasure(get_coefficient(image1));
    },[image1, stageSize]);

    useEffect(()=>{
        if (!!lips && !!nose) {
            setMoustacheHeight(measure * (lips[0].y - nose[0].y));
            setMoustacheWidth(measure * (lips[6].x - lips[0].x) * 1.5);
            setMoustacheY(measure * (3*(nose[0].y+ 1.5*nose[1].y + nose[2].y + 1.5*nose[3].y+ nose[4].y)+
                (lips[2].y+lips[3].y))/20);
            setMoustacheX(measure * ((3*(nose[0].x+ nose[1].x + 2*nose[2].x + nose[3].x+ nose[4].x)+
                (lips[2].x+lips[3].x))/20 -
                (lips[6].x - lips[0].x) * 0.75));
            setMAngle((180/Math.PI)*
                Math.atan(((lips[6].y - lips[0].y)/(lips[6].x - lips[0].x) + (nose[4].y - nose[0].y)/(nose[4].x - nose[0].x))/2)
            );
        }
    },[lips, nose, measure]);


    useLayoutEffect(()=>{
        const controlWidth = w =>{
            if (w<600){
                console.log(w)
                setStageSize(w);
            }
        };
        console.log('add')
        window.addEventListener('resize', () => controlWidth(window.innerWidth));
        controlWidth(window.innerWidth);
        return () => window.addEventListener('resize', () => controlWidth(window.innerWidth));
    },[]);

    return (
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
            {!!image1 ?
                <Layer>
                    <Image
                        image={image1}
                        height={image1.height*measure}
                        width={image1.width*measure}
                    />
                    {!!nose && !!lips ?
                        <Image image={image2}
                               height={moustacheHeight}
                               width={moustacheWidth}
                               y={moustacheY}
                               x={moustacheX}
                               rotation={mAngle}
                        />
                        : null
                    }
                </Layer>
                : null}
        </Stage>
    );
};
export default ResultCompose;
