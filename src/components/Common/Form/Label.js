
const Label = ({children, htmlFor, ...props}) => {
    return (
        <label className="block mb-[5px] text-base text-gray-900" htmlFor={htmlFor}>{children} {props.optional && <span className="text-xs text-gray-500">(optional)</span>}</label>
    );
};

export default Label;