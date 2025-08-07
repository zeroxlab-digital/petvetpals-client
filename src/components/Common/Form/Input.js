
const Input = ({ type, placeholder, name, value, onChange, id, ...props }) => {
    return (
        <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} id={id} {...props} className={`${props.classNames} border border-gray-200 px-2 py-2  rounded outline-none placeholder:font-light placeholder:text-sm w-full`} />
    );
};

export default Input;