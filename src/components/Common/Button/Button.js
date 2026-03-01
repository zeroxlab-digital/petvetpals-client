

const Button = ({ children, variant, size, classNames, onClick, ...props }) => {
    const variantClass = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary hover:bg-primaryHover text-white'
            case 'primaryOutline':
                return 'bg-transparent hover:bg-primary text-primary border border-[#58294ec7] hover:text-white'
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
                return 'px-5 py-2'
        }
    }
    
    return (
        <button onClick={onClick} className={`${variantClass()} ${sizeClass()} ${props.uppercase && 'uppercase'} ${classNames} flex justify-center items-center gap-2 duration-200 rounded-xl`}>
            {children}
        </button>
    );
};

export default Button;