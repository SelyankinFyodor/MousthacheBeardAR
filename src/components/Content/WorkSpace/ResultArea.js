import React, {useEffect} from 'react';
import {getFullFaceDescription, loadModels} from './face-api-func';
import ResultCompose from "./ResultCompose";
import {withNamespaces} from "react-i18next";
import withWidth from '@material-ui/core/withWidth';
import './ResultArea.css'
import Carousel from '../Carousel/Carousel'
import {Faces, Moustaches, Beards} from '../../../imports'
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

/**
 * @param {Object} args - destructing object
 * @param {function} args.t - translation function provided by i18n
 * @param args.width - width provider
 * @returns {jsx}
 */
const ResultArea = ({t, width})=>{
    const [FaceImg, setFaceImg] = React.useState(Faces[0]);
    const [MoustacheImg, setMoustacheImg] = React.useState(Moustaches[0]);
    const [BeardImg, setBeardImg] = React.useState(Beards[0]);
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
            <Grid container direction={width === 'xs' || width === 'sm'? 'column' : 'row'}>
                <Grid item container xs={12} sm={6} alignItems='center' direction='column'>
                    <Grid item md>
                        <ResultCompose
                            MoustacheUrl={MoustacheImg}
                            Url={BeardImg}
                            ImageURl={FaceImg}
                            BeardsUrl={BeardImg}
                            coords={coords}/>
                    </Grid>
                    <Grid item md>
                        <div className="upload-btn-wrapper">
                            <button className="btn">{t('upload photo')}</button>
                            <input type="file" name="myfile"
                                   onChange={handleFileChange}
                                   accept=".jpg, .jpeg, .png"
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={6} alignItems='center' direction='column' justify='space-between'>
                    <Grid item xs={6} sm={3}>
                        <Carousel Images={Moustaches} setImage={setMoustacheImg}/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Carousel Images={Faces} setImage={setFaceImg}/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Carousel Images={Beards} setImage={setBeardImg}/>
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

export default withNamespaces()(withWidth()(ResultArea));
