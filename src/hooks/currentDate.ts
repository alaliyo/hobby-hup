import { useState, useEffect } from 'react';

function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState('');
    const [newDate, setNewDate] = useState(new Date);
    const [year, setYear] = useState(newDate.getFullYear());
    const [month] = useState(newDate.getMonth());
    const [date] = useState(newDate.getDate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNewDate(new Date());
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    useEffect(() => {
        setCurrentDate(`${year}.${month}.${date}`);
    }, [year, month, date]);
    return currentDate;
}

export default useCurrentDate;