
const Textarea = ({placeholder, id, name, value, onChange, ...props}) => {
    return (
        <textarea rows="5" cols="50" id={id} placeholder={placeholder} name={name} onChange={onChange} value={value} className={`${props.classNames} border border-gray-300 p-2 rounded outline-[#5d3855a3] placeholder:font-light`} required />
    );
};

export default Textarea;