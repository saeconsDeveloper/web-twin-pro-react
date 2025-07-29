import styleCard from "./Card.module.css";

const Card = ({ children }) => {
  return (
    <div className={styleCard.card}>
      {children}
    </div>
  );
};

export default Card;
