

const Button = ({ children, variant, size, classNames, onClick, ...props }) => {
    const variantClass = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary text-white font-semibold rounded-full'
            case 'primaryOutline':
                return 'bg-transparent text-white border hover:border-[#58294E] hover:text-primary duration-300 font-semibold  rounded-full'
            default:
                return ''
        }
    }
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return ''
            case 'large':
                return 'w-60 h-14 text-lg'
            default:
                return 'w-44 h-12 text-base'
        }
    }
    
    return (
        <button onClick={onClick} className={`${variantClass()} ${sizeClass()} ${props.uppercase && 'uppercase'} ${classNames} flex justify-center items-center gap-2`}>
            {children}
        </button>
    );
};

export default Button;