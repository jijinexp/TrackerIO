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
    const emptyString: string = '';
    const itemsPerPage = 20; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [headers, setHeaders] = useState<string[]>([]);
    const [items, setItems] = useState<Transaction[]>([]);
    const [fromDate, setFromDate] = useState(emptyString);
    const [toDate, setToDate] = useState(emptyString);

    // Calculate default date range for start of month till now
    const currentDate = new Date();
    const startOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultFromDate = startOfMonthDate.toISOString().substring(0, 10);
    const defaultToDate = currentDate.toISOString().substring(0, 10);
    const [ids, setIds] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState(emptyString);


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
            setIds(ids.filter(selectedId => selectedId !== id));
        } else {
            setIds([...ids, id]);
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

    const handleDateChange = (e: React.SetStateAction<any>) => {
        setSelectedDate(e.target.value);
    };


    // Calculate the start and end indices of the current page's data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedData = selectedDate
        ? items.filter((item) => item.date === selectedDate) : items;

    const currentItems = displayedData.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(displayedData.length / itemsPerPage);
    const canGoNext = currentPage < totalPages;
    const canGoPrev = currentPage > 1;


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
            <table className="data-table">
                <thead>
                <tr>
                    <th colSpan={headers.length + 1} className="filter-header">
                        <div className="filter-container">
                            <label htmlFor="date-filter">Filter by Date:</label>
                            <input
                                type="date"
                                id="date-filter"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>Select</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (currentItems
                    .map((row: Transaction, _: number) => (
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
                    ))) : (
                    <tr>
                        <td colSpan={headers.length + 1}>No records to show</td>
                    </tr>
                )}
                <tr>
                    <td colSpan={headers.length + 1} className="bottom-button">
                        <p>Selected records: {ids.length}</p>
                        <button onClick={handleSendIds}>Send Selected IDs</button>
                    </td>
                </tr>
                </tbody>
            </table>
            {/* Pagination controls */}
            {currentItems.length > 0 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={!canGoPrev}>
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
                            disabled={!canGoNext}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ListTransactions;

