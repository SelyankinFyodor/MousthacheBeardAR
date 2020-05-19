import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {withNamespaces} from "react-i18next";
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

/**
 * styles for carousel
 * @type {function(props?: any): Object}
 */
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    img: {
        overflow: 'hidden',
        display: 'block',
        width:'100%'
    },
}));

/**
 * @param args -destructing object
 * @param {<string>[]>} args.Images - set of pictures for the carousel
 * @param {function} args.setImage - hook function from the parent component that sets the picture to its state
 * @param {function} args.t - translation function provided by i18n
 * @param {function} args.width - width provider
 * @returns {jsx}
 */
const Carousel= ({Images, setImage, t, width})=> {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = Images.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    useEffect(()=>{
        setImage(Images[activeStep])
    },[activeStep, Images , setImage]);

    return (
        <div className={classes.root}>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant={'text'}
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        {width === 'xs' || width === 'sm'? '' : t('Next')}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        {width === 'xs' || width === 'sm'? '' : t('Back')}
                    </Button>
                }
            />
            <img
                className={classes.img}
                src={Images[activeStep]}
                alt={':('}
            />
        </div>
    );
};

Carousel.propTypes = {
    Images: PropTypes.arrayOf(PropTypes.string),
    setImage: PropTypes.func,
    t: PropTypes.func,
    width: PropTypes.string
}

export default withNamespaces()(withWidth()(Carousel));
