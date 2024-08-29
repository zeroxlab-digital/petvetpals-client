

const Input = ({ type, placeholder, label, ...props }) => {
    return (
        <input type={type} placeholder={placeholder} {...props} className="border border-gray-400 p-3 rounded-md outline-[#58294E]" />
    );
};

export default Input;