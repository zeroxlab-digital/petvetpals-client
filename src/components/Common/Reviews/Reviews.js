import { Rating } from '@mui/material';
import { HiOutlineThumbUp } from 'react-icons/hi';


const Reviews = () => {
    const reviews = [
        { rate: 5, user_name: "Malcom X", user_feedback: "Lorem ipsum dolor semmet kucchi lorem be iste", date: new Date().toJSON() },
        { rate: 2, user_name: "Malcom X", user_feedback: "Lorem ipsum dolor semmet kucchi lorem be iste", date: new Date().toJSON() },
        { rate: 4.5, user_name: "Malcom X", user_feedback: "Lorem ipsum dolor semmet kucchi lorem be iste", date: new Date().toJSON() },
        { rate: 3.5, user_name: "Malcom X", user_feedback: "Lorem ipsum dolor semmet kucchi lorem be iste", date: new Date().toJSON() }
    ]
    return (
        <div className='reviews'>
            {reviews.map((review, index) => <div key={index} className='flex justify-between items-start border-b last:border-none py-4'>
                <div>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='bg-gray-300 rounded-full w-9 h-9 text-center leading-9'>{review.user_name.slice(0, 1)}</div>
                        <div>
                            <h3 className='font-medium text-gray-800'>{review.user_name}</h3>
                            <p className='text-sm text-gray-600'>{review.date.slice(0, 10)}</p>
                        </div>
                    </div>
                    <p className='text-gray-700'>{review.user_feedback}</p>
                </div>
                <div className='flex flex-col items-center gap-2 max-sm:gap-1'>
                    <Rating name="half-rating-read" size="small" defaultValue={review.rate} precision={0.5} readOnly />
                    <span className={`bg-green-500 rounded-full px-3 py-1 text-xs text-white flex items-center gap-1`}>Recommended <HiOutlineThumbUp /></span>
                </div>
            </div>)}
        </div>
    );
};

export default Reviews;