import type { FC } from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: FC<BookCardProps> = ({id, title, image, price }) => {
  return (
    <>
      <div className="border-b border-zinc-400/50 p-4 rounded-lg font-sans shadow-xl hover:shadow-sm hover:bg-zinc-200/50">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
              alt={title} 
                className="w-full h-32 object-cover mb-2"
          />

          <h2 className="font-bold font-sans text-tcolor">{title}</h2>
          <p className="font-semibold text-tmuted font-sans">£{price}</p>
        </Link>
      </div>
    </>
  );
};

export default BookCard;