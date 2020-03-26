import React, {useEffect} from 'react';
import {getFullFaceDescription, loadModels} from './face-api-func';
import ResultCompose from "./ResultCompose";
import {Input} from '@material-ui/core';
import Carousel from '../Carousel/Carousel'
import CarouselForMoustages from '../Carousel/Carousel'
// Import image to test API
import {Faces, Moustaches, MoustachePngs} from '../../../imports'
import Grid from "@material-ui/core/Grid";
// or


const ResultArea = ()=>{
    const [FaceImg, setFaceImg] = React.useState(Faces[0]);
    const [MoustacheImg, setMoustacheImg] = React.useState(MoustachePngs[0]);
    const [MegaMoustageImg, setMegaMoustacheImg] = React.useState(Moustaches[0]);
    const [nose, setNose] = React.useState(null);
    const [lips, setLips] = React.useState(null);
    const [models, setModels] = React.useState(false);

    useEffect(() => {
        async function loading() {
            try {
                console.log('load models')
                await loadModels();
                await handleImage(FaceImg);
                setModels(true);
            } catch (e) {
            }
        }
        async function reload() {
            try {
                console.log('new image');
                await handleImage(FaceImg);
            } catch (e) {
            }
        }
        if (!models){
            loading();
        }
        else{
            reload();
        }
    }, [FaceImg]);

    const handleImage = async (image = FaceImg) => {
        await getFullFaceDescription(image).then(fDes => {
            console.log(fDes.length)
            if (!!fDes) {
                getMustacheArea(fDes[0].landmarks.positions);
            }
        });
    };

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
        //will update with useEffect
        await setFaceImg(URL.createObjectURL(event.target.files[0]));
    };

    const resetState = () => {
        setNose(null);
        setLips(null);
    };

    return (
        <div>
            <Grid container alignItems="center" direction='row'>
                <Grid item xs={6}>
                    <div style={{ position: 'relative' }}>
                        <ResultCompose mustacheUrl={MegaMoustageImg} ImageURl={FaceImg} nose={nose} lips={lips}/>
                    </div>
                </Grid>
                <Grid item container xs={6} direction="column">
                    <Grid item xs={4}>
                        {/*<InputLabel*/}
                        {/*variant='standard'>*/}
                        <Input
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                            disableUnderline={true}
                        />
                    </Grid>
                    <Grid item xs>
                        <Carousel Images={Faces} setImage={setFaceImg}/>
                    </Grid>
                    <Grid item xs>
                        <CarouselForMoustages Images={Moustaches} setImage={setMegaMoustacheImg}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResultArea;
