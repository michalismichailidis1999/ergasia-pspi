import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const  Lesson = () => {
    const {currentCourse, currentLesson} = useSelector(state => state.course);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false)
    }

    return (
        <div className="layout lesson">
            <div className="container d-flex flex-column justify-cotnent-center align-items-center py-5">
                <Document
                    file={currentLesson.pdfURL}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={error => console.log(error)}
                    loading="PDF Loading..."
                >
                    <Page pageNumber={pageNumber} />
                </Document>

                {
                    !loading &&
                    <React.Fragment>
                        <div className="d-flex justify-content-center align-items-center">
                            <span onClick={() => {
                                if(pageNumber > 1){
                                    setPageNumber(pageNumber - 1);
                                }
                            }}>
                                <i className="fas fa-arrow-left"></i>
                            </span>

                            <p>Page {pageNumber} of {numPages}</p>

                            <span onClick={() => {
                                if(pageNumber < numPages){
                                    setPageNumber(pageNumber + 1);
                                }
                            }}>
                                <i className="fas fa-arrow-right"></i>
                            </span>
                        </div>

                        <Link className="mt-3" to={`/course/${currentCourse.id}`}>Go Back</Link>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Lesson