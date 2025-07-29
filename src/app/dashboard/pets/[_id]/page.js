import PetDetails from '@/components/PetOwners/Dashboard/PetProfiles/PetDetails';
import React from 'react';

const page = ({ params }) => {
    return (
        <div>
            <PetDetails petId={params._id} />
        </div>
    );
};

export default page;