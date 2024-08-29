

const Button = ({ children, variant, size, ...props }) => {
    const variantClass = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary uppercase text-white font-semibold text-lg rounded-full'
            case 'primaryOutline':
                return 'bg-transparent uppercase text-white border hover:border-[#58294E] hover:text-primary duration-300 font-semibold text-lg rounded-full'
            default:
                return ''
        }
    }
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return ''
            case 'large':
                return 'w-60 h-14'
            default:
                return ''
        }
    }
    return (
        <button className={`${variantClass()} ${sizeClass()}`}>
            {children}
        </button>
    );
};

export default Button;