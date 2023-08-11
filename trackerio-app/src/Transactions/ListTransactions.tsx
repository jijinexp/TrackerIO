import React, {useEffect, useState} from "react";
import axios from "axios";
import '../App.css';
import '../css/Table.css'

interface Transaction {
    id: string,
    csvId: string,
    date: string,
    description: string,
    type: string,
    bank: string,
    amount: number,
    selected: boolean
}

function ListTransactions(){
    const itemsPerPage = 20; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [headers, setHeaders] = useState<string[]>([]);
    const [items, setItems] = useState<Transaction[]>([]);
    const [data, setData] = useState<Transaction[]>([]);

    useEffect(() => {
        fetchItems().then();
    }, []);

    // Calculate the start and end indices of the current page's data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedData = items.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const fetchItems = async () =>{
        try {
            await axios.get('http://localhost:5251/api/transactions').then(response =>
            {
                const {rawTransactions} = response.data;
                setItems(rawTransactions);
                if (rawTransactions && rawTransactions.length > 0) {
                    // Filter out specific header names you don't need
                    const excludedHeaders = ['id','csvId'];
                    const filtered = Object.keys(rawTransactions[0])
                        .filter(header => !excludedHeaders.includes(header));
                    setHeaders(filtered);
                }
            });
        }catch (error) {
            console.error('Error fetching items:', error)
        }
    };

    const handleCheckboxChange = (id: string) => {
        // Update the state to reflect checkbox changes
        setData(items => items.map(record => {
            if (record.id === id) {
                return { ...record, selected: !record.selected};
            }
            return record;
        }));
    };

    return(
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Select</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {displayedData.map((row, index) => (
                    <tr key={row.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={row.selected}
                                onChange={() => handleCheckboxChange(row.id)}
                            />
                        </td>
                        <td>{new Date(row.date).toLocaleDateString('en-NZ')}</td>
                        <td>{row.description}</td>
                        <td>{row.type}</td>
                        <td>{row.bank}</td>
                        <td className={row.amount > 0 ? 'positive' : 'negative' }>${row.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= items.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ListTransactions;

