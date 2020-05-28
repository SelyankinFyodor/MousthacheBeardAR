import React, {useEffect} from 'react';
import {getFullFaceDescription, loadModels} from '../../../tools/face-api-func';
import ResultCompose from "./ResultCompose";
import {withNamespaces} from "react-i18next";
import useWidth from "../../../tools/useWidth";
import './ResultArea.css'
import Carousel from '../Carousel/Carousel'
import {Faces, Moustaches, Beards} from '../../../imports'
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        lineHeightStep: "32px",
        border: "1px solid #000",
        height: "100%"
    },
    text: {
        fontFamily: 'Tangerine'
    },
    error: {
        fontFamily: 'Tangerine',
        backgroundColor:'#FF4500'
    }
}));

/**
 * @param {Object} args - destructing object
 * @param {function} args.t - translation function provided by i18n
 * @returns {jsx}
 */
const ResultArea = ({t}) => {
    const [FaceImg, setFaceImg] = React.useState(Faces[0]);
    const [MoustacheImg, setMoustacheImg] = React.useState(Moustaches[0]);

    const [BeardsImg, setBeardsImg] = React.useState(Beards[0]);
    const [errorLoad, setError] = React.useState("");
    const width = useWidth();
    const [layout, setLayout]=React.useState([6,3])
    const getDir = ()=>{
        return width.width <= 600 ? 'column' : 'row'
    }

    const [dir, setDir]=React.useState(getDir())
    const classes = useStyles();

    const [coords, setCoords] = React.useState({
        nose: [],
        lipsUp: [],
        lipsDown: [],
        oval: []
    })
    const [models, setModels] = React.useState(false);

    useEffect(() => {
        const handleImage = async (image = FaceImg) => {
            await getFullFaceDescription(image).then(fDes => {
                if (fDes[0] === undefined) {
                    setError("Problems with face detection, select another photo")
                }

                if (fDes && fDes.lenght !== 0) {
                    getMustacheArea(fDes[0].landmarks.positions);
                    setError("")
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
                lipsUp: range(48, 54).map(el => area[el]),
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

    useEffect(()=>{
        if (width.width <= 600){
            setLayout([12,12])
            setDir('column')
        }
        else{
            setLayout([6,3])
            setDir('row')
        }
    }, [width])

    return (
        <Grid container direction={dir} className={classes.grid}>
            <Grid item
                  xs={layout[0]}
            >
                <ResultCompose
                    MoustacheUrl={MoustacheImg}
                    BeardsUrl={BeardsImg}
                    ImageURl={FaceImg}
                    coords={coords}
                    className={classes.grid}
                />
            </Grid >
            <Grid item container
                  direction={'column'}
                  alignItems={'center'}
                  className={classes.grid}
                  xs={layout[1]}
            >
                <Grid item

                >
                    <div className="upload-btn-wrapper">
                        <button className="btn">{t('upload photo')}</button>
                        <input type="file" name="myfile"
                               onChange={handleFileChange}
                               accept=".jpg, .jpeg, .png"
                        />
                    </div>
                </Grid>
                <Grid item
                      className={classes.error}
                >
                    {errorLoad !== "" ? t(errorLoad) : <br/>}
                </Grid>
                <Grid item
                      className={classes.text}
                >
                    {t('or select from the catalog')}
                </Grid>
                <Grid item
                >
                    <Carousel Images={Faces} setImage={setFaceImg}/>
                </Grid >
            </Grid>
            <Grid item container
                  direction={'column'}
                  alignItems={'center'}
                  className={classes.grid}
                  xs={layout[1]}
            >
                <Grid
                    className={classes.text}
                >
                    {t('Select Moustache')}
                </Grid >
                <Grid item xs
                >
                    <Carousel Images={Moustaches} setImage={setMoustacheImg}/>
                </Grid>
                <Grid
                    className={classes.text}
                >
                    {t('Select Beard')}
                </Grid >
                <Grid item
                >
                    <Carousel Images={Beards} setImage={setBeardsImg}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

ResultArea.propTypes = {
    t: PropTypes.func,
    width: PropTypes.string
}

export default withNamespaces()(ResultArea);
