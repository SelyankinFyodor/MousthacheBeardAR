import {useCallback, useEffect, useState} from "react";

/**
 * hook of window width
 * @returns {{width: (number), height: (number)}}
 */
export default () => {
    const isClient = typeof window === 'object';

    // const getSize = () => {
    //     return {
    //         width: isClient ? window.innerWidth : undefined,
    //         height: isClient ? window.innerHeight : undefined
    //     };
    // }
    const getSize = useCallback(() => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    },[isClient])

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}
