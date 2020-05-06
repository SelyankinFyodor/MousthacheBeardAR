import React, {useEffect, useState, useLayoutEffect} from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';
import PropTypes from 'prop-types';

/**
 * inserts facial hair onto the face using the provided coordinates of the nose and upper lip
 *
 * @param {Object} args - destructing object
 * @param {string} args.ImageURl - path for Face preset image
 * @param {string} args.mustacheUrl - path for Moustache image
 * @param {Array<number, number>} args.nose - array of nose coordinates
 * @param {Array<number, number>} args.lips - array of upper lip coordinates
 * @returns {jsx}
 * @constructor
 */
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

    const dragStart = () => {};

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
            let angle = Math.atan(
                ((lips[6].y - lips[0].y)/(lips[6].x - lips[0].x) + (nose[4].y - nose[0].y)/(nose[4].x - nose[0].x))/2);
            let mWidth= measure * Math.sqrt(
                (lips[6].x - lips[0].x)*(lips[6].x - lips[0].x)+(lips[6].y - lips[0].y)*(lips[6].y - lips[0].y)) * 1.5;
            let mHeight = measure * Math.sqrt(
                (lips[3].y - nose[2].y)*(lips[3].y - nose[2].y) + (lips[3].x - nose[2].x)*(lips[3].x - nose[2].x));

            setMoustacheY(measure * ((nose.reduce((sum, cur)=>{return sum + cur.y}, 0) +
                lips.reduce((sum, cur)=>{return sum + cur.y}, 0))/12) - mHeight/2 * Math.cos(angle) - mWidth/2 * Math.sin(angle));
            setMoustacheX(measure * ((nose.reduce((sum, cur)=>{return sum + cur.x}, 0) +
                lips.reduce((sum, cur)=>{return sum + cur.x}, 0))/12) - mWidth/2 * Math.cos(angle) + mHeight/2 * Math.sin(angle));
            setMAngle((180/Math.PI)*angle);
            setMoustacheHeight(mWidth);
            setMoustacheWidth(mWidth);
        }
    },[lips, nose, measure]);

    useLayoutEffect(()=>{
        const controlWidth = w =>{if (w<600){ setStageSize(w); }};
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
            {image1 ?
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

ResultCompose.propTypes = {
    ImageURl: PropTypes.string,
    mustacheUrl: PropTypes.string,
    nose: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })),
    lips: PropTypes.array
}

export default ResultCompose;
