const Textarea = ({ placeholder, id, name, value, onChange, ...props }) => {
    return (
        <textarea
            id={id}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            rows="5"
            className={`w-full border border-gray-300 p-2 rounded outline-[#5d3855a3] placeholder:font-light resize-none ${props.className || ''}`}
            required
        />
    );
};

export default Textarea;
