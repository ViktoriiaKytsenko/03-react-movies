import { useRef } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface Props {
  onSubmit: (query: string) => void;
}

export const SearchBar = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormAction = (formData: FormData) => {
    const rawQuery = formData.get("query");
    const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

    if (!query) {
      toast("Please enter your search query.");
      return;
    }

    onSubmit(query);

    // Очищення поля після відправки
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form ref={formRef} action={handleFormAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};
