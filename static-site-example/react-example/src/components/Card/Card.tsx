import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

const Card = ({ children }: PropsWithChildren) => (
    <div className={styles.main}>{children}</div>
);

export default Card;
