import React, {useEffect} from 'react';
import {getFullFaceDescription, loadModels} from './face-api-func';
import ResultCompose from "./ResultCompose";
import {withNamespaces} from "react-i18next";
import withWidth from '@material-ui/core/withWidth';
import './ResultArea.css'
import Carousel from '../Carousel/Carousel'
import {Faces, Moustaches} from '../../../imports'
import Grid from "@material-ui/core/Grid";

const ResultArea = ({t, width})=>{
    const [FaceImg, setFaceImg] = React.useState(Faces[0]);
    const [MoustacheImg, setMoustacheImg] = React.useState(Moustaches[0]);
    const [nose, setNose] = React.useState(null);
    const [lips, setLips] = React.useState(null);
    const [models, setModels] = React.useState(false);

    useEffect(() => {
        const handleImage = async (image = FaceImg) => {
            await getFullFaceDescription(image, image.size).then(fDes => {
                if (!!fDes) {
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
            } catch (e) {}
        };

        const reload = async () =>{
            try {
                console.log('new image');
                await handleImage(FaceImg);
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
        if (!!area){
            const indicesNoseHor = [31, 32, 33, 34, 35];
            const indicesLipsUpU = [48, 49, 50, 51, 52, 53, 54];
            setNose(indicesNoseHor.map(el => area[el]));
            setLips(indicesLipsUpU.map(el => area[el]));
        }
    };

    const handleFileChange = async event => {
        resetState();
        await setFaceImg(URL.createObjectURL(event.target.files[0]));
    };

    const resetState = () => {
        setNose(null);
        setLips(null);
    };

    return (
        <div>
            <Grid container direction={width === 'xs' || width === 'sm'? 'column' : 'row'}>
                <Grid item container xs={12} sm={6} alignItems='center' direction='column'>
                    <Grid item md>
                        <ResultCompose mustacheUrl={MoustacheImg} ImageURl={FaceImg} nose={nose} lips={lips}/>
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
                </Grid>
            </Grid>
        </div>
    );
};

export default withNamespaces()(withWidth()(ResultArea));
