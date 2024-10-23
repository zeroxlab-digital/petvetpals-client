

const Input = ({ type, placeholder, id, ...props }) => {
    return (
        <input type={type} placeholder={placeholder} id={id} className={`${props.classNames} border border-gray-300 p-3  rounded outline-[#5d3855a3] placeholder:font-light`} required />
    );
};

export default Input;