import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../App.css';
import '../../css/Table.css'

interface Transaction {
    id: string,
    csvId: string,
    date: string,
    description: string,
    type: string,
    bank: string,
    amount: number
}

function ListTransactions() {
    const itemsPerPage = 20; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [headers, setHeaders] = useState<string[]>([]);
    const [items, setItems] = useState<Transaction[]>([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    // Calculate default date range for start of month till now
    const currentDate = new Date();
    const startOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultFromDate = startOfMonthDate.toISOString().substring(0, 10);
    const defaultToDate = currentDate.toISOString().substring(0, 10);
    const [ids, setids] = useState<string[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                await axios.get('http://localhost:5251/api/transactions', {
                    params: {
                        startDate: fromDate || defaultFromDate,
                        endDate: toDate || defaultToDate
                    }
                }).then(response => {
                    const {rawTransactions} = response.data;
                    setItems(rawTransactions);
                    if (rawTransactions && rawTransactions.length > 0) {
                        // Filter out specific header names you don't need
                        const excludedHeaders = ['id', 'csvId'];
                        const filtered = Object.keys(rawTransactions[0])
                            .filter(header => !excludedHeaders.includes(header));
                        setHeaders(filtered);
                    }
                });
            } catch (error) {
                console.error('Error fetching items:', error)
            }
        };
        fetchItems().then();
    }, [defaultFromDate, defaultToDate, fromDate, toDate]);

    const handleSelect = (id: string) => {
        if (ids.includes(id)) {
            setids(ids.filter(selectedId => selectedId !== id));
        } else {
            setids([...ids, id]);
        }
    };

    const handleSendIds = async () => {
        try {
            const response = await axios.delete('http://localhost:5251/api/remove-transactions',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: ids
                });
            console.log('IDs sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending IDs:', error);
        }
    };


    // Calculate the start and end indices of the current page's data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedData = items.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(items.length / itemsPerPage);


    return (
        <div className="table-container">
            <div>
                <label htmlFor="fromDate">From Date:</label>
                <input
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="toDate">To Date:</label>
                <input
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>
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
                {displayedData.map((row: Transaction, index: number) => (
                    <tr key={row.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={ids.includes(row.id)}
                                onChange={() => handleSelect(row.id)}
                            />
                        </td>
                        <td>{new Date(row.date).toLocaleDateString('en-NZ')}</td>
                        <td>{row.description}</td>
                        <td>{row.type}</td>
                        <td>{row.bank}</td>
                        <td className={row.amount > 0 ? 'positive' : 'negative'}>${row.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <p>Selected records: {ids.length}</p>
                <button onClick={handleSendIds}>Send Selected IDs</button>
            </div>
            {/* Pagination controls */}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({length: totalPages}, (_, index) => (
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

