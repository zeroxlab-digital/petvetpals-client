
const Input = ({ type, placeholder, name, value, onChange, id, ...props }) => {
    return (
        <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} id={id} className={`${props.classNames} border border-gray-300 p-3  rounded outline-none placeholder:font-light`} />
    );
};

export default Input;