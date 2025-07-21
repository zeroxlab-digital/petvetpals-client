
const Label = ({children, htmlFor, ...props}) => {
    return (
        <label className="block mb-[6px] text-sm text-gray-800" htmlFor={htmlFor}>{children}</label>
    );
};

export default Label;