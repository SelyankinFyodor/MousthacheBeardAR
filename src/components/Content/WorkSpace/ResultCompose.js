import React, {useCallback, useEffect, useState} from 'react'
import {Image, Layer, Stage, Rect} from 'react-konva';
import useImage from 'use-image';
import PropTypes from 'prop-types';
import position from '../../../tools/positionСalculation'
import useWidth from "../../../tools/useWidth";
import {EmptyPng} from '../../../imports'

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
const ResultCompose = ({ImageURl, MoustacheUrl, BeardsUrl, coords})=>{
    const debug_mode = false

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
        if (width.width/2 < 600) {
            return width.width
        }
        else return width.width/2
    }

    //to adapt to screen width
    const [stageSize, setStageSize]=useState(calculateInitWidth());

    const get_coefficient = useCallback((img, stage_size=stageSize) =>{
        if (!face) return 1;
        return stage_size/(face.height > face.width ? face.height : face.width);
    },[stageSize, face]);

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

    const validateCoords = useCallback(()=>{
        if (!!coords &&
            !!coords.lipsUp && coords.lipsUp.length !== 0 &&
            !!coords.lipsDown && coords.lipsDown.length !== 0 &&
            !!coords.nose && coords.nose.length !== 0 &&
            !!coords.oval && coords.oval.length !== 0)
            return true
    },[coords])

    useEffect(()=>{
        let newStageSize = 600 > (width.width) ? width.width - 20 : width.width/2 - 20;
        let newMeasure = get_coefficient(face, newStageSize);
        if (validateCoords()) {
            const layout = position(measure, coords)

            setMoustachePos(layout.moustache)
            setBeardPos(layout.beard)
        }
        else {
            setMoustachePos({
                height:0,
                width:0,
                x:0,
                y:0,
                angle:0
            })
            setBeardPos({
                height:0,
                width:0,
                x:0,
                y:0,
                angle:0
            })
        }
        setStageSize(newStageSize);
        setMeasure(newMeasure);
        setMeasure(get_coefficient(face));
        // eslint-disable-next-line
    }, [width, face])

    useEffect(()=>{
        if (validateCoords()) {
            const layout = position(measure, coords)
            setMoustachePos(layout.moustache)
            setBeardPos(layout.beard)
        }
        // eslint-disable-next-line
    },[coords, measure]);

    return (
        <div>
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
                        {(validateCoords() && BeardsUrl !== EmptyPng.beard)?
                            <Image image={beard}
                                   height={beardPos.height}
                                   width={beardPos.width}
                                   y={beardPos.y}
                                   x={beardPos.x}
                                   rotation={beardPos.angle}
                            />
                            : null
                        }
                        {debug_mode && validateCoords() ?
                            [
                                coords.oval.map(el => <Rect key={measure*el.x} fill={'red'} x ={measure*el.x} y={measure*el.y} width={3} height={3}/>),
                                coords.nose.map(el => <Rect key={measure*el.x} fill={'red'} x ={measure*el.x} y={measure*el.y} width={3} height={3}/>),
                                coords.lipsUp.map(el => <Rect key={measure*el.x} fill={'red'} x ={measure*el.x} y={measure*el.y} width={3} height={3}/>),
                                coords.lipsDown.map(el => <Rect key={measure*el.x} fill={'red'} x ={measure*el.x} y={measure*el.y} width={3} height={3}/>)
                            ]
                            :null
                        }
                        {(validateCoords() && MoustacheUrl !== EmptyPng.moustache)?
                            <Image image={moustache}
                                   height={moustachePos.height}
                                   width={moustachePos.width}
                                   y={moustachePos.y}
                                   x={moustachePos.x}
                                   rotation={moustachePos.angle}
                            />
                            : null
                        }
                    </Layer>
                    : null}
            </Stage>
        </div>
    );
};

ResultCompose.propTypes = {
    ImageURl: PropTypes.string,
    MoustacheUrl: PropTypes.string,
    BeardsUrl: PropTypes.string,
    coords: PropTypes.object,
    setError: PropTypes.func
}
export default ResultCompose;
