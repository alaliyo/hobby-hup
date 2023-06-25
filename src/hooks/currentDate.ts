import { useState, useEffect } from 'react';

function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState('');
    const [newDate, setNewDate] = useState(new Date());
    const [year, setYear] = useState('');
    const [month] = useState(newDate.getMonth()+1);
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
        setYear(newDate.getFullYear().toString().slice(2, 4));
    }, [newDate]);

    useEffect(() => {
        setCurrentDate(`${year}.${month}.${date}`);
    }, [year, month, date]);
    return currentDate;
}

export default useCurrentDate;