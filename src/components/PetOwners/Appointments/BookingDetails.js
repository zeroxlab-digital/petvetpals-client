import Button from '@/components/Common/Button/Button';
import Label from '@/components/Common/Form/Label';
import Input from '@/components/Common/Form/Input';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';

const BookingDetails = ({ setStage }) => {
    let inputFilled = true;
    const options = ['Cat', 'Dog', 'Rabbit', 'Bird', 'Other']
    return (
        <div className='text-left'>
            <h3 className='font-bold text-xl text-gray-800 '>Provide Pet Details</h3>
            <p className='text-gray-600 font-light'>Please fill the form below with your pet's details</p>
            <form onSubmit={() => setStage('payment')} className='mt-7'>
                <div className='mb-5'>
                    <Label htmlFor="petsname">Pet's Name</Label>
                    <Input type="text" id="petsname" placeholder="Enter your pet's name" classNames="py-2 w-full" />
                </div>
                <div className='grid grid-cols-2 gap-5 mb-5'>
                    <div className='w-full'>
                        <Label htmlFor="age">Age</Label>
                        <Input type="number" id="age" placeholder="Enter your pet's age" classNames="py-2 w-full" />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input type="number" id="weight" placeholder="Enter your pet's weight" classNames="py-2 w-full" />
                    </div>
                </div>
                <div className='mb-5'>
                    <Label htmlFor="type">Pet Type</Label>
                    <SelectOptions options={options} />
                </div>
                <div className='mb-5'>
                    <Label htmlFor="breed">Breed</Label>
                    <Input type="text" id="breed" placeholder="Enter your pet's breed" classNames="py-2 w-full" />
                </div>
                <div>
                    <Label htmlFor="symptoms">Symptoms</Label>
                    <Textarea classNames="w-full" id="symptoms" placeholder="Type the symptoms or reason for visit..." />
                </div>
                <input type="submit" value="Continue to pay" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5 ${inputFilled ? '' : 'opacity-50 cursor-not-allowed'}`} />
            </form>
        </div>
    );
};

export default BookingDetails;