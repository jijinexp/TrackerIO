import React from 'react';
import FileUpload from "../Components/FileUpload";
import ExpenseContainer from "../Components/ExpenseContainer";

function Home() {
    return (
        <>
            <ExpenseContainer/>
            <FileUpload/>
        </>
    );
}

export default Home;
