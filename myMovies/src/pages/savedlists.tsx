import React, {useEffect, createContext, useContext, useState} from "react";
import { BsAlignCenter } from "react-icons/bs";
import { TbBackground } from "react-icons/tb";
import { Link } from 'react-router-dom';

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

interface Saved {
    id: number;
    title:string;
}

const sList: Saved[] = [
    {
        id:0,
        title:'Create New'
    },
    {
      id: 1,
      title: 'Liked'
    },
    {
      id: 2,
      title: 'Action'
    },
    {
      id: 3,
      title: 'Comedy'
    },
  ];

// This will pull the uid from where it is stored and then use it to request the lid's associated
// to that uid from the back en

// style={{
//     display: "flex",
//     justifyContent: "centre",
//     alignItems: "centre",
//     height: "100vh",
// }
// }
const SavedList: React.FC = () => {
    return (
        <div        >
            <h1>Saved Lists</h1>
            <ul>
                {sList.map(Saved => (
                <li key={Saved.id}>
                    <Link to={`/savedlists/${Saved.id}`}>{Saved.title}</Link>
                </li>
                ))}
            </ul>
            {/* <div className="test">
                <div className="square" style={drawrectangle}></div>

            </div> */}

            {/* <div className="container">
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
            </div> */}


        </div>
    );
};

export default SavedList;