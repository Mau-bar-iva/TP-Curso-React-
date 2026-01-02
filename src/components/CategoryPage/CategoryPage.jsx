import { useParams } from "react-router-dom";
import { ItemListContainer } from "../ItemListContainer/ItemListContainer.jsx";

export default function CategoryPage() {
    const { category } = useParams();

    return (
        <ItemListContainer
            category={category}
            titulo={category ? category : "Bienvenidos"}
        />
    );
}
