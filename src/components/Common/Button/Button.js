

const Button = ({ children, variant, size, classNames, onClick, ...props }) => {
    const variantClass = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary hover:bg-primaryHover duration-200 text-white rounded-full'
            case 'primaryOutline':
                return 'bg-transparent hover:bg-primary text-primary border border-[#58294ec7] hover:text-white duration-200  rounded-full'
            default:
                return ''
        }
    }
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return 'px-3 py-1'
            case 'large':
                return 'px-10 py-5'
            default:
                return 'px-6 py-3'
        }
    }
    
    return (
        <button onClick={onClick} className={`${variantClass()} ${sizeClass()} ${props.uppercase && 'uppercase'} ${classNames} flex justify-center items-center gap-2`}>
            {children}
        </button>
    );
};

export default Button;