import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <p>
        Opps! Looks like the page you are looking for does not exist. Go back to{" "}
        <Link className={css.link} to="/">
          Home
        </Link>
        .
      </p>
    </div>
  );
};
export default NotFoundPage;
