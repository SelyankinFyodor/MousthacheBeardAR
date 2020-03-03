import React, {useEffect} from 'react';
import { loadModels, getFullFaceDescription } from './face-api-func';
import ResultCompose from "./ResultCompose";
import Input from '@material-ui/core/Input';
// or

// Import image to test API
import {Faces, Mustaches} from '../../../imports'
const testImg = Faces[3];
const testMus = Mustaches[0];

const ResultArea = ()=>{
    const [imageURL, setImageURL] = React.useState(testImg);
    const [nose, setNose] = React.useState(null);
    const [lips, setLips] = React.useState(null);
    const [models, setModels] = React.useState(false);

    useEffect(() => {
        async function loading() {
            try {
                console.log('load models')
                await loadModels();
                await handleImage(imageURL);
                setModels(true);
            } catch (e) {
            }
        }
        async function reload() {
            try {
                console.log('new image');
                await handleImage(imageURL);
            } catch (e) {
            }
        }
        if (!models){
            loading();
        }
        else{
            reload();
        }
    }, [imageURL]);


    const handleImage = async (image = imageURL) => {
        await getFullFaceDescription(image).then(fDes => {
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
        await setImageURL(URL.createObjectURL(event.target.files[0]));
    };

    const resetState = () => {
        setNose(null);
        setLips(null);
    };

    return (
        <div>
            <Input
                id="myFileUpload"
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
            />
            <div style={{ position: 'relative' }}>
                <ResultCompose mustacheUrl={testMus} ImageURl={imageURL} nose={nose} lips={lips}/>
            </div>
        </div>);
};

export default ResultArea;
