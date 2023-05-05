import { useCallback, useEffect } from 'react';

interface useHeaderScrollprops {
    target: any;
    restoreClassName: string;
    changeClassName: string;
    scrollValue: number;
    onEnter?: () => void;
}

const useHeaderScroll = ({ target, restoreClassName, changeClassName, scrollValue, onEnter }: useHeaderScrollprops) => {
    const handleScroll = useCallback(() => {
        const top = window.scrollY;
        const header = document.querySelector(target);
        if (header) {
            if (top >= scrollValue) {
                header.classList.add(changeClassName);
                header.classList.remove(restoreClassName);
                if (onEnter) onEnter();
            } else {
                header.classList.add(restoreClassName);
                header.classList.remove(changeClassName);
            }
        }
      }, [target, scrollValue, changeClassName, restoreClassName, onEnter]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
};

export default useHeaderScroll;