import React from "react";
import "./movieInfo.css";


const MovieInfo = () => {

    


    return (
        <div>

            <div id="bannerimage"></div>

            <div style={{
                textAlign: "left"
            }}>
                
                <section>
                    <h1 style={{
                        fontSize: "48px"
                    }}>Title</h1>
                </section>

                <div style={{
                    float: "left",
                    display: "flex",
                }}>

                    <div style={{
                        float: "left"
                    }}>

                        <h1>
                            Rating
                        </h1>

                        <table style={{
                            fontSize: "24px"
                        }}>
                            <tr>
                                <td> ***** </td>
                                <td> 32 </td>
                            </tr>
                            <tr>
                                <td> **** </td>
                                <td> 32 </td>
                            </tr>
                            <tr>
                                <td> *** </td>
                                <td> 32 </td>
                            </tr>
                            <tr>
                                <td> ** </td>
                                <td> 32 </td>
                            </tr>
                            <tr>
                                <td> * </td>
                                <td> 32 </td>
                            </tr>
                        </table>

                    </div>

                    <div style={{
                        float: "right"
                    }}>
                        <p>
                            <h1 style={{
                                fontSize: "32px"
                            }}>Synopsis</h1>

                            <hr/>

                            <p style={{
                                fontSize: "16px"
                            }}> test </p>
                        </p>

                        <p>
                            <h1 style={{
                                fontSize: "32px"
                            }}> Director </h1>

                            <hr/>

                            <p style={{
                                fontSize: "16px"
                            }}> test </p>
                        </p>

                        <p>
                            <h1 style={{
                                fontSize: "32px"
                            }}>Cast</h1>

                            <hr/>

                            <p style={{
                                fontSize: "16px"
                            }}> test </p>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default MovieInfo;