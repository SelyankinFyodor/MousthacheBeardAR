import React, {useEffect, useState} from 'react'
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
 * @param {{nose:Array<{x:number, y:number}>, lipsUp:Array<{x:number, y:number}>, lipsDown:Array<{x:number, y:number}>, oval:Array<{x:number, y:number}>}} args.coords - set of coords for calculate position
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

    //for moustache positioning
    const [moustachePos, setMoustachePos]= useState({
        height:0,
        width:0,
        x:0,
        y:0,
        angle:0
    })

    //for beard positioning
    const [beardPos, setBeardPos]= useState({
        height:0,
        width:0,
        x:0,
        y:0,
        angle:0
    })

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
            setMoustachePos(layout.moustache)
            setBeardPos(layout.beard)
        }
    },[coords, measure]);

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
                               height={moustachePos.height}
                               width={moustachePos.width}
                               y={moustachePos.y}
                               x={moustachePos.x}
                               rotation={moustachePos.angle}
                        />
                        : null
                    }
                    {validateCoords(coords) ?
                        <Image image={beard}
                               height={beardPos.height}
                               width={beardPos.width}
                               y={beardPos.y}
                               x={beardPos.x}
                               rotation={beardPos.angle}
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
export default ResultCompose;
