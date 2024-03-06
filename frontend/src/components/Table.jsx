import  { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Error from "../components/error.jsx";
import Spinner  from "../components/spiner.jsx";
import './style/components/Table.css'

export default function App() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/get_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('API to Server error');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('API to Server error');
                setIsLoading(false);
            });
    }, []);

    if (error) {
        return <div><Error /></div>;
    }
    
    if (isLoading) {
        return <div className="grid items-center justify-center"><Spinner /></div>;
    }

    const headers = Object.keys(data[0]);
    const slicedData = data.slice(0, 10); // Only take the first 10 rows

    return (
        <Table aria-label="Honey Sample Information">
            <TableHeader>
                {headers.map((header, index) => (
                    <TableColumn key={index}>{header}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {slicedData.map((item, index) => (
                    <TableRow key={index} style={{ animation: `slideDown 0.5s ease ${index * 0.1}s forwards` }}>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{item[header]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}