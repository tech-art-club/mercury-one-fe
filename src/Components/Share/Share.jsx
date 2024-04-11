import React, { useState, useRef, useEffect } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { PiShareFatThin } from 'react-icons/pi';
import styles from './Share.module.scss';

const Share = ({ fullUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <PiShareFatThin
        className={styles.dropdown__shareIcon}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`${
          isOpen ? styles.dropdown__content_active : styles.dropdown__content
        }`}
      >
        <TelegramShareButton
          url={fullUrl}
          className={styles.dropdown__content_item}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={fullUrl}
          className={styles.dropdown__content_item}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <FacebookShareButton
          url={fullUrl}
          className={styles.dropdown__content_item}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default Share;
