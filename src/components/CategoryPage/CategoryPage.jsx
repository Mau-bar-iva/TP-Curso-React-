import { useParams } from "react-router-dom";
import { ItemListContainer } from "../ItemListContainer/ItemListContainer.jsx";

export default function CategoryPage() {
    const { category } = useParams();

    return (
        <section>
            <div>
                <h3>{category}</h3>
            </div>
            <div>
                <h5>Filters</h5>
                <ul>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                    <li><input type="checkbox" /></li>
                </ul>
            </div>
            <div>
                <ItemListContainer
                    category={category}
                    titulo={category ? category : "Bienvenidos"}
                />
            </div>
        </section>
    );
}
