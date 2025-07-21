
const Input = ({ type, placeholder, name, value, onChange, id, ...props }) => {
    return (
        <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} id={id} className={`${props.classNames} border border-gray-200 px-2 py-[6px]  rounded-md outline-pink-900 placeholder:font-light placeholder:text-sm w-full`} />
    );
};

export default Input;