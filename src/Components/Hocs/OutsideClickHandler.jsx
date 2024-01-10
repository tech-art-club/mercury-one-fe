import { useRef, useEffect } from 'react';

const OutsideClickHandler = ({ subItemRefs = [], onOutsideClick, children }) => {

    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        subItemRefs.forEach(elementRef => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                onOutsideClick();
            }
        });
    };

    useEffect(() => {
        subItemRefs.push(wrapperRef)
    }, [subItemRefs])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onOutsideClick, handleClickOutside]);

    return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;