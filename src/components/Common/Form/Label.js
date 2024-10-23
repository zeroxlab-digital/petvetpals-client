
const Label = ({children, htmlFor, ...props}) => {
    return (
        <label className="block mb-1 text-sm" htmlFor={htmlFor}>{children}</label>
    );
};

export default Label;