import React, {useEffect} from 'react';
import {getFullFaceDescription, loadModels} from './face-api-func';
import ResultCompose from "./ResultCompose";
import {withNamespaces} from "react-i18next";
import useWidth from "../../../tools/useWidth";
import './ResultArea.css'
import Carousel from '../Carousel/Carousel'
import {Faces, Moustaches, Beards} from '../../../imports'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

/**
 * @param {Object} args - destructing object
 * @param {function} args.t - translation function provided by i18n
 * @param args.width - width provider
 * @returns {jsx}
 */
const ResultArea = ({t}) => {
    const [FaceImg, setFaceImg] = React.useState(Faces[0]);
    const [MoustacheImg, setMoustacheImg] = React.useState(Moustaches[0]);
  
    const [BeardsImg, setBeardsImg] = React.useState(Beards[0]);
    const width = useWidth()

    const [coords, setCoords] = React.useState({
        nose: [],
        lipsUp: [],
        lipsDown: [],
        oval: []
    })
    const [models, setModels] = React.useState(false);

    useEffect(() => {
        const handleImage = async (image = FaceImg) => {
            await getFullFaceDescription(image, image.size).then(fDes => {
                if (fDes) {
                    getMustacheArea(fDes[0].landmarks.positions);
                }
            });
        };

        const loading = async ()=> {
            try {
                console.log('load models');
                await loadModels();
                await handleImage(FaceImg);
                setModels(true);
                // eslint-disable-next-line no-empty
            } catch (e) {}
        };

        const reload = async () =>{
            try {
                console.log('new image');
                await handleImage(FaceImg);
                // eslint-disable-next-line no-empty
            } catch (e) {}
        };

        if (!models){
            loading().then();
        }
        else{
            reload().then();
        }
    }, [FaceImg, models]);

    const getMustacheArea = area => {
        if (area){
            const range = (begin, end)=>{
                return Array.from({length:end-begin+1},(v,k)=>k+begin)
            }
            setCoords({
                nose: range(31,35).map(el => area[el]),
                lipsUp: range(48,54).map(el => area[el]),
                lipsDown: [48, 59, 58, 57, 56, 55, 54].map(el => area[el]),
                oval: range(0,16).map(el => area[el])
            })
        }
    };

    const handleFileChange = async event => {
        setCoords({
            nose: [],
            lipsUp: [],
            lipsDown: [],
            oval: []
        })
        await setFaceImg(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div>
            <Grid container direction={width.width <= 600 ? 'column' : 'row'} alignItems='center'>

                <Grid item xs={6} container alignItems='center' direction='column'>
                    <ResultCompose
                        MoustacheUrl={MoustacheImg}
                        Url={BeardsImg}
                        ImageURl={FaceImg}
                        coords={coords}/>
                </Grid >
                <Grid item xs={3} container alignItems='center' direction='column'>
                    <div className="upload-btn-wrapper">
                        <button className="btn">{t('upload photo')}</button>
                        <input type="file" name="myfile"
                               onChange={handleFileChange}
                               accept=".jpg, .jpeg, .png"
                        />
                    </div>
                    <Carousel Images={Faces} setImage={setFaceImg}/>
                </Grid>
                <Grid item xs={3} container alignItems='center' direction='column' justify='space-around'>
                    <Grid item>
                        <Carousel Images={Moustaches} setImage={setMoustacheImg}/>
                    </Grid>
                    <Grid item >
                        <Carousel Images={Beards} setImage={setBeardsImg}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

ResultArea.propTypes = {
    t: PropTypes.func,
    width: PropTypes.string
}

export default withNamespaces()(ResultArea);
