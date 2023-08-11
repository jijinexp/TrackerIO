import React, {useState, useEffect} from "react";
import axios from "axios";
import '../App.css';

interface Transaction {
    id: string,
    csvId: string,
    date: string,
    description: string,
    type: string,
    bank: string,
    amount: number
}

function ListTransactions(){
    const itemsPerPage = 20; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ['Date', 'Description', 'Type','Bank','Amount'];
    const [items, setItems] = useState<Transaction[]>([]);

    useEffect(() => {
        fetchItems();
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
                setItems(response.data['rawTransactions']);
            });
        }catch (error) {
            console.error('Error fetching items:', error)
        }
    };

    return(
        <div>
            <h1>Transactions</h1>
            <table>
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {displayedData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.description}</td>
                        <td>{row.type}</td>
                        <td>{row.bank}</td>
                        <td>{row.amount}</td>
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

