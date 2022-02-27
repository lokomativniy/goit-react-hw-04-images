import styles from './Searchbar.module.css';
import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Plese enter something');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <input
          className={styles.SearchFormInput}
          type="text"
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.SearchFormButton}>
          <ImSearch className={styles.SearchIcon}></ImSearch>
        </button>
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
