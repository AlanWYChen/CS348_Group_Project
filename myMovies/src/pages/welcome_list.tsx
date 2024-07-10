import React, {useEffect, createContext, useContext, useState} from "react";
import { BsAlignCenter } from "react-icons/bs";
import { TbBackground } from "react-icons/tb";

const drawrectangle = {
    height: '25vh',
    width: '25vh',
    backgroundColor: 'green'
};
const drawNewList = {
    height: '25vh',
    width: '25vh',
    backgroundColor: 'white'
};

const plusSign = {
    backgroundColor: 'gray',
    BsAlignCenter,
    height:'15vh',
    width:'5vh',
    paddingTop:'5vh'
};

function hello() {
    console.log("this works");
}


// This will pull the uid from where it is stored and then use it to request the lid's associated
// to that uid from the back end
window.onload = function () {
    if (window.location.pathname === '/movie_list') {
        hello();
        // Represents the user will need to figure out how to call this later but for now this is fine
        let uid: number = 1;
        // TODO: Make this the user who is logged in

        // This is how many lists will need to be created this will be changed later once I have a json file
        // but for now is just to resemble the blocks we need
        let lists_made: number = 6;

        createtable(uid, lists_made); 

    }
}


const MovieList = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }
        }
        >
            <h1>
                Hello
            </h1>
            <div className="test">
                <div className="square" style={drawrectangle}></div>

            </div>

            <div className="container">
                <div className="movie_table">
                    <table className="movie_list">
                        <tr>
                            <td>
                                <div className="addnewlist" style={drawNewList}>
                                    <div className="plus" style={plusSign}></div>
                                </div>
                            </td>
                        </tr>

                    </table>
                </div>
            </div>


        </div>
    );
};

export default MovieList;