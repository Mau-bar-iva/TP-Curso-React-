import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { ItemListContainer } from '../ItemListContainer/ItemListContainer.jsx';
import ProductDetailSkeleton from '../Skeleton/ProductDetailSkeleton';
import { getProductById } from '../../services/products';
import CarouselItems from '../CarouselItems/CarouselItems.jsx';

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    getProductById(id)
      .then((data) => mounted && setDetail(data))
      .catch((error) => console.error(error));

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
      {Object.keys(detail).length ? (
        <>
          <ItemDetail detail={detail} />

          {detail.category && (
            <div className="mt-12 space-y-4">
              <h4 className="font-serif text-3xl font-medium text-stone-900">Suggest for you</h4>
              <CarouselItems>
                <ItemListContainer category={detail.category[0]} mode="carousel" />
              </CarouselItems>
            </div>
          )}
        </>
      ) : (
        <div aria-busy="true" aria-live="polite">
          <ProductDetailSkeleton />
        </div>
      )}
    </section>
  );
};