import React, { useRef, useEffect, useCallback } from 'react';

const OutsideClickHandler = ({ subItemRefs = [], onOutsideClick, children }) => {
    const wrapperRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        subItemRefs.forEach(elementRef => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                onOutsideClick();
            }
        });
    }, [subItemRefs, onOutsideClick]);

    useEffect(() => {
        subItemRefs.push(wrapperRef);
    }, [subItemRefs]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;