const { createContext, useState, useEffect } = require("react");

export const ReportContext = createContext({});

export function ReportContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [reportAnimals, setReportAnimals] = useState([]);
    useEffect(() => {
        if (reportAnimals?.length > 0) {
            ls?.setItem('zgloszenia', JSON.stringify(reportAnimals));
        }
    }, [reportAnimals]);
    useEffect(() => {
        if (ls && ls.getItem('zgloszenia')) {
            setReportAnimals(JSON.parse(ls.getItem('zgloszenia')));
        }
    }, []);
    function addAnimal(podopiecznyId) {
    setReportAnimals(prev => [...prev, podopiecznyId]);
    }

    function clearChoice() {
        setReportAnimals([]);
        if (ls) {
            ls.removeItem('zgloszenia'); // Usuwa wpis 'zgloszenia' z localStorage
        }
    }

    return(
        <ReportContext.Provider value={{reportAnimals,setReportAnimals, addAnimal, clearChoice}}>
            {children}
        </ReportContext.Provider>
    );
}