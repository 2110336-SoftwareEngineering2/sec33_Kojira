import React from 'react'

const SelectDB = (props) => {
    const btnData = [
        ["nontOwners", "/infodb/nontOwners"],
        ["nontSitters", "/infodb/nontSitters"],
        ["nonts", "/infodb/nonts"],
        ["reservations", "/infodb/reservations"],
        ["reviews", "/infodb/reviews"],
        ["rooms", "/infodb/rooms"],
        ["shelters", "/infodb/shelters"],
        //["transactions", "#"]
    ];

    return (
        <div className="container-fluid">
            {/* Header */}
            <h1 className="my-5 text-center font-weight-bold">Select Database</h1>

            {/* Button List */}
            <div className="d-flex flex-wrap bd-highlight justify-content-center">
                {
                    btnData.map( (data) => (
                        <a
                        type="button"
                        className="btn btn-info mx-2 my-2"
                        style= {{fontWeight:"bold", fontSize: "x-large", maxWidth: ""}}
                        href={data[1]}
                        >
                            {data[0]}
                        </a>
                     ) )
                }
            </div>
        </div>
    );
};

export default SelectDB;