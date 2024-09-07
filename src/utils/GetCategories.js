
import useProducts from '../../hooks/useProducts';
const GetCategories = () => {
    const products = useProducts();

    // Create a Map to filter out duplicate categories based on category_slug
    const categoriesMap = new Map();
    products?.forEach(product => {
        const category = product.category;
        // Only add category if the slug doesn't already exist in the Map
        if (!categoriesMap.has(category.category_slug)) {
            categoriesMap.set(category.category_slug, category);
        }
    });
    // Convert the Map values to an array
    const uniqueCategories = Array.from(categoriesMap.values());
    
    return uniqueCategories || [];
}
export default GetCategories;