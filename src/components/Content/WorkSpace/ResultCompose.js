import React, {useEffect, useState, useLayoutEffect} from 'react'
import {Image, Layer, Stage} from 'react-konva';
import useImage from 'use-image';
import PropTypes from 'prop-types';
import position from './positionСalculation'
import useWidth from "../../../tools/useWidth";

/**
 *
 * * inserts facial hair onto the face using the provided coordinates of the nose and upper lip
 *
 * @param {Object} args - destructing object
 * @param {string} args.ImageURl - path for Face preset image
 * @param {string} args.MoustacheUrl - path for Moustache image
 * @param {string} args.BeardsUrl - path for Beard image
 * @returns {jsx}
 * @constructor
 */
const ResultCompose = ({ImageURl, MoustacheUrl,BeardsUrl, coords})=>{
    const [face]=useImage(ImageURl);
    const [moustache]=useImage(MoustacheUrl);
    const [beard]=useImage(BeardsUrl);
    const width=useWidth();

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

    const calculateInitWidth = () => {
        if (width.width < 1000) {
            return width.width
        }
        else return 1000
    }

    //to adapt to screen width
    const [stageSize, setStageSize]=useState(calculateInitWidth());

    const get_coefficient = (img) =>{
        if (!img) return 1;
        return stageSize/(img.height > img.width ? img.height : img.width);
    };
    //to adjust image size under stage
    const [measure, setMeasure]=useState(get_coefficient(face));

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
        setMeasure(get_coefficient(face));
    },[face, stageSize]);

    useEffect(()=>{
        if (800 > (width.width /2)){
            console.log('gbplf')
            console.log(width.width / 2)
            setStageSize(width.width / 2)
        }

        else{
            setStageSize(1000)
        }
    }, [width])


    const validateCoords = (coord)=>{
        if (!!coord &&
            !!coord.lipsUp && coord.lipsUp.length !== 0 &&
            !!coord.lipsDown && coord.lipsDown.length !== 0 &&
            !!coord.nose && coord.nose.length !== 0 &&
            !!coord.oval && coord.oval.length !== 0)
            return true
    }
    useEffect(()=>{
        if (validateCoords(coords)) {
            console.log(coords)
            // const layout = position(measure, {nose:nose, lipsUp:lips})
            const layout = position(measure, coords)
            setMoustacheY(layout.moustache.y);
            setMoustacheX(layout.moustache.x);
            setMAngle((180/Math.PI)*layout.moustache.angle);
            setMoustacheHeight(layout.moustache.height);
            setMoustacheWidth(layout.moustache.width);
        }
    },[coords, measure]);

    // useLayoutEffect(()=>{
    //     const controlWidth = w =>{if (w<600){ setStageSize(w); }};
    //     window.addEventListener('resize', () => controlWidth(window.innerWidth));
    //     controlWidth(window.innerWidth);
    //     return () => window.addEventListener('resize', () => controlWidth(window.innerWidth));
    // },[]);

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
            {face ?
                <Layer>
                    <Image
                        image={face}
                        height={face.height*measure}
                        width={face.width*measure}
                    />
                    {validateCoords(coords) ?
                        <Image image={moustache}
                               height={moustacheHeight}
                               width={moustacheWidth}
                               y={moustacheY}
                               x={moustacheX}
                               rotation={mAngle}
                        />
                        : null
                    }
                    {validateCoords(coords) ?
                        <Image image={beard}
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
    MoustacheUrl: PropTypes.string,
    BeardsUrl: PropTypes.string,
    coords: PropTypes.object
}
//
// nose: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
//     oval: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
//     lipsDown: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
//     lipsUp: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
export default ResultCompose;
