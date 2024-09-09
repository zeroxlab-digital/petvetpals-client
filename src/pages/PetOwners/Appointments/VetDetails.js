"use client";

import useVets from "../../../../hooks/useVets";


const VetDetails = ({ params }) => {
    const vets = useVets();
    const foundVet = vets.find(vet => vet._id === Number(params._id));
    console.log(foundVet);
    const {name, title} = foundVet || {};
    return (
        <div>
            <h2>{name}</h2>
            <h4>{title}</h4>
        </div>
    );
};

export default VetDetails;