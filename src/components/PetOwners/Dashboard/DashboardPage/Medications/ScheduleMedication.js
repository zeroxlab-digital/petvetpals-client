import React from 'react';

const ScheduleMedication = ({ onClose }) => {
    const handleSubmitSchedule = (e) => {
        e.preventDefault();
        onClose();
        // Handle schedule submission logic here
    };
    return (
        <div>
            <form onSubmit={(e) => handleSubmitSchedule(e)} className=''>
                {/* <div>
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" type="text" placeholder="Medication name" />
                </div>
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                    <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" type="text" placeholder="Medication dosage"></Input>
                    </div>
                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input id="frequency" type="text" placeholder="Frequency"></Input>
                    </div>
                    <div>
                        <Label htmlFor="startDate">Medication start date</Label>
                        <Input id="startDate" type="date" placeholder="Date of start" />
                    </div>
                    <div>
                        <Label htmlFor="timeOfDay">Time of day</Label>
                        <Input id="timeOfDay" type="text" placeholder="e.g. Morning, Afternoon, Evening"></Input>
                    </div>
                    <div>
                        <Label htmlFor="prescribedBy">Prescribed by</Label>
                        <SelectOptions
                            id="prescribedBy"
                            options={vets.map(vet => vet.fullName)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="reason">Reason of medication</Label>
                        <Input id="reason" type="text" placeholder="e.g. Itching"></Input>
                    </div>
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Any special instructions for the medication" classNames={'w-full'} />
                </div> */}
                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button onClick={onClose} className='bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'>
                        Schedule Medication
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMedication;