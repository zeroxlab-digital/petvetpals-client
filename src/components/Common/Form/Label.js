
const Label = ({children, htmlFor, ...props}) => {
    return (
        <label className="block mb-[6px] text-sm" htmlFor={htmlFor}>{children}</label>
    );
};

export default Label;